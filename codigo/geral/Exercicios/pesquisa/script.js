document.addEventListener("DOMContentLoaded", function() {
  const searchBar = document.getElementById("search-bar");
  const cardsContainer = document.getElementById("cards-container");

  searchBar.addEventListener("input", function() {
      const searchText = searchBar.value.toLowerCase();

      Array.from(cardsContainer.children).forEach(function(card) {
          const cardTitle = card.getAttribute("data-title").toLowerCase();

          if (cardTitle.includes(searchText)) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      });
  });

});

async function asideUserName() {
  const apiUrl = `http://localhost:3000/usuarios`;
  const userName = document.querySelector(".user__name");
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const usuarioAtual = data.find(usuario => usuario.id == JSON.parse(localStorage.getItem("id")));
    if (usuarioAtual) {
      userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`; 
    }
  });
}

window.onload = function() {
  asideUserName();
};
