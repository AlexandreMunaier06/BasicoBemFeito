let exercicios = [];
let fichaSelecionada = null;


const urlParams = new URLSearchParams(window.location.search);
const fichaId = urlParams.get("id");
const api = `http://localhost:3000/usuarios`
const fichaTitle = document.querySelector(".workout-title")
const saveButton = document.querySelector(".btn-save")
const nome = document.getElementById("atividade")
const series = document.getElementById("series")
const repeticoes = document.getElementById("repeticoes")
const descanso = document.getElementById("intervalo")
const carga = document.getElementById("carga")

function getId() {
  return JSON.parse(localStorage.getItem("id"));
}

async function fichaName(){
  fetch(api)
  .then(res => res.json())
  .then(data => {
    const usuarioAtual = data.find(usuario => usuario.id == getId())
    if(usuarioAtual){
      const fichas = usuarioAtual.fichas
      let fichaEncontrada = '';

      for(const key in fichas){
        if(fichas[key].id == fichaId){
            fichaEncontrada = fichas[key]
            break;
        }
      }
      if(fichaEncontrada){
        fichaTitle.textContent = fichaEncontrada.nome
        //carregarExercicios(ficha);
      }else {
        let errorMessage = document.createElement('p');
        errorMessage.classList.add("title__p")
        errorMessage.textContent = "Ficha não encontrada";
        fichaTitle.appendChild(errorMessage);
    }
    } 
  })
  .catch(error =>{
    console.error("Erro ao buscar os dados:", error)
  })
}

saveButton.addEventListener('click', () => {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == getId());
      if (usuarioAtual) {
        const fichas = usuarioAtual.fichas;
        let fichaEncontrada = null;

        for (const key in fichas) {
          if (fichas[key].id == fichaId) {
            fichaEncontrada = fichas[key];
            break;
          }
        }

        if (fichaEncontrada) {
          // Aqui você define o array de exercícios que deseja adicionar
          const novosExercicios = [
            { nome: nome.value, 
              series: parseInt(series.value), 
              repeticoes: parseInt(repeticoes.value),
              descanso: descanso.value,
              carga: carga.value 
            }
          ];

          // Adicione os novos exercícios à ficha encontrada
          fichaEncontrada.exercicios = fichaEncontrada.exercicios.concat(novosExercicios);

          // Prepare os novos dados para enviar ao servidor
          const novosDados = { fichas: usuarioAtual.fichas };

          // Chame a função para atualizar o JSON server
          changeJSON(novosDados);
          window.location.assign(`../../fichaview/index.html?id=${fichaId}`)
        }
      }
    })
    .catch(error => {
      console.error("Erro ao buscar os dados:", error);
    });
});



async function changeJSON(novosDados){
  fetch(`${api}/${getId()}`, {
      method:"PATCH",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(novosDados),
  })
  .then(res => res.json())
  .then(data => {
     console.log(data)
  })
  .catch(error => {
      console.error(error)
  })
}

const buttonVoltar = document.querySelector(".voltar")
buttonVoltar.addEventListener('click', () => {
  window.location.assign(`../../fichaView/index.html?id=${fichaId}`)
});


window.onload = function() {
  fichaName();
};


/*
async function carregarDados() {
  fetch(api)
  .then(res => res.json())
  .then(data => {
    const usuarioAtual = data.find(usuario => usuario.id == getId())
    if(usuarioAtual){
      const fichas = usuarioAtual.fichas
      let fichaEncontrada = '';

      for(const key in fichas){
        if(fichas[key].id == fichaId){
            fichaEncontrada = fichas[key]
            break;
        }
      }
      if(fichaEncontrada){
        
      }else {
        let errorMessage = document.createElement('p');
        errorMessage.classList.add("title__p")
        errorMessage.textContent = "Ficha não encontrada";
        fichaTitle.appendChild(errorMessage);
    }
    }
  })



  try {
    const response = await fetch(`${api}/${userId}`);
    const usuarioAtual = await response.json();

    const ficha = Object.values(usuarioAtual.fichas).find(f => f.id === fichaId);

    if (ficha) {
      exercicios = ficha.exercicios || [];
      criarListaDeExercicios();
    } else {
      alert("Ficha não encontrada com o ID fornecido.");
      window.location.href = `../../ficha/index.html`;
    }

    
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}


function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function salvarFichas() {
  let fichasSalvas = JSON.parse(localStorage.getItem('fichas')) || [];
  const fichaIndex = fichasSalvas.findIndex(f => f.id === fichaSelecionada.id);
  if (fichaIndex !== -1) {
    fichasSalvas[fichaIndex] = fichaSelecionada;
    localStorage.setItem('fichas', JSON.stringify(fichasSalvas));
  }
}

function adicionarExercicio(nome, series, repeticoes, descanso) {
  exercicios.push({ nome, series, repeticoes, descanso });
  fichaSelecionada.exercicios = exercicios;
  salvarFichas();
  criarListaDeExercicios();
}

function editarExercicio(index) {
  let novoNome = prompt("Digite o novo nome do exercício:", exercicios[index].nome);
  let novasSeries = prompt("Digite a quantidade de séries:", exercicios[index].series);
  let novasRepeticoes = prompt("Digite a quantidade de repetições:", exercicios[index].repeticoes);
  let novoDescanso = prompt("Digite o tempo de descanso (segundos):", exercicios[index].descanso);

  if (novoNome !== null && novoNome !== "" &&
      novasSeries !== null && novasSeries !== "" &&
      novasRepeticoes !== null && novasRepeticoes !== "" &&
      novoDescanso !== null && novoDescanso !== "") {
    exercicios[index] = {
      nome: novoNome,
      series: parseInt(novasSeries),
      repeticoes: parseInt(novasRepeticoes),
      descanso: parseInt(novoDescanso)
    };
    fichaSelecionada.exercicios = exercicios;
    salvarFichas();
    criarListaDeExercicios();
  }
}

function excluirExercicio(index) {
  let confirmacao = confirm("Tem certeza que deseja excluir este exercício?");
  if (confirmacao) {
    exercicios.splice(index, 1);
    fichaSelecionada.exercicios = exercicios;
    salvarFichas();
    criarListaDeExercicios();
  }
}

function criarListaDeExercicios() {
  let listGroup = document.querySelector('.list-group');
  listGroup.innerHTML = '';

  exercicios.forEach((exercicio, index) => {
    let listItem = document.createElement('a');
    listItem.href = "#";
    listItem.classList.add("list-group-item", "list-group-item-action");
    listItem.innerHTML = `${exercicio.nome} - ${exercicio.series}x${exercicio.repeticoes} - ${exercicio.descanso}s de descanso`;

    let buttonsContainer = document.createElement('span');

    // botao de editar
    let editButton = document.createElement('button');
    editButton.classList.add('crud-button');
    editButton.onclick = function() { editarExercicio(index); };
    let editIcon = document.createElement('img');
    editIcon.src = "../utils/img/editar.png";
    editIcon.alt = "Editar button";
    editButton.appendChild(editIcon);

    // botao de excluir
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('crud-button');
    deleteButton.onclick = function() { excluirExercicio(index); };
    let deleteIcon = document.createElement('img');
    deleteIcon.src = "../utils/img/excluir.png";
    deleteIcon.alt = "Excluir Button";
    deleteButton.appendChild(deleteIcon);

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(buttonsContainer);
    listGroup.appendChild(listItem);
  });
}

// Carrega os dados ao iniciar a página
window.onload = function() {
  fichaName();
  carregarDados();
};

function toggleForm() {
  const form = document.getElementById('fichaForm');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

function criarExercicio() {
  let nome = document.getElementById("atividade").value;
  let series = document.getElementById("series").value;
  let repeticoes = document.getElementById("repeticoes").value;
  let descanso = document.getElementById("intervalo").value;

  if (nome !== "" && series !== "" && repeticoes !== "" && descanso !== "") {
    adicionarExercicio(nome, parseInt(series), parseInt(repeticoes), parseInt(descanso));
    document.getElementById("atividade").value = '';
    document.getElementById("series").value = '';
    document.getElementById("repeticoes").value = '';
    document.getElementById("intervalo").value = '';
  }

}

const btnVoltar = document.querySelector(".voltar");
btnVoltar.addEventListener('click', () => {
  window.location.href = `../../ficha/index.html`;
})

const salvarButton = document.getElementById("salvarBotao")

*/