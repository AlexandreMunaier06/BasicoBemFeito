const chartConfigs = {
    type: 'bar',
    data: {
        labels: ['Carga Antiga', 'Carga Atual'],
        datasets: [{
            label: '', // Label será atualizado dinamicamente
            data: [0, 0],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

let charts = []; // Declaração global da variável charts

async function getCharts() {
    const apiUrl = `http://localhost:3000/usuarios`;
    const response = await fetch(apiUrl);
    const usuarios = await response.json();
    
    const usuarioAtual = usuarios.find(usuario => usuario.id == getId());
    if (usuarioAtual) {
        const chartGroup = document.querySelector(".charts__group");
        let globalExercicioIndex = 0;

        Object.values(usuarioAtual.fichas).forEach(ficha => {
            ficha.exercicios.forEach((exercicio) => {
                const div = document.createElement("div");
                div.classList.add("chart-container");
                
                const canvas = document.createElement("canvas");
                const canvasId = `chart${globalExercicioIndex}`;
                canvas.id = canvasId;
                
                div.appendChild(canvas);
                chartGroup.appendChild(div);
                
                const ctx = document.getElementById(canvasId).getContext('2d');
                const config = JSON.parse(JSON.stringify(chartConfigs)); // Clonar o objeto de configuração
                config.data.datasets[0].label = exercicio.nome; // Atualizar o label com o nome do exercício
                config.data.datasets[0].data = [exercicio.carga, 0]; // Define a carga antiga no gráfico
                charts.push(new Chart(ctx, config));

                globalExercicioIndex++;
            });
        });
    }
}

function getId() {
    return JSON.parse(localStorage.getItem("id"));
}

async function asideUserName() {
    const apiUrl = `http://localhost:3000/usuarios`;
    const userName = document.querySelector(".user__name");
    const response = await fetch(apiUrl);
    const usuarios = await response.json();
    const usuarioAtual = usuarios.find(usuario => usuario.id == getId());
    if (usuarioAtual) {
        userName.innerHTML = `${usuarioAtual.firstName} ${usuarioAtual.lastName}`;

    }
}

window.onload = function() {
    asideUserName();
    getCharts();
    select();
};

async function select(){
    const response = await fetch('http://localhost:3000/usuarios');
    const data = await response.json();
    const select = document.getElementById('weight');
    const select1 = document.getElementById('Exercicios');
    const usuarioAtual = data.find(usuario => usuario.id == getId());
    if (usuarioAtual) {
        const fichas = usuarioAtual.fichas;
        for (const key in fichas) {
            const ficha = fichas[key];

            // Cria e adiciona uma opção no select para fichas
            const option = document.createElement('option');
            option.value = ficha.id;
            option.textContent = ficha.nome;
            select.appendChild(option);

            // Cria um optgroup para agrupar exercícios por ficha
            const optgroup = document.createElement('optgroup');
            optgroup.label = ficha.nome;

            // Itera através dos exercícios da ficha e adiciona opções no optgroup
            ficha.exercicios.forEach(exercicio => {
                const option1 = document.createElement('option');
                option1.value = exercicio.nome;
                option1.textContent = exercicio.nome;
                optgroup.appendChild(option1);
            });

            // Adiciona o optgroup ao select de exercícios
            select1.appendChild(optgroup);
        }
    }
}

async function updateWeight() {
    const selectedExercicio = document.getElementById('Exercicios').value;
    const newWeight = parseInt(document.getElementById('newWeight').value);
    
    if (!selectedExercicio || isNaN(newWeight)) {
        alert("Selecione um exercício e insira um novo valor de carga.");
        return;
    }

    const apiUrl = `http://localhost:3000/usuarios`;
    const response = await fetch(apiUrl);
    const usuarios = await response.json();
    
    const usuarioAtual = usuarios.find(usuario => usuario.id == getId());
    if (usuarioAtual) {
        let exercicioAtualizado = false;
        Object.values(usuarioAtual.fichas).forEach(ficha => {
            ficha.exercicios.forEach(exercicio => {
                if (exercicio.nome === selectedExercicio) {
                    const oldWeight = exercicio.carga; // Pega a carga antiga
                    exercicio.carga = newWeight; // Atualiza a carga do exercício
                    exercicioAtualizado = true;

                    // Atualiza o gráfico correspondente
                    const chartIndex = charts.findIndex(chart => chart.data.datasets[0].label === selectedExercicio);
                    if (chartIndex !== -1) {
                        charts[chartIndex].data.datasets[0].data = [oldWeight, newWeight];
                        charts[chartIndex].update();
                    }
                }
            });
        });

        if (exercicioAtualizado) {
            // Salva a nova carga no JSON Server
            await fetch(`${apiUrl}/${getId()}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fichas: usuarioAtual.fichas }),
            });
        }
    }
}

document.getElementById('updateWeightButton').addEventListener('click', updateWeight);