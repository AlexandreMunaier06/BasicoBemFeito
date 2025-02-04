const apiUrl = "http://localhost:3000/usuarios";

function salvarDados(formData) {
    const cadastros = localStorage.getItem('cadastros') ? JSON.parse(localStorage.getItem('cadastros')) : [];
    cadastros.push(formData);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
}

function limparCampos() {
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    document.getElementById('password').value = "";
    document.getElementById('confirmPassword').value = "";
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        radio.checked = false;
    });
}

async function salvarDadosJSON(dados) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao inserir usuário via API JSONServer: ${errorMessage}`);
        }

        const data = await response.json();
        displayMessage("Cadastro realizado com sucesso!");
        return data;
    } catch (error) {
        console.error("Erro ao inserir usuário via API JSONServer", error);
        throw error;
    }
}

function displayMessage(message) {
    alert(message);
}

// FUNÇÃO CRIAR ID ////////////////////////////

async function getID() {
    const apiUsers = "http://localhost:3000/usuarios";
    try {
        const res = await fetch(apiUsers);
        const data =  await res.json();

        if (data.length === 0) {
            return "1";
        }else{
            const ids = data.map(usuarios => usuarios.id);
            const maxID = Math.max(...ids);
            return (maxID + 1).toString();
        }

    } catch (error) {
        console.error("Erro ao obter o ID:", error);
    }
}

async function emailExistente(email){
    const res = await fetch(apiUrl)
    const usuarios = await res.json()
    if(usuarios.some(usuario => usuario.email === email)){
        alert("Email já cadastrado! Digite outro email!")
        return 1
    }else{
        return 0
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = document.querySelector('#confirmButton');

    

    confirmButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !lastName || !email || !number || !password || !confirmPassword || !gender) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Por favor, digite um e-mail válido.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, digite as senhas novamente.');
            return;
        }
/* Tentar verificar email
        if(emailExistente(email)){
            return
        }else{
        }
*/

        try {
            const id = await getID();
            localStorage.setItem("id", id);
            if(id != null){
                const formData = {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    number: number,
                    password: password,
                    gender: gender,
                    fichas: {}
                };
                console.log("Tentando salvar os dados no JSONServer:", formData);
                
                window.location.href = "/codigo/geral/Cadastro/Pagamento/pagamento.html"
                const response = await salvarDadosJSON(formData);
                if(response){
                    limparCampos();
                    console.log("Cadastro realizado com sucesso.");
                    console.log("ola")
                   
                }else{
                    throw new Error("Falha ao salvar os dados.");
                }
            } 
        }catch (error) {
            alert("Erro ao cadastrar. Por favor, tente novamente!");
            console.error("Erro ao tentar cadastrar:", error);
    } 
        

            
    });
});

