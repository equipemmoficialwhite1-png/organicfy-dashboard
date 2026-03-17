import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: You need to set RESEND_API_KEY in your .env.local
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }

    // Since we are using hardcoded admin for now, check against that
    const adminEmail = "admin@organicfyoficial.com.br"; // Default admin email
    
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      // For security, don't reveal if email exists or not
      return NextResponse.json({ success: true });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    
    // In a real scenario, you would update the password in your DB here.
    // Since we use .env for admin password, this is just a simulation.
    console.log(`[SIMULATION] Temporary password for ${email}: ${tempPassword}`);

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Organicfy <noreply@organicfyoficial.com.br>',
        to: email,
        subject: 'Recuperação de Senha - Organicfy',
        html: `
          <h1>Recuperação de Senha</h1>
          <p>Você solicitou uma recuperação de senha para o Dashboard da Organicfy.</p>
          <p>Sua senha temporária é: <strong>${tempPassword}</strong></p>
          <p>Recomendamos que você altere sua senha após o login.</p>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Simulated email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Erro interno ao processar recuperação' }, { status: 500 });
  }
}
