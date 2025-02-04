var valoresCampos = {};

function preencherCampos() {
    var inputs = document.querySelectorAll('input[type="text"], input[type="radio"]');
    inputs.forEach(function (input) {

        input.value = valoresCampos[input.id];
    });
}

const voltarButton = document.querySelector(".voltar")
voltarButton.addEventListener('click', () => {
    window.location.assign("../../Exercicios/ficha/index.html")
})

function getId() {
    return JSON.parse(localStorage.getItem("id"));
}

async function asideUserName(){
    const apiUrl = `http://localhost:3000/usuarios`
    const userName = document.getElementById("nome__title1")
    const userName2 = document.getElementById("nome__title2")
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
      if(usuarioAtual){
        userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`
        userName2.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`
      }
    })
  }

window.onload = function () {
    asideUserName()
}

document.addEventListener("DOMContentLoaded", function () {
    carregarDadosJson();
});

const diasTreino = document.getElementById('tempo');
const tempoTreino = document.getElementById('tempo2');
const treinoAtual = document.getElementById('descreva');
const objetivo = document.getElementById('objetivo');
const gruposMusculares = document.getElementById('priorizar');

async function carregarDadosJson() {
    const api = `http://localhost:3000/usuarios`;
    try {
        const res = await fetch(api);
        const data = await res.json();
        const usuarioAtual = data.find(usuario => usuario.id == getId());
        if (usuarioAtual) {
           
            diasTreino.value = usuarioAtual.especificacoes_academia.dias_treino || "";
            tempoTreino.value = usuarioAtual.especificacoes_academia.tempo_treino || "";
            treinoAtual.value = usuarioAtual.especificacoes_academia.treino_atual || "";
            objetivo.value = usuarioAtual.especificacoes_academia.objetivo || "";
            gruposMusculares.value = usuarioAtual.especificacoes_academia.grupos_musculares || "";

            var inputsText = document.querySelectorAll('input[type="text"]');
            
            inputsText.forEach(function (input) {
                input.classList.add('input-disabled');
                input.disabled = true;
            });  
        }
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
    }

   
}

async function changeJSON(novosDados) {
    const api = `http://localhost:3000/usuarios`;
    fetch(`${api}/${getId()}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosDados),
    })
        .then(res => res.json())
        .then(data => {
            console.log('Dados atualizados:', data);
        })
        .catch(error => {
            console.error('Erro ao atualizar dados:', error);
        });
}


const BotaoSalvar = document.querySelector(".save-button");
const BotaoEditar = document.querySelector(".edit-button");

BotaoSalvar.addEventListener("click", function salvarAlteracoes() {
    const novosDados = {
        especificacoes_academia: {
            dias_treino: diasTreino.value,
            tempo_treino: tempoTreino.value,
            treino_atual: treinoAtual.value,
            objetivo: objetivo.value,
            grupos_musculares: gruposMusculares.value,
        }
    };

    var inputsText = document.querySelectorAll('input[type="text"]');
    inputsText.forEach(function (input) {
        input.classList.add('input-disabled');
        input.disabled = true;
    });

    changeJSON(novosDados);
    alert("Alterações salvas com sucesso!");
})

BotaoEditar.addEventListener("click", function habilitarEdicao() {
    var inputsText = document.querySelectorAll('input[type="text"]');
   
    inputsText.forEach(function (input) {
        input.classList.remove('input-disabled');
        input.disabled = false;
    });
})
