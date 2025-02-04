const api = `http://localhost:3000/usuarios`

//Chamando elementos do HTML
const creditoBtn = document.getElementById("credito-btn")
const cartaoCredito = document.querySelector(".creditcard")
const styleCartaoCredito = document.querySelector(".cartao-credito")
const main = document.querySelector("main")
const cardMain = document.querySelector(".card-main")
const btnSalvar = document.querySelector(".btn-save")
const btnCancel = document.querySelector(".btn-cancel")
const btnAddress = document.querySelector("#address-btn")
const address = document.querySelector(".address")
const btnSalvarAddress = document.querySelector(".btn-save-address")
const btnCancelAddress = document.querySelector(".btn-cancel-address")
const styleAddressForm = document.querySelector(".address-form")
//===========================================================================//

//Inputs Cartão
let nameInput = document.getElementById("nameInput")
let numberInput1 = document.getElementById("numberInput1")
let numberInput2 = document.getElementById("numberInput2")
let numberInput3 = document.getElementById("numberInput3")
let numberInput4 = document.getElementById("numberInput4")
let monthInput = document.getElementById("validade_mes")
let yearInput = document.getElementById("validade_ano")
let cvvInput = document.getElementById("cvvInput")
//===========================================================================//

//Inputs Endereço
let cepInput = document.getElementById('cepInput')
let streetInput = document.getElementById('streetInput')
let cityInput = document.getElementById("cityInput")
let countryInput = document.getElementById("countryInput")
let stateInput = document.getElementById("stateInput")
let neighborhoodInput = document.getElementById("neighborhoodInput")
let complementInput = document.getElementById("complementInput")
let houseNumberInput = document.getElementById("houseNumberInput")
let addressForm = document.querySelectorAll(".address-form input")
//=====================================================================//

//Informações no cartão de Crédito
let holderName = document.querySelector(".card-name")
let cardNumber = document.querySelector(".card-number")
let expirationDate = document.querySelector(".card-date")
let cvv = document.querySelector(".card-cvv")
let holderNameBack = document.querySelector(".card-name-back")

//Criando Funções  


function enableInput() {
    nameInput.disabled = false
    numberInput1.disabled = false
    numberInput2.disabled = false
    numberInput3.disabled = false
    numberInput4.disabled = false
    cvvInput.disabled = false
    monthInput.disabled = false
    yearInput.disabled = false
}
function disableInput() {
    nameInput.disabled = true
    numberInput1.disabled = true
    numberInput2.disabled = true
    numberInput3.disabled = true
    numberInput4.disabled = true
    cvvInput.disabled = true
    monthInput.disabled = true
    yearInput.disabled = true
}


function enableAddressInput() {
    cepInput.disabled = false
    streetInput.disabled = false
    cityInput.disabled = false
    neighborhoodInput.disabled = false
    stateInput.disabled = false
    complementInput.disabled = false
    houseNumberInput.disabled = false
    countryInput.disabled = false
}

function disableAddressInput() {
    cepInput.disabled = true
    streetInput.disabled = true
    cityInput.disabled = true
    neighborhoodInput.disabled = true
    stateInput.disabled = true
    complementInput.disabled = true
    houseNumberInput.disabled = true
    countryInput.disabled = true
}

function verificarCep(cep) {
    // Expressão regular para validar o formato do CEP: 12345678
    const regex = /^[0-9]{8}$/;
    return regex.test(cep);
}


function removeInvalid(input) {
    const obrigatorioElement = document.querySelector('.obrigatorio-' + input.name)
    const divInvalid = obrigatorioElement.querySelector(".invalid")
    if (divInvalid) {
        obrigatorioElement.removeChild(divInvalid)
    }
}

function verificarCVV(cvv) {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
}

async function getDataJSON() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
            if(usuarioAtual){
                //Informações no Cartão
                holderName.textContent = `${usuarioAtual.cartao.titular}`
                let cont = 0;
                cardNumber.textContent = ""
                for (let i = 0; i < `${(usuarioAtual.cartao.numero_cartao).length}`; i++) {
                if (cont == 4) {
                    cont = 0
                    cardNumber.textContent = cardNumber.textContent + " "
                }
                cont++;
                cardNumber.textContent = cardNumber.textContent + `${(usuarioAtual.cartao.numero_cartao)[i]}`;
                }    
                expirationDate.textContent = `${usuarioAtual.cartao.validadeMes}/${usuarioAtual.cartao.validadeAno}`
                cvv.textContent = `${usuarioAtual.cartao.cvv}`

                holderNameBack.textContent = ''
                if (`${(usuarioAtual.cartao.titular).length}` > 26) {
                    for (let i = 0; i < 26; i++) {
                    holderNameBack.textContent = holderNameBack.textContent + `${(usuarioAtual.cartao.titular)[i]}`
                }
                } 

                // Informações no formulário de dados do pagamento
                nameInput.value = `${usuarioAtual.cartao.titular}`
                numberInput1.value = `${(usuarioAtual.cartao.numero_cartao).substring(0,4)}` || ""
                numberInput2.value = `${(usuarioAtual.cartao.numero_cartao).substring(4,8)}` || ""
                numberInput3.value = `${(usuarioAtual.cartao.numero_cartao).substring(8,12)}` || ""
                numberInput4.value = `${(usuarioAtual.cartao.numero_cartao).substring(12,16)}` || ""
                monthInput.value = `${usuarioAtual.cartao.validadeMes}` || ""
                yearInput.value = `${usuarioAtual.cartao.validadeAno}` || ""
                cvvInput.value = `${usuarioAtual.cartao.cvv}` || ""

                //Informações no formulário de dados do endereço
                cepInput.value = `${usuarioAtual.endereco.cep}` || ""
                cityInput.value = `${usuarioAtual.endereco.cidade}` || ""
                countryInput.value = `${usuarioAtual.endereco.pais}` || ""
                stateInput.value =  `${usuarioAtual.endereco.estado}` || ""
                streetInput.value = `${usuarioAtual.endereco.endereco}` || ""
                neighborhoodInput.value = `${usuarioAtual.endereco.bairro}` || ""
                complementInput.value = `${usuarioAtual.endereco.complemento}` || ""
                houseNumberInput.value = `${usuarioAtual.endereco.numeroRes}` || ""
            }

        })

}

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

async function asideUserName(){
    const apiUrl = `http://localhost:3000/usuarios`
    const userName = document.querySelector(".user__name")
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
      if(usuarioAtual){
        userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`
      }
    })
}

function getId(){
    return JSON.parse(localStorage.getItem("id"))
}


window.onload = function () {
//===========================================================================//
    getDataJSON()
    asideUserName()
    let contFalse = 0
    let contador = 0

    function formValidation(input) {
        const div = document.createElement("div")
        const obrigatorioElement = document.querySelector('.obrigatorio-' + input.name)
        if (input.value == "") {
            if (contador == 0) {
                div.style.color = "red"
                div.innerHTML = '<p>Este é um campo obrigatório!</p>'
                div.style.fontSize = "12px"
                div.style.textAlign = "left"
                div.style.marginLeft = "5px"
                div.classList.add("invalid")
                obrigatorioElement.appendChild(div)
            }
            contFalse += 1;
            input.classList.add("vazio")
            return true
        } else {
            if (input.value !== "") {
                removeInvalid(input)
                input.classList.remove("vazio")
            }
            return false
        }
    }

    //Adicionando evento aos botões
    creditoBtn.addEventListener('click', () => {
        creditoBtn.style.display = "none"
        btnAddress.style.display = "none"
        main.style.display = "block"
        main.style.margin = "auto"
        cardMain.style.flexDirection = "row"
        styleCartaoCredito.classList.remove("edit-small")

        //Habilitando inputs
        enableInput()
    })

    btnSalvar.addEventListener("click", () => {
        const response = verificarCVV(cvvInput.value)
        if (response) {
            creditoBtn.style.display = "flex"
            btnAddress.style.display = "flex"
            main.style.display = "none"
            cardMain.style.flexDirection = "column"
            //Desabilitando inputs
            disableInput()

            //Alterando o Local Storage
            localStorage.setItem("cardName", nameInput.value)
            localStorage.setItem("cardNumber", `${numberInput1.value}${numberInput2.value}${numberInput3.value}${numberInput4.value}`)
            localStorage.setItem("expirationMonth", monthInput.value)
            localStorage.setItem("expirationYear", yearInput.value)
            localStorage.setItem("CVV", cvvInput.value)

            //Alterando os valores do cartão
            const novosDados = {
                cartao:{
                    titular: nameInput.value,
                    numero_cartao: numberInput1.value + numberInput2.value + numberInput3.value + numberInput4.value,
                    validadeMes: monthInput.value,
                    validadeAno: yearInput.value,
                    cvv: cvvInput.value
                }
            }


            changeJSON(novosDados)

            //Alterando Usuário
            Cartao.cardName = `${localStorage.getItem("cardName")}`
            Cartao.cardNumber = localStorage.getItem("cardNumber")
            Cartao.expirationMonth = localStorage.getItem("expirationMonth")
            Cartao.expirationYear = localStorage.getItem("expirationYear")
            Cartao.CVV = localStorage.getItem("CVV")
            styleCartaoCredito.classList.add("edit-small")
        } else {
            alert("CVV Inválido!")
        }
    })

    btnCancel.addEventListener("click", () => {
        creditoBtn.style.display = "flex"
        btnAddress.style.display = "flex"
        main.style.display = "none"
        cardMain.style.flexDirection = "column"
        styleCartaoCredito.classList.add("edit-small")
        //Desabilitando inputs
        disableInput()

        //Resetando o forms
        getDataJSON()
    })

    btnAddress.addEventListener("click", () => {
        creditoBtn.style.display = "none"
        btnAddress.style.display = "none"
        address.style.display = "block"
        address.style.margin = "auto"
        cardMain.style.flexDirection = "row"
        styleCartaoCredito.classList.remove("edit-small")
        styleCartaoCredito.classList.add("edit-small-address")
        //Habilitando Inputs
        enableAddressInput()
    })

    btnCancelAddress.addEventListener("click", () => {
        creditoBtn.style.display = "flex"
        btnAddress.style.display = "flex"
        address.style.display = "none"
        cardMain.style.flexDirection = "column"
        styleCartaoCredito.classList.remove("edit-small-address")
        styleCartaoCredito.classList.add("edit-small")
        contador = 0;
        //Desabilitando Inputs
        disableAddressInput()

        //Removendo mensagem de erro
        const errorDivs = document.querySelectorAll(".invalid")
        errorDivs.forEach(div => {
            div.parentNode.removeChild(div)
        })


        getDataJSON()

        contFalse = 0;

    })


    //===========================================================================//

    //Adicionado Evento para o Flip
    cvvInput.addEventListener('focus', () => {
        cartaoCredito.classList.add('flipped')
    })
    cartaoCredito.classList.remove('unflipped')
    cvvInput.addEventListener('focusout', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    nameInput.addEventListener("focus", () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    numberInput1.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    numberInput2.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    numberInput3.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    numberInput4.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    monthInput.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    yearInput.addEventListener('focus', () => {
        cartaoCredito.classList.remove('flipped')
        cartaoCredito.classList.add('unflipped')
    })
    cartaoCredito.addEventListener('click', () => {
        if (cartaoCredito.classList.contains("flipped")) {
            cartaoCredito.classList.remove("flipped")
            cartaoCredito.classList.add("unflipped")
        } else {
            cartaoCredito.classList.add("flipped")
            cartaoCredito.classList.remove("unflipped")
        }

    })
    //===========================================================================//

    //Adicionando Alteração dinâmica
    numberInput1.addEventListener('change', () => {
        cardNumber.textContent = numberInput1.value + " "
    })

    numberInput2.addEventListener('change', () => {
        cardNumber.textContent = cardNumber.textContent + numberInput2.value + " "
    })

    numberInput3.addEventListener('change', () => {
        cardNumber.textContent = cardNumber.textContent + numberInput3.value + " "
    })

    numberInput4.addEventListener('change', () => {
        cardNumber.textContent = cardNumber.textContent + numberInput4.value + " "
    })

    nameInput.addEventListener("change", () => {
        holderName.textContent = nameInput.value
    })

    monthInput.addEventListener("change", () => {
        expirationDate.textContent = `${monthInput.value}/${yearInput.value}`
    })

    yearInput.addEventListener("change", () => {
        expirationDate.textContent = `${monthInput.value}/${yearInput.value}`
    })

    cvvInput.addEventListener("change", () => {
        cvv.textContent = cvvInput.value
    })

    //===========================================================================//

    cepInput.addEventListener("focusout", async function () {
        const response = verificarCep(cepInput.value)
        if (response) {
            const url = `http://viacep.com.br/ws/${cepInput.value}/json/`
            try {
                const dados = await fetch(url)
                const endereco = await dados.json()
                cityInput.value = endereco.localidade || ""
                streetInput.value = endereco.logradouro || ""
                stateInput.value = endereco.uf || ""
                neighborhoodInput.value = endereco.bairro || ""
                complementInput.value = endereco.complemento || ""
            }
            catch {
                alert("CEP não encontrado")
            }
        } else {
            alert("Cep inválido! Digite apenas números!")
        }

    })


    btnSalvarAddress.addEventListener('click', () => {
        const inputs = document.querySelectorAll(".address-form input");

        inputs.forEach(input => {
            formValidation(input)
        })
        formValidation(stateInput)
        contador += 1;

        if (contFalse == 0) {
            creditoBtn.style.display = "flex"
            btnAddress.style.display = "flex"
            address.style.display = "none"
            cardMain.style.flexDirection = "column"
            disableAddressInput()
            styleCartaoCredito.classList.remove("edit-small-address")
            styleCartaoCredito.classList.add("edit-small")

            //Alterando JSONServer
            const novosDados = {
                endereco:{
                    cep: cepInput.value,
                    cidade: cityInput.value,
                    estado: stateInput.value,
                    pais: countryInput.value,
                    endereco: streetInput.value,
                    bairro: neighborhoodInput.value,
                    numeroRes: houseNumberInput.value,
                    complemento: complementInput.value
                }
            }


           changeJSON(novosDados)
        }else{
            alert("Preencha todos os campos!")
        }
        contFalse = 0;

    })



}

const voltarButton = document.querySelector(".voltar")
voltarButton.addEventListener('click', () =>{
    window.location.assign("../../Exercicios/ficha/index.html")
})
