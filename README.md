# josealan.com.br

Site pessoal de Alan Aquino. HTML, CSS e um pouco de JavaScript, sem framework, hospedado no GitHub Pages.

| Arquivo | Função |
|---|---|
| `index.html` | Página principal |
| `style.css` | Estilos (tema claro/escuro automático) |
| `script.js` | Relógio de Maceió, ano do rodapé e botão "copiar e-mail" |
| `assets/alan.jpg` | Foto |
| `404.html` | Página de erro |
| `CNAME` | Domínio personalizado do GitHub Pages |

---

## 1. Publicar no GitHub

```bash
git init
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/Alanz0ka/josealan.com.br.git
git push -u origin main
```

No repositório: **Settings → Pages**
- **Source:** Deploy from a branch → `main` / `(root)` → **Save**
- **Custom domain:** `josealan.com.br` → **Save**

---

## Configuração atual

- **Registrador:** Registro.br, com nameservers `macy.ns.cloudflare.com` e `pablo.ns.cloudflare.com`
- **DNS e e-mail:** Cloudflare (plano Free)
- **Hospedagem:** GitHub Pages (`Alanz0ka/josealan.com.br`, branch `main`)

| Tipo | Nome | Valor | Função |
|---|---|---|---|
| A (×4) | `@` | `185.199.108–111.153` | GitHub Pages |
| CNAME | `www` | `alanz0ka.github.io` | GitHub Pages |
| MX | `@` | `route1/2/3.mx.cloudflare.net` (58/83/86) | Email Routing |
| TXT | `@` | `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all` | SPF |
| TXT | `cf2024-1._domainkey` | chave DKIM da Cloudflare | DKIM |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | DMARC |

Todos os registros ficam em **"Somente DNS"** (nuvem cinza).

Regra de e-mail: `contato@josealan.com.br` → Gmail pessoal.

Os passos abaixo documentam como essa configuração foi feita.

---

## 2. Passar o DNS para a Cloudflare

A Cloudflare só oferece o e-mail personalizado grátis (Email Routing) se ela cuidar do
DNS do domínio. Por isso, **o DNS fica todo na Cloudflare**, e não no Registro.br.

1. Crie uma conta em [dash.cloudflare.com](https://dash.cloudflare.com) e clique em
   **Add a domain** → `josealan.com.br` → plano **Free**.
2. A Cloudflare vai mostrar **2 nameservers** (algo como `xxx.ns.cloudflare.com`).
3. No [registro.br](https://registro.br), abra o domínio → **DNS** →
   **Alterar servidores DNS** e cole os 2 nameservers da Cloudflare.
4. Aguarde a Cloudflare avisar que o domínio está **Active** (minutos a algumas horas).

### Registros para o GitHub Pages

Na Cloudflare: **DNS → Records → Add record**. Deixe o **Proxy status em "DNS only"**
(nuvem cinza), senão o GitHub não consegue emitir o certificado HTTPS.

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `alanz0ka.github.io` |

> O domínio raiz (`josealan.com.br`) não aceita CNAME, por isso ele usa registros A/AAAA.
> O `www` usa CNAME.

Depois que propagar, volte em **GitHub → Settings → Pages** e marque **Enforce HTTPS**.

Para conferir:

```bash
dig josealan.com.br +short
```

---

## 3. E-mail contato@josealan.com.br → Gmail

### Receber (Cloudflare Email Routing)

1. Na Cloudflare: **Email → Email Routing → Get started**.
2. **Destination address:** seu Gmail. A Cloudflare manda um e-mail de confirmação,
   clique no link.
3. **Custom address:** `contato` → envia para o seu Gmail.
4. Aceite quando a Cloudflare oferecer **adicionar os registros MX e TXT** automaticamente.
5. (Opcional) Ative o **Catch-all** para receber qualquer `algo@josealan.com.br`.

Mande um e-mail de teste de outra conta para `contato@josealan.com.br`.

### Responder como contato@ pelo Gmail

A Cloudflare só **recebe** e repassa. Para **enviar** usando o endereço novo, use o SMTP do próprio Gmail:

1. Ative a **verificação em duas etapas** na sua Conta Google.
2. Crie uma **senha de app** em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. No Gmail: **Configurações → Ver todas as configurações → Contas e importação →
   Enviar e-mail como → Adicionar outro endereço de e-mail**.
   - Nome: `Alan Aquino` · E-mail: `contato@josealan.com.br`
   - Servidor SMTP: `smtp.gmail.com` · Porta: `587` · TLS
   - Usuário: seu endereço Gmail completo · Senha: a **senha de app** do passo 2
4. O Gmail envia um código para `contato@josealan.com.br`, que chega no próprio Gmail pelo
   roteamento. Confirme.
5. Na Cloudflare, edite o registro **TXT** do SPF (o que começa com `v=spf1`) para
   autorizar também o Google:

   ```
   v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
   ```

6. (Recomendado) Adicione um TXT com nome `_dmarc`:

   ```
   v=DMARC1; p=none;
   ```

Ao escrever um e-mail, escolha `contato@josealan.com.br` no campo **De**.

---

## 4. (Recomendado) Verificar o domínio no GitHub

Impede que outra pessoa use o seu domínio no GitHub Pages dela.

1. **github.com → foto do perfil → Settings → Pages → Add a domain** → `josealan.com.br`.
2. Copie o registro **TXT** que o GitHub mostrar, adicione na Cloudflare e clique em **Verify**.
