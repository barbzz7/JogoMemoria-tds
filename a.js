
// pega TODAS as cartas 
const cards = document.querySelectorAll(".card");
// usamos querySelectorAll porque queremos várias cartas, não só uma

// pega o lugar onde mostra a pontuação
const scoreEl = document.querySelector("#score");
// usamos # porque é um id (só existe um score)

// pega o lugar onde mostra as jogadas
const movesEl = document.querySelector("#moves");

// pega o botão de reiniciar
const resetBtn = document.querySelector("#reset");



// guarda a primeira carta clicada
let primeira = null;
// guarda a segunda carta clicada
let segunda = null;
// trava o jogo (pra não clicar em várias cartas ao mesmo tempo)
let travar = false;
// pontuação (quantos pares acertou)
let score = 0;
// número de jogadas
let moves = 0;

function embaralhar() {
    // percorre todas as cartas
    cards.forEach(card => {
        // gera número aleatório entre 0 e 1000
        let random = Math.floor(Math.random() * 1000);
        // usamos isso porque o CSS flex organiza por "order"
        // então cada carta recebe um número diferente
        // isso bagunça a posição delas na tela
        card.style.order = random;
    });
}

cards.forEach(card => {
    // quando clicar em uma carta
    card.addEventListener("click", function () {
        // se o jogo estiver travado OU clicou na mesma carta
        // não faz nada
        if (travar || card === primeira) return;
        
        // adiciona a classe "virada"
        // isso faz a imagem aparecer 
        card.classList.add("virada");

        // se ainda não tem primeira carta
        if (primeira === null) {

            // guarda essa carta como primeira
            primeira = card;

            // para aqui e espera a próxima
            return;
        }

        // se já tem primeira, essa é a segunda
        segunda = card;

        // soma 1 jogada
        moves++;

        // atualiza na tela
        movesEl.textContent = moves;

        // agora vamos verificar se são iguais
        verificar();
    });
});

function verificar() {

    // pega a imagem da primeira carta
    let img1 = primeira.querySelector("img").src;

    // pega a imagem da segunda carta
    let img2 = segunda.querySelector("img").src;

    // usamos src porque é o jeito mais simples
    // se as imagens forem iguais → é par

    if (img1 === img2) {

        // se forem iguais:

        // soma ponto
        score++;

        // atualiza na tela
        scoreEl.textContent = score;

        // limpa as cartas pra próxima jogada
        primeira = null;
        segunda = null;

    } else {

        // se forem diferentes:

        // trava o jogo (não deixa clicar enquanto espera)
        travar = true;

        // espera 1 segundo
        setTimeout(function () {

            // remove a classe "virada"
            // isso esconde as imagens novamente
            primeira.classList.remove("virada");
            segunda.classList.remove("virada");

            // limpa as cartas
            primeira = null;
            segunda = null;

            // destrava o jogo
            travar = false;

        }, 1000); // 1000ms = 1 segundo
    }
}

resetBtn.addEventListener("click", function () {

    // zera pontuação e jogadas
    score = 0;
    moves = 0;

    // atualiza na tela
    scoreEl.textContent = 0;
    movesEl.textContent = 0;

    // fecha todas as cartas
    cards.forEach(card => {
        card.classList.remove("virada");
    });

    // embaralha novamente
    embaralhar();
});


// já começa com cartas embaralhadas
embaralhar();