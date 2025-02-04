// JavaScript Menu de Alterações
import { User } from "./User.js"

const api = `http://localhost:3000/usuarios`

// Pegando os elementos HTML
let btnSalvar = document.querySelector('.btn-save')
let btnCancelar = document.querySelector('.btn-cancel')
let inputs = document.querySelectorAll('input')
let select = document.querySelector('select')
let cardBtn = document.querySelector(".card-btn")

// Atribuindo os valores aos campos de Input por meio do Local Storage
let nome = document.querySelector("#name")
let lastname = document.querySelector("#sobrenome")
let email = document.querySelector("#email")
let phone = document.querySelector("#telefone")
let password = document.querySelector("#password")
let genero = document.querySelector("#genero")
let plan = document.querySelector("#plan")


// JavaScript Card
let cardName = document.querySelector("h5.card-name")
let cardEmail = document.querySelector(".card-email")
let cardPhone = document.querySelector(".card-phone")
let cardGenre = document.querySelector(".card-genre")
let cardPassword = document.querySelector(".card-password")
let cardPlan = document.querySelector(".card-plan")
let card = document.querySelector("div.card")
let mainContent = document.querySelector("main")


function verificarEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
}


function getId(){
    return JSON.parse(localStorage.getItem("id"))
}

async function getDataJSON(){
    fetch(api)
    .then(res => res.json())
    .then(data =>{
        const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
            if(usuarioAtual){
                cardPlan.textContent = `${usuarioAtual.plano_salvo}`
                plan.value = `${usuarioAtual.plano_salvo}`
                cardName.textContent = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`
                nome.value = `${usuarioAtual.firstName}`
                lastname.value = `${usuarioAtual.lastName}`
                cardEmail.textContent = `${usuarioAtual.email}`
                email.value = `${usuarioAtual.email}`
                cardPhone.textContent = `${usuarioAtual.number}`
                phone.value =  `${usuarioAtual.number}`
                cardGenre.textContent = `${usuarioAtual.gender}`
                genero.value = `${usuarioAtual.gender}`
                password.value = `${usuarioAtual.password}`
                let tamanho = `${usuarioAtual.password.length}`
                cardPassword.textContent = ''
                for(let i=0; i<tamanho;i++){
                    cardPassword.textContent += "*"
                }
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

const voltarButton = document.querySelector(".voltar")
    voltarButton.addEventListener('click', () =>{
        window.location.assign("../../Exercicios/ficha/index.html")
    })

window.addEventListener("DOMContentLoaded", ()=>{  

    //Atribuindo funções aos botões
    cardBtn.addEventListener("click", ()=>{
    card.style.margin = 0
    card.style.height = "93vh"
    mainContent.style.display = "block"
    cardBtn.style.display = "none"
    btnSalvar.style.display = 'flex'
    btnCancelar.style.display = "flex"
    card.classList.add("edit-sm")
    //Animação
    card.classList.add("card-animation-in")
    card.classList.remove("card-animation-out")
    mainContent.classList.add("card-animation-out")
    mainContent.classList.remove("card-animation-in")
    //Fim da animação
    inputs.forEach((item)=>{
        item.disabled = false
    })
    select.disabled = false
    })
    plan.disabled = false

    btnSalvar.addEventListener('click', ()=>{
    const response = verificarEmail(email.value)
    if(response){
        btnSalvar.style.display = 'none'
        inputs.forEach((item)=>{
            item.disabled = true
        })
        select.disabled = true
        mainContent.style.display = "none"
        card.style.margin = "auto"
        card.style.marginTop = "15vh"
        card.style.height = "auto"
        cardBtn.style.display = "inline"
        card.classList.remove("edit-sm")
        //Animação
        card.classList.add("card-animation-out")
        card.classList.remove("card-animation-in")
        mainContent.classList.remove("card-animation-out")
        mainContent.classList.add("card-animation-in")
    
        //Fim da animação
    
        //Mudando as informações no JSON-SERVER
        const novosDados = {
            firstName: nome.value,
            lastName: lastname.value,
            email: email.value,
            number: phone.value,
            password: password.value,
            gender: genero.value,
            plano_salvo: plan.value
        }

        changeJSON(novosDados)
    
        
    }else{
        alert("Digite um email válido!")
    }
    })

    btnCancelar.addEventListener('click', ()=>{
    btnCancelar.style.display = 'none'
    inputs.forEach((item)=>{
        item.disabled = true
    })
    select.disabled = true
    mainContent.style.display = "none"
    card.style.margin = "auto"
    card.style.marginTop = "15vh"
    card.style.height = "auto"
    cardBtn.style.display = "inline"
    card.classList.remove("edit-sm")
    //Animação
    card.classList.add("card-animation-out")
    card.classList.remove("card-animation-in")
    mainContent.classList.remove("card-animation-out")
    mainContent.classList.add("card-animation-in")
    //Fim da animação

    //Resetando os inputs

    getDataJSON()
})

    getDataJSON()

})

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

window.onload = function(){
    asideUserName()
}