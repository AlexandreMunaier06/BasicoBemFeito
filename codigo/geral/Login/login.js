document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('.login-form');
    const apiUrl = 'http://localhost:3000/usuarios';
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        fetch(apiUrl)
        .then(res => res.json())
        .then(data =>{
            const usuarioValido = data.find(usuario => usuario.email === email && usuario.password === password) 
                if(usuarioValido)
                {
                    alert("Login realizado com sucesso!");
                    localStorage.setItem("usuarioEmail", usuarioValido.email)
                    localStorage.setItem("usuarioPassword", usuarioValido.password)
                    localStorage.setItem("id", usuarioValido.id)
                    email = ''
                    password = ''
                    window.location.href = `../Exercicios/ficha/index.html`
                }
                else
                {
                    console.log("Vim pra ca")
                    alert("Email ou senha incorretos!")
                    document.getElementById('email').value = ''
                    document.getElementById('password').value = ''
                }
            
        })
        .catch(erro => {
            console.error("Falha ao recuperar email/senha", erro)
        })
        
 
    });
});

/*
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        const apiUrl = 'http://localhost:3000/usuarios';

   
        fetch(apiUrl)
            .then(response => response.json())
            .then(users => {
             
                const usuarioValido = users.finusuarioVald(usuario => usuario.email === email && usuario.password === password);

                if (usuarioValido) {
                    alert('Login realizado com sucesso!');
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    window.location.href = `../../Exercicios/ficha/index.html`
                } else {
                    alert('E-mail ou senha incorretos. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro ao verificar as credenciais:', error);
                alert('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
            });
    });
});

*/