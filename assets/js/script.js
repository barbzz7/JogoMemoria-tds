const card = document.querySelectorAll(".carta");
const scoreEl = document.querySelectorAll("score");
const movesEl = document.querySelectorAll("moves");
const resetbtn = document.querySelectorAll("reset");


let primeiroCard = null;
let segundoCard = null;
let travar = false;
let score = 0;
let moves = 0;


cards.forEach((card, index) => {
    const classes = card.classList;
    const numero = [...classes].find(c => !isNaN(c));
    card.detaset.par =numero;
});

function embaralhar(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() *1000);
        card.style.order = random;
    });
}

cards. forEach(card => {
    card.addEventListener("click", () => {
        if (travar || card === primeiroCard) return;
        card.classList.add("virada");
        if (!primeiroCard){
            primeiroCard = card;
            return;
        }

        segundoCard = card;
        moves++;
        movesEl.textContent = moves;
        checarMatch()

    });
});


function checarMatch() {
    let match = primeiroCard.dataset.par === segundoCard.dataset.par;

    if (match) {
        primeiroCard.classList.add("acertou");
        segundoCard.classList.add("acertou");
        score++;
        scoreEl.textContent = score;
        resetarJogada();
    } else {
        travar = true;
        setTimeout(() => {
            primeiroCard.classList.remove("virada");
            segundoCard.classList.remove("virada");
            resetarJogada();
        }, 1000);
    }
}

function resetarJogada() {
    [primeiroCard, segundoCard] = [null, null];
    travar = false;
}

// reset
resetBtn.addEventListener("click", () => {
    score = 0;
    moves = 0;
    scoreEl.textContent = 0;
    movesEl.textContent = 0;

    cards.forEach(card => {
        card.classList.remove("virada", "acertou");
    });

    embaralhar();
});

// iniciar
embaralhar();