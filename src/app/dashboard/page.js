'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', dueDate: '', value: '' });
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/transactions');
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json.transactions);
      }
    } catch (err) {
      setError('Falha na comunicação com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (taskId) => {
    if (!confirm('Deseja marcar esta transação como PAGA no ClickUp?')) return;
    
    setUpdatingId(taskId);
    try {
      const res = await fetch('/api/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          taskId, 
          status: 'pago' // This should match a ClickUp status name
        })
      });

      const result = await res.json();
      if (result.error) {
        alert('Erro ao atualizar: ' + result.error);
      } else {
        // Optimistic update
        setData(prev => prev.map(t => t.id === taskId ? { ...t, internalStatus: 'PAID', status: 'PAGO' } : t));
      }
    } catch (err) {
      alert('Erro de conexão');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    const dueDateFormatted = transaction.dueDate
      ? new Date(transaction.dueDate).toISOString().split('T')[0]
      : '';
    setEditForm({
      status: transaction.status?.toLowerCase() || '',
      dueDate: dueDateFormatted,
      value: transaction.value || '',
    });
  };

  const handleEditSave = async () => {
    if (!editingTransaction) return;
    setEditSaving(true);
    try {
      const body = { taskId: editingTransaction.id };
      if (editForm.status) body.status = editForm.status;
      if (editForm.dueDate) body.due_date = new Date(editForm.dueDate).getTime();
      if (editForm.value !== '') body.value = parseFloat(editForm.value);

      const res = await fetch('/api/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (result.error) {
        alert('Erro ao salvar: ' + result.error);
      } else {
        await fetchData();
        setEditingTransaction(null);
      }
    } catch {
      alert('Erro de conexão');
    } finally {
      setEditSaving(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando dados financeiros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Ops! Ocorreu um erro</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  // Calculate metrics
  const pendingTransactions = data.filter(t => t.internalStatus === 'PENDING');
  const totalPending = pendingTransactions.reduce((acc, t) => acc + (t.value || 0), 0);

  const receivedTransactions = data.filter(t => t.internalStatus === 'PAID');
  const totalReceived = receivedTransactions.reduce((acc, t) => acc + (t.value || 0), 0);

  const totalMonth = data.filter(t => t.internalStatus === 'PAID' || t.internalStatus === 'PARTIAL')
                         .reduce((acc, t) => acc + (t.value || 0), 0);

  const overdueCount = data.filter(t => t.internalStatus === 'OVERDUE').length;
  const activeCount = data.filter(t => t.internalStatus !== 'INACTIVE').length;

  // Formatting utils
  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (ms) => ms ? new Date(ms).toLocaleDateString('pt-BR') : '-';

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/logo.jpg" alt="Organicfy Logo" className={styles.logoImg} />
        </div>
        <nav className={styles.nav}>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.icon}>📊</span>
            Dashboard
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.icon}>🧾</span>
            Transações
          </a>
          <a href="#" className={styles.navItem}>
            <span className={styles.icon}>👥</span>
            Clientes
          </a>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.icon}>🚪</span>
            Sair
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Visão Geral</h1>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>OD</div>
            <span>Organicfy Oficial</span>
          </div>
        </header>

        <section className={styles.dashboard}>
          
          {/* Summary Cards */}
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Receitas Pendentes</span>
                <span className={styles.cardIcon}>⏳</span>
              </div>
              <div className={styles.cardValue}>{formatCurrency(totalPending)}</div>
              <div className={styles.cardSub}>Aguardando pagamento</div>
            </div>

            <div className={`${styles.card} ${styles.cardSuccess}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Receitas Recebidas</span>
                <span className={styles.cardIcon}>📈</span>
              </div>
              <div className={styles.cardValue}>{formatCurrency(totalReceived)}</div>
              <div className={styles.cardSub}>Pagamentos confirmados</div>
            </div>

            <div className={`${styles.card} ${styles.cardTotal}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Total do Mês</span>
                <span className={styles.cardIcon}>🤑</span>
              </div>
              <div className={styles.cardValue}>{formatCurrency(totalMonth)}</div>
              <div className={styles.cardSub}>Receitas + Entradas Parciais</div>
            </div>

            <div className={`${styles.card} ${styles.cardWarning}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Clientes Atrasados</span>
                <span className={styles.cardIcon}>⚠️</span>
              </div>
              <div className={styles.cardValue}>{overdueCount}</div>
              <div className={styles.cardSub}>Atenção necessária</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Clientes Ativos</span>
                <span className={styles.cardIcon}>👥</span>
              </div>
              <div className={styles.cardValue}>{activeCount}</div>
              <div className={styles.cardSub}>Base total atual</div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h2>Lista de Transações (API ClickUp)</h2>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Situação</th>
                    <th>Vencimento</th>
                    <th>Descrição / Cliente</th>
                    <th>Categoria / Recorrência</th>
                    <th>Valor</th>
                    <th style={{ textAlign: 'center' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(transaction => {
                    let statusClass = styles.badgePending;
                    let statusLabel = 'Pendente';
                    let statusIcon = '⏳';

                    if (transaction.internalStatus === 'PAID') {
                      statusClass = styles.badgeSuccess;
                      statusLabel = 'Recebido';
                      statusIcon = '✅';
                    } else if (transaction.internalStatus === 'OVERDUE') {
                      statusClass = styles.badgeWarning;
                      statusLabel = 'Atrasado';
                      statusIcon = '⚠️';
                    } else if (transaction.internalStatus === 'INACTIVE') {
                      statusClass = styles.badgeInactive;
                      statusLabel = 'Cancelado';
                      statusIcon = '📓';
                    } else if (transaction.internalStatus === 'PARTIAL') {
                      statusClass = styles.badgePartial;
                      statusLabel = 'Parcial';
                      statusIcon = '🔄';
                    }

                    return (
                      <tr key={transaction.id}>
                        <td>
                          <div className={`${styles.badge} ${statusClass}`}>
                            {statusIcon} {statusLabel}
                          </div>
                        </td>
                        <td className={styles.dueDate}>{formatDate(transaction.dueDate)}</td>
                        <td>
                          <div className={styles.descTitle}>{transaction.name}</div>
                          <div className={styles.descSub}>{transaction.status}</div>
                        </td>
                        <td>
                          <div className={styles.recurrenceCategory}>
                            [ORGFY] {transaction.recurrence}
                          </div>
                        </td>
                        <td className={styles.txValue}>{formatCurrency(transaction.value)}</td>
                        <td className={styles.actionsCell}>
                          <div className={styles.actionsWrapper}>
                            {transaction.internalStatus !== 'PAID' && (
                              <button 
                                className={styles.payBtn} 
                                onClick={() => handleMarkAsPaid(transaction.id)}
                                disabled={updatingId === transaction.id}
                                title="Marcar como Pago"
                              >
                                {updatingId === transaction.id ? '...' : '✅'}
                              </button>
                            )}
                            <button className={styles.actionBtn} aria-label="Editar" title="Editar" onClick={() => handleOpenEdit(transaction)}>✏️</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {data.length === 0 && (
                     <tr>
                        <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Nenhuma transação encontrada no ClickUp.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className={styles.modalOverlay} onClick={() => setEditingTransaction(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Editar Transação</h3>
              <button className={styles.modalClose} onClick={() => setEditingTransaction(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalName}>{editingTransaction.name}</p>

              <label className={styles.fieldLabel}>Status</label>
              <select
                className={styles.fieldInput}
                value={editForm.status}
                onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
              >
                <option value="">— Selecionar —</option>
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="atrasado">Atrasado</option>
                <option value="parcial">Parcial</option>
                <option value="cancelado">Cancelado</option>
              </select>

              <label className={styles.fieldLabel}>Vencimento</label>
              <input
                type="date"
                className={styles.fieldInput}
                value={editForm.dueDate}
                onChange={e => setEditForm(f => ({ ...f, dueDate: e.target.value }))}
              />

              <label className={styles.fieldLabel}>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                className={styles.fieldInput}
                value={editForm.value}
                onChange={e => setEditForm(f => ({ ...f, value: e.target.value }))}
              />
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setEditingTransaction(null)}>Cancelar</button>
              <button className={styles.saveBtn} onClick={handleEditSave} disabled={editSaving}>
                {editSaving ? 'Salvando...' : 'Salvar no ClickUp'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
