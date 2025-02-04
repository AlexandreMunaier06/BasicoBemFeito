document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = 'c363366611f6486992a4d8aa706922ff';
    const PAGE_SIZE = 10; 
    const KEYWORDS = 'fitness'; 
    const API_URL = `https://newsapi.org/v2/everything?q=${KEYWORDS}&language=pt&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}`;

    const filterKeywords = ['academia', 'fitness']; 

    async function loadNews() {
        const newsContainer = document.getElementById('news-container');

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                const newsItems = data.articles.filter(news => {
                    const title = news.title.toLowerCase();
                    const description = news.description ? news.description.toLowerCase() : '';
                    return filterKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
                });

                const limitedNewsItems = newsItems.slice(0, 5);

                limitedNewsItems.forEach(news => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const img = document.createElement('img');
                    img.className = 'card-img-top';
                    img.src = news.urlToImage || 'imgs/default-image.jpg'; 
                    img.alt = news.title;

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';

                    const cardText = document.createElement('p');
                    cardText.className = 'card-text';
                    cardText.textContent = news.title;

                    const cardDescription = document.createElement('p');
                    cardDescription.className = 'card-description';
                    cardDescription.textContent = news.description;

                    cardBody.appendChild(cardText);
                    cardBody.appendChild(cardDescription);
                    card.appendChild(img);
                    card.appendChild(cardBody);

                    newsContainer.appendChild(card);
                });
            } else {
                console.error('Nenhuma notícia encontrada.');
            }
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
        }
    }

    loadNews();
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

window.onload = function(){
    asideUserName()
}

const buttonVoltar = document.querySelector(".voltar");
buttonVoltar.addEventListener('click', () => {
  window.location.assign("../Exercicios/ficha/index.html");
});
