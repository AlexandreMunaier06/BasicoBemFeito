document.addEventListener("DOMContentLoaded", function () {
    const button_salvar = document.getElementById("button_salvar");
    const button_exibir = document.getElementById("button_exibir");
    const button_alterar = document.getElementById("button_alterar");
    const button_limpar = document.getElementById("button_limpar");
    const button_finalizar = document.getElementById("button_finalizar");

    //Definicao das variaveis de cada campo de formulario
    const descricao_deficiencia = document.getElementById("descricao-deficiencia");
    const descricao_lesao = document.getElementById("descricao-lesao");
    const descricao_condicao = document.getElementById("descricao-condicao-medica");
    const peso = document.getElementById("peso");
    const altura = document.getElementById("altura");
    const dias_treino = document.getElementById("dias-treino");
    const tempo_treino = document.getElementById("tempo-treino");
    const treino_atual = document.getElementById("treino-atual");
    const objetivo = document.getElementById("objetivo");
    const grupos_musculares = document.getElementById("grupos-musculares");

    const todos_os_campos = document.querySelectorAll("input");
    const todos_os_checked = document.querySelectorAll("input[type='radio']:checked");

    
    //Salvar Informações 
    function salvar_informacoes() {
        const usuario = {
            deficiencia: document.querySelector("input[name='deficiencia']:checked").value,
            descricao_deficiencia: descricao_deficiencia.value,
            lesao: document.querySelector("input[name='lesao']:checked").value,
            descricao_lesao: descricao_lesao.value,
            condicao_medica: document.querySelector("input[name='condicao-medica']:checked").value,
            descricao_condicao: descricao_condicao.value,
            peso: peso.value,
            altura: altura.value,
            dias_treino: dias_treino.value,
            tempo_treino: tempo_treino.value,
            treino_atual: treino_atual.value,
            objetivo: objetivo.value,
            grupos_musculares: grupos_musculares.value
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert('Informações cadastradas com sucesso!');
        window.location.assign(`../../Exercicios/ficha/index.html`)
        limpar_campos();
    }

    // Exibir Informações 
    function exibir_informacoes() {
        const dados_usuario = localStorage.getItem("usuario");

        if (dados_usuario) {
            const usuario = JSON.parse(dados_usuario);

            document.querySelector(`input[name='deficiencia'][value='${usuario.deficiencia}']`).checked = true;
            descricao_deficiencia.value = usuario.descricao_deficiencia;
            document.querySelector(`input[name='lesao'][value='${usuario.lesao}']`).checked = true;
            descricao_lesao.value = usuario.descricao_lesao;
            document.querySelector(`input[name='condicao-medica'][value='${usuario.condicao_medica}']`).checked = true;
            descricao_condicao.value = usuario.descricao_condicao;
            peso.value = usuario.peso;
            altura.value = usuario.altura;
            dias_treino.value = usuario.dias_treino;
            tempo_treino.value = usuario.tempo_treino;
            treino_atual.value = usuario.treino_atual;
            objetivo.value = usuario.objetivo;
            grupos_musculares.value = usuario.grupos_musculares;
        }
    }

    // Função para limpar campos do formulário
    function limpar_campos() {
        const inputsChecked = document.querySelectorAll("input[type='radio']:checked");
        inputsChecked.forEach(input => input.checked = false);
        descricao_deficiencia.value = "";
        descricao_lesao.value = "";
        descricao_condicao.value = "";
        peso.value = "";
        altura.value = "";
        dias_treino.value = "";
        tempo_treino.value = "";
        treino_atual.value = "";
        objetivo.value = "";
        grupos_musculares.value = "";
    }

    // Função para limpar informações Salvas no Local Storage 
    function limpar_informacoes() {
        localStorage.removeItem("usuario");
        limpar_campos();
        alert('Informações removidas com sucesso!');
    }

    // Função para verificar se todos os campos estão preenchidos
    function campos_preenchidos() {
        const deficiencia = document.querySelector("input[name='deficiencia']:checked");
        const lesao = document.querySelector("input[name='lesao']:checked");
        const condicao_medica = document.querySelector("input[name='condicao-medica']:checked");

        return descricao_deficiencia.value.trim() !== "" &&
            descricao_lesao.value.trim() !== "" &&
            descricao_condicao.value.trim() !== "" &&
            peso.value.trim() !== "" &&
            altura.value.trim() !== "" &&
            dias_treino.value.trim() !== "" &&
            tempo_treino.value.trim() !== "" &&
            treino_atual.value.trim() !== "" &&
            objetivo.value.trim() !== "" &&
            grupos_musculares.value.trim() !== "";
    }

    
    // Botão Salvar 
    button_salvar.addEventListener("click", function (event) {
        event.preventDefault();
        if (button_salvar.disabled == false){
        salvar_informacoes();
        button_salvar.disabled = true;
        }
    });

    // Botão Exibir
    button_exibir.addEventListener("click", function (event) {
        event.preventDefault();
        exibir_informacoes();
        button_salvar.disabled = true;
        button_alterar.disabled = false;
        todos_os_campos.forEach((item)=>{
            item.disabled = true;
            item.style.color = "#ffffff";
        });

        todos_os_checked.forEach((item)=>{
            item.disabled = true;
            item.style.color = "#FFFFFF";
        });

        
    });

    // Botão Alterar
    button_alterar.addEventListener("click", function (event) {
        event.preventDefault();
        button_salvar.disabled = false;
        button_alterar.disabled = true;
        todos_os_campos.forEach((item)=>{
            item.disabled = false;
            item.style.color = "#000000";
        });
        todos_os_checked.forEach((item)=>{
            item.disabled = false;
        });

    });

    // Botão Limpar
    button_limpar.addEventListener("click", function (event) {
        event.preventDefault();
        limpar_informacoes();
        button_salvar.disabled = false;
        button_alterar.disabled = true;
    });

    // Botão Finalizar (Encaminha para a próxima tela)
    /*
    button_finalizar.addEventListener("click", function (event) {
        event.preventDefault();
        if (campos_preenchidos()) {
            salvar_informacoes();
            window.location.href = "#";
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
*/
    // FUNÇÃO PARA ATUALIZAR INFORMAÇÕES DB.JSON //////////////////////////////////////

    async function atualizarUsuario(novosDados) {
        const apiUsers = `http://localhost:3000/usuarios`;
        
        try {
            const response = await fetch(`${apiUsers}/${getId()}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novosDados),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erro ao tentar atualizar usuário:', error);
            throw error; 
        }
    }

    // Botão Confirmar e enviar dados para o json-server
    button_finalizar.addEventListener("click", async function (event) {
        event.preventDefault();
    
        const novosDados = {
            especificacoes_pessoais: {
                deficiencia: document.querySelector('input[name="deficiencia"]:checked').value,
                descricao_deficiencia: descricao_deficiencia.value,
                lesao: document.querySelector('input[name="lesao"]:checked').value,
                descricao_lesao: descricao_lesao.value,
                condicao_medica: document.querySelector('input[name="condicao-medica"]:checked').value,
                descricao_condicao: descricao_condicao.value,
                peso: peso.value,
                altura: altura.value,
            },
            especificacoes_academia: {
                dias_treino: dias_treino.value,
                tempo_treino: tempo_treino.value,
                treino_atual: treino_atual.value,
                objetivo: objetivo.value,
                grupos_musculares: grupos_musculares.value
            }
        };
    
        console.log(novosDados);
    
        if (campos_preenchidos()) {
            try {
                salvar_informacoes(); 
                await atualizarUsuario(novosDados);
                alert("Informações atualizadas com sucesso!");
                window.location.href = "#"; 
            } catch (error) {
                alert("Erro ao atualizar usuário. Por favor, tente novamente!");
                console.error("Erro ao tentar atualizar usuário:", error);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    asideUserName();
    
});

function getId(){
    return JSON.parse(localStorage.getItem("id"))
}

async function asideUserName(){
    const apiUrl = `http://localhost:3000/usuarios`
    const userName = document.querySelector(".nome__title")
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
      if(usuarioAtual){
        userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`
      }
    })
  }

window.onload = function(){
    asideUserName()
}
