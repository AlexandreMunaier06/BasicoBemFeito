document.addEventListener("DOMContentLoaded", function () {

    // Definação do botões
    const button_salvar = document.getElementById("salvar");
    const button_exibir = document.getElementById("exibir");
    const button_alterar = document.getElementById("alterar");
    const button_remover = document.getElementById("remover");
    const button_confirmar = document.getElementById("confirmar");
    const todos_os_campos = document.querySelectorAll("input");
    const todos_os_select = document.querySelectorAll("select");

    // Definicao das variaveis de cada campo de formulario
    const titular = document.querySelector("#titular");
    const cartao_numero1 = document.getElementById("cartao_numero1");
    const cartao_numero2 = document.getElementById("cartao_numero2");
    const cartao_numero3 = document.getElementById("cartao_numero3");
    const cartao_numero4 = document.getElementById("cartao_numero4");
    const validadeMes = document.getElementById("validade_mes");
    const validadeAno = document.getElementById("validade_ano");
    const cvv = document.getElementById("cvv");
    const cep = document.getElementById("cep");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const pais = document.getElementById("país");
    const endereco = document.getElementById("endereco");
    const bairro = document.getElementById("bairro")
    const numeroRes = document.getElementById("numero_residencia");
    const complemento = document.getElementById("complemento");

    // Salvar Informações
    function salvar_informacoes() {
        const informações_pagamento = {
            titular: titular.value,
            cartao_numero1: cartao_numero1.value,
            cartao_numero2: cartao_numero2.value,
            cartao_numero3: cartao_numero3.value,
            cartao_numero4: cartao_numero4.value,
            validadeMes: validadeMes.value,
            validadeAno: validadeAno.value,
            cvv: cvv.value,
            cep: cep.value,
            cidade: cidade.value,
            estado: estado.value,
            pais: pais.value,
            endereco: endereco.value,
            bairro: bairro.value,
            numeroRes: numeroRes.value,
            complemento: complemento.value
        };

        localStorage.setItem("informações_pagamento", JSON.stringify(informações_pagamento));
        limpar_campos();
    }

    // Exibir Informações
    function exibir_informacoes() {
        const dados_usuario = localStorage.getItem("informações_pagamento");

        if (dados_usuario) {
            const usuario = JSON.parse(dados_usuario);
            titular.value = usuario.titular;
            cartao_numero1.value = usuario.cartao_numero1;
            cartao_numero2.value = usuario.cartao_numero2;
            cartao_numero3.value = usuario.cartao_numero3;
            cartao_numero4.value = usuario.cartao_numero4;
            validadeMes.value = usuario.validadeMes;
            validadeAno.value = usuario.validadeAno;
            cvv.value = usuario.cvv;
            cep.value = usuario.cep;
            cidade.value = usuario.cidade;
            estado.value = usuario.estado;
            pais.value = usuario.pais;
            endereco.value = usuario.endereco;
            bairro.value = usuario.bairro
            numeroRes.value = usuario.numeroRes;
            complemento.value = usuario.complemento;
        }
    }

    // Função para limpar campos do formulário
    function limpar_campos() {
        titular.value = "";
        cartao_numero1.value = "";
        cartao_numero2.value = "";
        cartao_numero3.value = "";
        cartao_numero4.value = "";
        validadeMes.value = "";
        validadeAno.value = "";
        cvv.value = "";
        cep.value = "";
        cidade.value = "";
        estado.value = "";
        pais.value = "";
        endereco.value = "";
        bairro.value = ""
        numeroRes.value = "";
        complemento.value = "";
    }

    // Função para limpar informações Salvas no Local Storage
    function limpar_informacoes() {
        localStorage.removeItem("informações_pagamento");
        limpar_campos();
        alert('Informações removidas com sucesso!');
    }

    // Função para verificar se todos os campos estão preenchidos
    function campos_preenchidos() {
        return titular.value.trim() !== "" &&
            cartao_numero1.value.trim() !== "" &&
            cartao_numero2.value.trim() !== "" &&
            cartao_numero3.value.trim() !== "" &&
            cartao_numero4.value.trim() !== "" &&
            validadeMes.value.trim() !== "" &&
            validadeAno.value.trim() !== "" &&
            cvv.value.trim() !== "" &&
            cep.value.trim() !== "" &&
            cidade.value.trim() !== "" &&
            estado.value.trim() !== "" &&
            pais.value.trim() !== "" &&
            endereco.value.trim() !== "" &&
            bairro.value.trim() !== "" &&
            numeroRes.value.trim() !== "" &&
            complemento.value.trim() !== "";
    }

    // Botão Salvar
    button_salvar.addEventListener("click", function (event) {
        event.preventDefault();
        if (campos_preenchidos()) {
            salvar_informacoes();
            alert('Informações cadastradas com sucesso!');
            button_salvar.disabled = true;
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Botão Exibir
    button_exibir.addEventListener("click", function (event) {
        event.preventDefault();
        exibir_informacoes();
        button_salvar.disabled = true;
        button_alterar.disabled = false;
        todos_os_campos.forEach((item) => {
            item.disabled = true;
            item.style.color = "#ffffff";
            item.style.backgroundColor = "#333";
        });
        todos_os_select.forEach((item) => {
            item.disabled = true;
            item.style.color = "#ffffff";
            item.style.backgroundColor = "#333";
        });
    });

    // Botão Alterar
    button_alterar.addEventListener("click", function (event) {
        event.preventDefault();
        button_salvar.disabled = false;
        button_alterar.disabled = true;
        todos_os_campos.forEach((item) => {
            item.disabled = false;
            item.style.color = "#000000";
            item.style.backgroundColor = "";
        });
        todos_os_select.forEach((item) => {
            item.disabled = false;
            item.style.color = "#000000";
            item.style.backgroundColor = "";
        });
    });

    // Botão Limpar
    button_remover.addEventListener("click", function (event) {
        event.preventDefault();
        limpar_informacoes();
        button_salvar.disabled = false;
        button_alterar.disabled = true;
    });

    // Botão Finalizar (Encaminha para a próxima tela)
   

    // API CEP
    function verificarCep(cep) {
        const regex = /^[0-9]{8}$/;
        return regex.test(cep);
    }

    cep.addEventListener('focusout', async function () {
        const response = verificarCep(cep.value)
        if (response) {
            const apiCep = `http://viacep.com.br/ws/${cep.value}/json/`;
            try {
                const dados = await fetch(apiCep);
                const endereco1 = await dados.json();

                cidade.value = endereco1.localidade || "";
                estado.value = endereco1.uf || "";
                endereco.value = endereco1.logradouro || "";
                bairro.value = endereco1.bairro || ""
                complemento.value = endereco1.complemento || "";
            } catch (erro) {
                alert("Cep não encontrado!");
                console.error(erro);
            }
        } else {
            alert("Cep inválido! Digite apenas números");
        }
    });

    function getId(){
        return JSON.parse(localStorage.getItem("id"))
    }
    

    // FUNÇÃO PARA ATUALIZAR INFORMAÇÕES DB.JSON
    async function atualizarUsuario(novosDados) {
        const apiUsers = `http://localhost:3000/usuarios`;
        

        fetch(`${apiUsers}/${getId()}`, {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novosDados),
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        })
        .catch(error => {
            console.error(error);
        })
    }

    // Botão Confirmar e enviar dados para o json-server
    button_confirmar.addEventListener("click", function (event) {
        event.preventDefault();
        const planoSelecionado = document.querySelector(".b-card_cover.selected").dataset.identifier
        const novosDados = {
           plano_salvo: planoSelecionado,
            cartao: {
                titular: titular.value,
                numero_cartao: `${cartao_numero1.value}${cartao_numero2.value}${cartao_numero3.value}${cartao_numero4.value}`,
                validadeMes: validadeMes.value,
                validadeAno: validadeAno.value,
                cvv: cvv.value,
            },
            endereco: {
                cep: cep.value,
                cidade: cidade.value,
                estado: estado.value,
                pais: pais.value,
                endereco: endereco.value,
                bairro: bairro.value,
                numeroRes: numeroRes.value,
                complemento: complemento.value
            }
        };
        console.log(novosDados)
            
            if (campos_preenchidos()) {
                salvar_informacoes();
                atualizarUsuario(novosDados)
                window.location.href = "../especificacoes-ci/index.html";
            } else {
                alert("Por favor, preencha todos os campos.");
            }
    });

    // Salvar plano selecionado para o localStorage e animação
    const cards = document.querySelectorAll('.b-card_cover');
    const resultado = document.getElementById('resultado_plano');

    function marcar_card(identifier) {
        cards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.identifier === identifier) {
                card.classList.add('selected');
            }
        });
    }

    const plano_salvo = localStorage.getItem('plano_selecionado');
    if (plano_salvo !== null) {
        marcar_card(plano_salvo);
    }

    
    cards.forEach(card => {
        card.addEventListener('click', function () {
            cards.forEach(c => c.classList.add('unselected'));
            cards.forEach(c => c.classList.remove('selected'));
            this.classList.remove('unselected');
            this.classList.add('selected');

            localStorage.setItem('plano_selecionado', this.dataset.identifier);
            const planoJsonSalvo = this.dataset.identifier;
            resultado.textContent = `Plano Selecionado: ${this.dataset.identifier}`;
            return planoJsonSalvo
        });
        
    });
    
});