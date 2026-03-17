import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.CLICKUP_API_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;

  if (!token || !listId) {
    return NextResponse.json({ error: 'Missing ClickUp API credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task?subtasks=true&include_closed=true`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // Disable caching
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `ClickUp API Error: ${response.status} - ${text}` }, { status: response.status });
    }

    const data = await response.json();

    // Map Tasks
    const transactions = data.tasks.map(task => {
      // Find custom fields
      const getField = (namePrefix) => {
        return task.custom_fields.find(f => f.name.toLowerCase().startsWith(namePrefix.toLowerCase()));
      };

      const valTransacaoField = getField('Valor transação');
      const valTransacao = valTransacaoField && valTransacaoField.value 
        ? parseFloat(valTransacaoField.value) 
        : 0;

      const mesRefField = getField('MES REF');
      let mesRef = '-';
      if (mesRefField && mesRefField.value !== undefined && mesRefField.type_config && mesRefField.type_config.options) {
        const option = mesRefField.type_config.options.find(o => o.orderindex === mesRefField.value);
        if (option) mesRef = option.name;
      }

      const recorrenciaField = getField('RECORRENCIA');
      let recorrencia = '-';
      if (recorrenciaField && recorrenciaField.value !== undefined && recorrenciaField.type_config && recorrenciaField.type_config.options) {
        const option = recorrenciaField.type_config.options.find(o => o.orderindex === recorrenciaField.value);
        if (option) recorrencia = option.name;
      }

      const clienteField = getField('CLIENTE');
      let cliente = '';
      if (clienteField && clienteField.value && clienteField.value.length > 0) {
        cliente = clienteField.value[0].name;
      }

      const telefoneField = getField('TELEFONE');
      const telefone = telefoneField && telefoneField.value ? telefoneField.value : '-';

      const reciboField = getField('RECIBO/NF');
      const recibo = reciboField && reciboField.value && reciboField.value.length > 0 ? 'Anexado' : '-';

      // Status Processing
      const statusName = task.status.status ? task.status.status.toUpperCase() : 'PENDENTE';
      let internalStatus = 'PENDING';
      
      if (statusName.includes('PAGO')) {
        internalStatus = 'PAID';
      } else if (statusName.includes('PARCIAL')) {
        internalStatus = 'PARTIAL';
      } else if (statusName.includes('ATRASADO') || statusName.includes('1D') || statusName.includes('3D') || statusName.includes('7D') || statusName.includes('15D')) {
        internalStatus = 'OVERDUE';
      } else if (statusName.includes('DESQUALIFICADO') || statusName.includes('SAIU') || statusName.includes('CANCELADO')) {
        internalStatus = 'INACTIVE';
      }

      return {
        id: task.id,
        name: task.name,
        client: cliente || task.name,
        status: statusName,
        internalStatus: internalStatus,
        color: task.status.color,
        value: valTransacao,
        dueDate: task.due_date ? parseInt(task.due_date, 10) : null,
        phone: telefone,
        recurrence: recorrencia,
        referenceMonth: mesRef,
        receipt: recibo
      };
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  const token = process.env.CLICKUP_API_TOKEN;
  
  try {
    const body = await request.json();
    const { taskId, ...updateData } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // Map frontend fields back to ClickUp fields if needed
    // For simple task updates (name, status, etc.)
    const clickupPayload = {};
    if (updateData.name) clickupPayload.name = updateData.name;
    if (updateData.status) clickupPayload.status = updateData.status;
    if (updateData.dueDate) clickupPayload.due_date = updateData.dueDate;

    const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickupPayload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `ClickUp Update Error: ${response.status} - ${text}` }, { status: response.status });
    }

    const result = await response.json();

    // If there is a "value" (custom field), we need another request
    if (updateData.value !== undefined) {
      const listId = process.env.CLICKUP_LIST_ID;
      // We need to find the specific Custom Field ID for "Valor transação"
      // In a production environment, this should be cached or stored in .env
      // For now, let's assume we can update it if we have the list context
      const fieldId = '7b0ef31d-1441-4a00-9c2d-8619e9666bcd'; // Found from sample_tasks.json earlier
      
      await fetch(`https://api.clickup.com/api/v2/task/${taskId}/custom_field/${fieldId}`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: updateData.value }),
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
