const api = `http://localhost:3000/usuarios`
function getId(){
    return JSON.parse(localStorage.getItem("id"))
}
function salvarDadosJson({nome, descricao}){
    fetch(`${api}/${getId()}`)
    .then(res => res.json())
    .then(data => {
        const fichas = data.fichas || {};
        
        // Adiciona a nova ficha
        const novaFichaId = Object.keys(fichas).length > 0 ? Math.max(...Object.values(fichas).map(f => f.id)) + 1 : 1;
        fichas[nome] = {
            id: novaFichaId,
            nome,
            descricao,
            exercicios: []
        };
        
        // Atualiza os dados do usuário com a nova ficha
        return fetch(`${api}/${getId()}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fichas }),
        });
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        carregarFichas(); // Recarregar as fichas para mostrar a nova adição
    })
    .catch(error => {
        console.error("Erro ao salvar dados:", error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    asideUserName()
    const fichasContainer = document.getElementById("fichas-container");
    const criarFichaElemento = ficha => {
        const fichaElemento = document.createElement("div");
        fichaElemento.classList.add("col-12");
    
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "h-100");
    
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body", "d-flex", "flex-column");
    
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = ficha.nome;
        const cardLinha = document.createElement("hr");
        cardLinha.classList.add("linha");
    
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = ficha.descricao;
    
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("mt-auto");
    
        const verLink = document.createElement("a");
        verLink.classList.add("btn", "btn-primary", "me-2");
        verLink.href = `../fichaview/index.html?id=${ficha.id}`;
        verLink.textContent = "Ver";
    
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-delete");
        deleteButton.setAttribute("data-id", ficha.id);
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => {
            const fichas = JSON.parse(localStorage.getItem("fichas")) || [];
            const fichasAtualizadas = fichas.filter(item => item.id !== ficha.id);
            localStorage.setItem("fichas", JSON.stringify(fichasAtualizadas));
            carregarFichas();
        });
    
        
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardLinha);
        cardBodyDiv.appendChild(cardText);
        buttonGroup.appendChild(verLink);
        buttonGroup.appendChild(deleteButton);
        cardBodyDiv.appendChild(buttonGroup);
        cardDiv.appendChild(cardBodyDiv);
        fichaElemento.appendChild(cardDiv);
    
        return fichaElemento;
    };
    const carregarFichas = async () => {
        fetch(api)
        .then(res => res.json())
        .then(data =>{
            const usuarioAtual = data.find(usuario => usuario.id == getId())
            if(usuarioAtual){
                fichasContainer.innerHTML = ""
                Object.keys(usuarioAtual.fichas).forEach(key => {
                    const ficha = usuarioAtual.fichas[key];
                    console.log(ficha)
                    fichasContainer.appendChild(criarFichaElemento(ficha))
                })

            }

            const botaoCriarFicha = document.createElement("button");
            botaoCriarFicha.classList.add("btn", "btn-success");
            botaoCriarFicha.textContent = "Criar Nova Ficha";
            botaoCriarFicha.addEventListener("click", (event) => {
                event.preventDefault();
                const nome = prompt("Digite o nome da nova ficha:");
                const descricao = prompt("Digite a descrição da nova ficha:");
                if (nome && descricao) {
                    salvarDadosJson({ nome, descricao });
                }
            });

            fichasContainer.appendChild(botaoCriarFicha);
        })

        .catch(error =>{
            console.error("Erro: ", error)
        })
    };
    
    carregarFichas();
    fichasContainer.addEventListener("click", event => {
        if (event.target.classList.contains("btn-delete")) {
            const idFicha = parseInt(event.target.getAttribute("data-id"));
            excluirFicha(idFicha);
        }
    });
    const excluirFicha = idFicha => {
        fetch(`${api}/${getId()}`)
            .then(res => res.json())
            .then(data => {
                const fichas = data.fichas || {};
                // Remove a ficha com o ID especificado
                Object.keys(fichas).forEach(key => {
                    if (fichas[key].id === idFicha) {
                        delete fichas[key];
                    }
                });
                // Atualiza os dados do usuário sem a ficha excluída
                return fetch(`${api}/${getId()}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fichas }),
                });
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                carregarFichas(); // Recarregar as fichas para mostrar a remoção
            })
            .catch(error => {
                console.error("Erro ao excluir ficha:", error);
            });
            alert("Ficha excluída com sucesso");
    };
   async function getFichas(){
        fetch(api)
        .then(res => res.json())
        .then(data =>{
            const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")))
            if(usuarioAtual){
                console.log(usuarioAtual.fichas)
                return usuarioAtual.fichas || {}
            }
        })
    }
    getFichas()
});
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