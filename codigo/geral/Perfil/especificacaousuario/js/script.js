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

async function asideUserName() {
    const apiUrl = `http://localhost:3000/usuarios`
    const userName = document.getElementById("nome__title1")
    const userName2 = document.getElementById("nome__title2")
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
            if (usuarioAtual) {
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


let deficienciaRadio = document.querySelectorAll("input[name='deficiencia']")
let deficienciaDescricao = document.getElementById('deficiencia_descricao');
let lesaoRadio = document.querySelector("input[name='lesao']:checked")
let lesaoDescricao = document.getElementById('lesao_descricao');
let condicaoRadio = document.querySelector("input[name='condicao']:checked")
let condicaoDescricao = document.getElementById('condicao_descricao');
let peso = document.getElementById('peso-input');
let altura = document.getElementById('altura-input');
let todos_os_checked = document.querySelectorAll("input[type='radio']:checked");

async function carregarDadosJson() {
    const api = `http://localhost:3000/usuarios`;
    try {
        const res = await fetch(api);
        const data = await res.json();
        const usuarioAtual = data.find(usuario => usuario.id == getId());
        if (usuarioAtual) {
            deficienciaRadio.forEach(radio => {
                console.log(radio)
                console.log(radio.value)
                console.log(usuarioAtual.especificacoes_pessoais.deficiencia)
                if (radio.value === usuarioAtual.especificacoes_pessoais.deficiencia) {
                    radio.checked = true
                }
            })
            document.querySelector(`input[name='deficiencia'][value='${usuarioAtual.especificacoes_pessoais.deficiencia}']`).checked = true;
            deficienciaRadio.value = usuarioAtual.especificacoes_pessoais.deficiencia || "";
            deficienciaDescricao.value = usuarioAtual.especificacoes_pessoais.descricao_deficiencia || "";
            document.querySelector(`input[name='lesao'][value='${usuarioAtual.especificacoes_pessoais.lesao}']`).checked = true;
            lesaoDescricao.value = usuarioAtual.especificacoes_pessoais.descricao_lesao || "";
            document.querySelector(`input[name='condicao'][value='${usuarioAtual.especificacoes_pessoais.condicao_medica}']`).checked = true;
            condicaoDescricao.value = usuarioAtual.especificacoes_pessoais.descricao_condicao || "";
            peso.value = usuarioAtual.especificacoes_pessoais.peso || "";
            altura.value = usuarioAtual.especificacoes_pessoais.altura || "";

            var inputsText = document.querySelectorAll('input[type="text"]');
            var inputsRadio = document.querySelectorAll('input[type="radio"]')

            inputsText.forEach(function (input) {
                input.classList.add('input-disabled');
                input.disabled = true;
            });
            inputsRadio.forEach((input) => {
                input.disabled = true;
              
            });

            console.log(usuarioAtual.especificacoes_pessoais.deficiencia);
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
        especificacoes_pessoais: {
            deficiencia: document.querySelector("input[name='deficiencia']:checked").value,
            descricao_deficiencia: deficienciaDescricao.value,
            lesao: document.querySelector("input[name='lesao']:checked").value,
            descricao_lesao: lesaoDescricao.value,
            condicao_medica: document.querySelector("input[name='condicao']:checked").value,
            descricao_condicao: condicaoDescricao.value,
            peso: peso.value,
            altura: altura.value,
        }
    };

    var inputsText = document.querySelectorAll('input[type="text"]');
    var inputsRadio = document.querySelectorAll('input[type="radio"]')
    inputsText.forEach(function (input) {
        input.classList.add('input-disabled');
        input.disabled = true;
    });
    inputsRadio.forEach((input) => {
        input.disabled = true;
        input.style.color = "#FFFFFF";
    });


    changeJSON(novosDados);
    alert("Alterações salvas com sucesso!");
})

BotaoEditar.addEventListener("click", function habilitarEdicao() {
    var inputsText = document.querySelectorAll('input[type="text"]');
    var inputsRadio = document.querySelectorAll('input[type="radio"]')

    inputsText.forEach(function (input) {
        input.classList.remove('input-disabled');
        input.disabled = false;
    });
    inputsRadio.forEach((input) => {
        input.disabled = false;
    });
})
