const urlParams = new URLSearchParams(window.location.search);
const fichaId = urlParams.get("id");
const api = `http://localhost:3000/usuarios`;

const fichaTitle = document.getElementById("workout-title");
const listGroup = document.querySelector(".list-group");

function getId() {
  return JSON.parse(localStorage.getItem("id"));
}

async function fichaName() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == getId());
      if (usuarioAtual) {
        const fichas = usuarioAtual.fichas;
        let fichaEncontrada = '';

        for (const key in fichas) {
          if (fichas[key].id == fichaId) {
            fichaEncontrada = fichas[key];
            break;
          }
        }
        if (fichaEncontrada) {
          fichaTitle.textContent = fichaEncontrada.nome;
          //carregarExercicios(ficha);
        } else {
          let errorMessage = document.createElement('p');
          errorMessage.classList.add("title__p");
          errorMessage.textContent = "Ficha não encontrada";
          fichaTitle.appendChild(errorMessage);
        }
      }
    })
    .catch(error => {
      console.error("Erro ao buscar os dados:", error);
    });
}

function carregarExercicios(ficha) {
  const exerciciosLista = document.querySelector(".list-group");

  ficha.exercicios.forEach(exercicio => {
    const listItem = document.createElement("a");
    listItem.href = "#";
    listItem.classList.add("list-group-item", "list-group-item-action", "lista-exercicio");
    listItem.textContent = `${exercicio.nome} - ${exercicio.series}x${exercicio.repeticoes} - ${exercicio.descanso}s de descanso`;

    exerciciosLista.appendChild(listItem);
  });
}

async function asideUserName() {
  const apiUrl = `http://localhost:3000/usuarios`;
  const userName = document.querySelector(".user__name");
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")));
      if (usuarioAtual) {
        userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`;
      }
    });
}

const buttonEditar = document.querySelector(".botao");
buttonEditar.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fichaId = parseInt(urlParams.get("id"), 10);
  window.location.assign(`../fichaEditavel/src/index.html?id=${fichaId}`);
});

const buttonVoltar = document.querySelector(".voltar");
buttonVoltar.addEventListener('click', () => {
  window.location.assign("../ficha/index.html");
});

async function listExercises() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == getId());
      if (usuarioAtual) {
        const fichas = usuarioAtual.fichas;
        let fichaEncontrada = '';

        for (const key in fichas) {
          if (fichas[key].id == fichaId) {
            fichaEncontrada = fichas[key];
            break;
          }
        }
        console.log(fichaEncontrada.exercicios);
        for (let i = 0; i < fichaEncontrada.exercicios.length; i++) {
          let div = document.createElement("div");
          div.classList.add("list-group-item");
          let str = document.createElement("p");
          str.classList.add("exercise");
          str.innerHTML = `
            <i class="fas fa-dumbbell"></i> ${fichaEncontrada.exercicios[i].nome}
            <i class="fas fa-list-ol"></i> ${fichaEncontrada.exercicios[i].series} séries 
            <i class="fas fa-sync-alt"></i> ${fichaEncontrada.exercicios[i].repeticoes}x 
            <i class="fas fa-clock"></i> ${fichaEncontrada.exercicios[i].descanso}s 
            <i class="fas fa-weight-hanging"></i> Carga: ${fichaEncontrada.exercicios[i].carga || 0} kg
          `;

          div.appendChild(str);
          listGroup.appendChild(div);

          let buttonsContainer = document.createElement('span');

          // Botão de excluir
          let deleteButton = document.createElement('button');
          deleteButton.classList.add('crud-button');
          deleteButton.onclick = function() { excluirExercicio(fichaEncontrada, i); };
          let deleteIcon = document.createElement('img');
          deleteIcon.src = "../fichaEditavel/utils/img/excluir.png";
          deleteIcon.alt = "Excluir Button";
          deleteButton.appendChild(deleteIcon);

          div.appendChild(deleteButton);
        }
      }
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

async function excluirExercicio(ficha, index) {
  let confirmacao = confirm("Tem certeza que deseja excluir este exercício?");
  if (confirmacao) {
    // Remove o exercício da ficha
    ficha.exercicios.splice(index, 1);

    // Atualiza o servidor
    await fetch(`${api}/${getId()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fichas: { [fichaId]: ficha } }),
    });

    // Atualiza a lista de exercícios na interface
    listGroup.innerHTML = '';
    listExercises();
  }
}

// Carrega os exercícios quando a página carrega
window.onload = function() {
  asideUserName();
  fichaName();
  listExercises();
};