# josealan.com.br — Site Pessoal de Alan Aquino

Site pessoal e portfólio de **José Alan de Aquino Santos**, Analista de Suporte N2 em
infraestrutura de TI e estudante de Sistemas para Internet na **UNCISAL**.

O site reúne:

- **Trajetória** — da I.Soluções (estágio → N2) ao PET-Saúde/I&SD e ao projeto Blessed do IFAL.
- **Projetos** — seleção de repositórios, com descrição, tecnologias e links.
- **Contato** — e-mail no domínio próprio, WhatsApp, redes e currículo em PDF.

🔗 **Acesse:** [josealan.com.br](https://josealan.com.br)

## Funcionalidades

| Seção | Descrição |
|-------|-----------|
| Abertura | Apresentação, foto e atalhos para as seções |
| Agora | Atuação atual (trabalho, bolsa e graduação) |
| Trajetória | Linha do tempo profissional e formação |
| Projetos | Projetos em destaque com links para o código e demos |
| Stack | Ferramentas de infraestrutura e desenvolvimento |
| Contato | E-mail com botão "copiar", WhatsApp, redes e currículo |

Detalhes:

- Tema **claro e escuro** automático, de acordo com o sistema do visitante.
- Layout **responsivo** (celular, tablet e desktop).
- **Relógio** com o horário de Maceió no topo da página.
- Metadados **Open Graph** para a pré-visualização do link no WhatsApp e no LinkedIn.
- Página **404** personalizada.
- Página [`/privacidade`](https://josealan.com.br/privacidade): política de privacidade do **rclone-homelab**, o
  cliente OAuth de uso pessoal que envia os backups do homelab para o Google Drive (o Google exige o link para
  publicar o app). Fica fora dos buscadores (`noindex`) e não é ligada pela página principal.

## Tecnologias

- **HTML, CSS e JavaScript** puros (sem framework e sem etapa de build)
- Fontes **IBM Plex Sans**, **IBM Plex Mono** e **Instrument Serif** (Google Fonts)
- Hospedagem no **GitHub Pages**
- Domínio registrado no **Registro.br**, com DNS e e-mail (**Email Routing**) na **Cloudflare**
- Currículo gerado a partir de HTML com o **Google Chrome** em modo headless

## Estrutura do projeto

```
josealan.com.br/
├── index.html                   # Página principal
├── style.css                    # Estilos (tema claro/escuro, responsivo)
├── script.js                    # Relógio, ano do rodapé e botão "copiar e-mail"
├── 404.html                     # Página de erro
├── privacidade.html             # Política de privacidade do rclone-homelab (app pessoal de backup)
├── {in,ig,aws,gh}.html          # Links de entrada do LinkedIn, Instagram, AWS e GitHub (contam a visita e levam ao início)
├── favicon.svg                  # Ícone da aba
├── CNAME                        # Domínio personalizado do GitHub Pages
├── assets/
│   ├── alan-aquino.jpg          # Foto de perfil
│   └── curriculo-alan-aquino.pdf  # Currículo publicado
└── _curriculo/
    └── curriculo.html           # Fonte do currículo (não é publicada)
```

> Pastas iniciadas com `_` são ignoradas pelo GitHub Pages, por isso o HTML do
> currículo fica no repositório sem aparecer no site.

## Como executar

**Pré-requisitos:** Python 3 (apenas para servir os arquivos localmente).

```bash
# 1. Clonar o repositório
git clone https://github.com/Alanz0ka/josealan.com.br.git
cd josealan.com.br

# 2. Servir o site localmente
python3 -m http.server 8000
```

Acesse **http://localhost:8000**.

### Atualizar o currículo

Edite `_curriculo/curriculo.html` e gere o PDF novamente:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="assets/curriculo-alan-aquino.pdf" \
  "file://$PWD/_curriculo/curriculo.html"
```

> O currículo foi pensado para caber em **uma página A4**. Depois de editar, confira
> se o PDF continua com uma página só.

### Publicar

Qualquer `git push` na branch `main` publica o site automaticamente pelo GitHub Pages.

## Hospedagem e domínio

| Serviço | Uso |
|---------|-----|
| GitHub Pages | Hospedagem do site (branch `main`, raiz do repositório) |
| Registro.br | Registro do domínio `josealan.com.br` |
| Cloudflare DNS | Registros A/CNAME apontando para o GitHub Pages |
| Cloudflare Email Routing | Encaminhamento de `contato@josealan.com.br` |
| Cloudflare Web Analytics | Contagem de visitas sem cookies (snippet em `index.html` e `404.html`; o DNS é "DNS only", então a injeção automática não funciona) |

## Métricas de acesso

As visitas são contadas pelo **Cloudflare Web Analytics**, sem cookies e sem coletar dados pessoais. A contagem
começou em 03/10/2026; não existe histórico de antes disso.

Como ver:

1. Entrar no painel da Cloudflare (`dash.cloudflare.com`).
2. No menu lateral, abrir **Análise → Web Analytics** (o painel mostra os sites da conta; hoje só existe `josealan.com.br`).
3. No seletor de período (padrão "Últimas 24 horas"), escolher **Últimos 7 dias** ou **Últimos 30 dias**.
4. Abrir a aba **Visitas** para ver a origem (referente), os caminhos, os países, os navegadores e os dispositivos.
5. Para olhar só o site, usar a aba **Host** e a linha `josealan.com.br`. Até 03/10/2026, o mesmo site do
   Web Analytics também media os subdomínios do homelab, e esses dados antigos aparecem misturados.

Observações:

- Os números são amostrados (vêm arredondados, em múltiplos de 10). Com pouco tráfego, uma visita isolada pode
  não aparecer, e os dados levam alguns minutos para chegar ao painel.
- Visitas de quem bloqueia scripts de análise (bloqueadores de anúncio, alguns navegadores) não são contadas.
- O script está na página principal, na 404 e nos links de entrada. A página `/privacidade` fica sem contagem.
- No painel, a configuração do site deve continuar em **"Ative com a instalação do JS Snippet"**. A injeção
  automática não funciona aqui porque o DNS do site está em "DNS only".

### Links de entrada por rede

O Web Analytics **não registra parâmetros de URL**, então links com `?utm_source=` aparecem só como `/`
([FAQ da Cloudflare](https://developers.cloudflare.com/web-analytics/faq/)). Para separar as redes, cada uma tem
um endereço próprio:

| Rede | Link para divulgar | Arquivo |
|------|--------------------|---------|
| LinkedIn | `https://josealan.com.br/in` | `in.html` |
| Instagram | `https://josealan.com.br/ig` | `ig.html` |
| AWS | `https://josealan.com.br/aws` | `aws.html` |
| GitHub | `https://josealan.com.br/gh` | `gh.html` |

A página conta a visita, espera o carregamento terminar e leva para o início (`location.replace`). Sem
JavaScript, um `meta refresh` leva depois de 3 s. As páginas ficam fora dos buscadores (`noindex`, `canonical` para
o início). No painel, a aba **Caminho** mostra `/in`, `/ig`, `/aws` e `/gh`; a visita seguinte em `/` vem com referente interno
e não conta como visita nova.

Para criar outra rede, copie `in.html` com outro nome (ex.: `yt.html` para o YouTube) e troque a rede no comentário.
