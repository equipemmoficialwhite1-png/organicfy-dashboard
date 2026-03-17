# Instruções de Apontamento de Domínio — organicfyoficial.com.br

## Plataforma de Deploy: Vercel

---

## Passo 1 — Fazer o Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (ou crie uma conta)
2. Clique em **"Add New Project"**
3. Importe o repositório do `organicfy-dashboard` (via GitHub, GitLab ou upload manual)
4. Confirme as variáveis de ambiente (copie do `.env.local`):
   - `CLICKUP_API_TOKEN`
   - `CLICKUP_LIST_ID`
   - `AUTH_SECRET`
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`
5. Clique em **Deploy**

---

## Passo 2 — Adicionar o Domínio na Vercel

1. No painel da Vercel, acesse seu projeto → **Settings → Domains**
2. Adicione: `organicfyoficial.com.br`
3. Adicione também: `www.organicfyoficial.com.br`
4. A Vercel vai mostrar os registros DNS que precisam ser configurados

---

## Passo 3 — Configurar o DNS no Registro.br

Acesse: https://registro.br → Login → Domínios → `organicfyoficial.com.br` → **Editar DNS**

### Opção A — Nameservers Vercel (Recomendado ✅)

Substitua os nameservers atuais por:

| Tipo | Valor               |
|------|---------------------|
| NS   | `ns1.vercel-dns.com` |
| NS   | `ns2.vercel-dns.com` |

> ⚠️ Com esta opção, o DNS passa a ser gerenciado pela Vercel. É a opção mais simples.

---

### Opção B — Manter DNS no Registro.br (adicionar registros manualmente)

Se preferir manter os nameservers do Registro.br, adicione os seguintes registros:

| Tipo  | Nome | Valor              | TTL  |
|-------|------|--------------------|------|
| A     | `@`  | `76.76.21.21`      | 3600 |
| CNAME | `www`| `cname.vercel-dns.com` | 3600 |

> ℹ️ O registro `@` aponta o domínio raiz (`organicfyoficial.com.br`) para a Vercel.
> ℹ️ O CNAME aponta `www.organicfyoficial.com.br` para a Vercel.

---

## Passo 4 — Verificar a Propagação

Após salvar os registros, aguarde **até 48h** para propagação total (normalmente leva menos de 1h).

Para verificar se está funcionando:
```
https://dnschecker.org/#A/organicfyoficial.com.br
```

---

## Resumo das Credenciais Necessárias

| Item | Valor |
|------|-------|
| Domínio | `organicfyoficial.com.br` |
| Plataforma | Vercel |
| IP Vercel (registro A) | `76.76.21.21` |
| CNAME Vercel | `cname.vercel-dns.com` |
| NS 1 Vercel | `ns1.vercel-dns.com` |
| NS 2 Vercel | `ns2.vercel-dns.com` |

---

## Observações de Segurança

- As variáveis do `.env.local` **não devem** ser commitadas no Git
- Na Vercel, adicione as variáveis no painel em **Settings → Environment Variables**
- O `AUTH_SECRET` deve ser uma string longa e aleatória (mínimo 32 caracteres)
