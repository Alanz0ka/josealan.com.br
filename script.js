// Relógio no horário de Maceió
const relogio = document.getElementById('relogio');
const formatoHora = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Maceio',
});

function atualizarRelogio() {
  relogio.textContent = formatoHora.format(new Date());
}

atualizarRelogio();
setInterval(atualizarRelogio, 15000);

// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Endereço pedido, na página 404
const caminho = document.getElementById('caminho');
if (caminho) {
  try {
    caminho.textContent = decodeURI(location.pathname);
  } catch {
    caminho.textContent = location.pathname;
  }
}

// Botão "copiar" do e-mail
document.querySelectorAll('[data-copiar]').forEach((botao) => {
  botao.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(botao.dataset.copiar);
      botao.textContent = 'copiado!';
    } catch {
      botao.textContent = 'não deu :(';
    }
    setTimeout(() => (botao.textContent = 'copiar'), 1800);
  });
});
