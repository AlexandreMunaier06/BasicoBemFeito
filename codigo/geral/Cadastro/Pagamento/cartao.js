document.addEventListener("DOMContentLoaded", function () {

  // Informações dos inputs
  const nome = document.getElementById('titular');
  const cartao_numero1 = document.getElementById('cartao_numero1');
  const cartao_numero2 = document.getElementById('cartao_numero2');
  const cartao_numero3 = document.getElementById('cartao_numero3');
  const cartao_numero4 = document.getElementById('cartao_numero4');
  const validade_ano = document.getElementById('validade_ano');
  const validade_mes = document.getElementById('validade_mes');
  const cvv = document.getElementById('cvv');

  const cartao = document.querySelector('.creditcard');



  // Função para atualizar o número do cartão
  function atualizarNumero() {
    const numero_cartao = document.getElementById('svgnumber');
    numero_cartao.textContent = `${cartao_numero1.value} ${cartao_numero2.value} ${cartao_numero3.value} ${cartao_numero4.value}`;
  }

  // Função para atualizar o nome do titular
  function atualizarTitular() {
    const titular_cartao = document.getElementById('svgname');
    titular_cartao.textContent = nome.value;
  }

  // Função para atualizar a validade do cartão
  function atualizarValidade() {
    const validade_cartao = document.getElementById('svgexpire');
    validade_cartao.textContent = `${validade_mes.value}/${validade_ano.value}`;
  }

  // Função para atualizar o CVV do cartão
  function atualizarCVV() {
    const cvv_cartao = document.getElementById('svgsecurity');
    cvv_cartao.textContent = cvv.value;
  }

  nome.addEventListener('input', atualizarTitular);
  cartao_numero1.addEventListener('input', atualizarNumero);
  cartao_numero2.addEventListener('input', atualizarNumero);
  cartao_numero3.addEventListener('input', atualizarNumero);
  cartao_numero4.addEventListener('input', atualizarNumero);
  validade_ano.addEventListener('input', atualizarValidade);
  validade_mes.addEventListener('input', atualizarValidade);
  cvv.addEventListener('input', atualizarCVV);

  cvv.addEventListener('focus', function () {
    cartao.classList.add('flipped');
    cartao.classList.remove('unflipped');

  });

  cvv.addEventListener('focusout', function () {
    cartao.classList.add('unflipped');
    cartao.classList.remove('flipped');

  });


  atualizarNumero();
  atualizarTitular();
  atualizarValidade();
  atualizarCVV();

  // Animação para virar o cartão
  cartao.addEventListener('click', function () {
    if (cartao.classList.contains('flipped')) {
      cartao.classList.remove('flipped');
      cartao.classList.add('unflipped');
    } else {
      cartao.classList.remove('unflipped');
      cartao.classList.add('flipped');
    }
  });


  const button_exibir = document.getElementById("exibir");
  const button_alterar = document.getElementById("alterar");
  const button_remover = document.getElementById("remover");

  //Função para que ao limpar as informações, atualiza os dados do cartão
  function atualizar() {
    atualizarNumero();
    atualizarTitular();
    atualizarValidade();
    atualizarCVV();
  }

  button_alterar.addEventListener("click", function (event) {
    event.preventDefault();
    atualizar();
  });

  button_remover.addEventListener("click", function (event) {
    event.preventDefault();
    atualizar();
  });

  button_exibir.addEventListener("click", function (event) {
    event.preventDefault();
    atualizar()
  });

  atualizar()
});



