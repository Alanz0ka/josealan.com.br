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
