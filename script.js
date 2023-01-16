// Codando o timer: ----------------------------------------------------------------------------------------------------
let time = 0, second, fraction, idInterval;

function startClock(){
    idInterval = setInterval(refreshTime, 10);
}
function refreshTime(){
    second = Math.floor(time/100).toString();
    fraction = (time - 100*second).toString();
    if (['0','1','2','3','4','5','6','7','8','9'].includes(fraction)){
        fraction = '0' + fraction;
    }
    document.querySelector("p").innerHTML = `<span data-test="timer">${second}</span>` + ":" + fraction ;
    time++;
}

// Embaralhando os índices das gifs: ----------------------------------------------------------------------------------------------------
function compareFunction(){ 
	return Math.random() - 0.5; 
}

const gifIndex = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
gifIndex.sort(compareFunction); 

// Distribuindo as cartas: ----------------------------------------------------------------------------------------------------
let N;
function addCards(){
    // Determinando o número de cartas:
    do {
        N = prompt("Com quantas cartas quer jogar? (4 | 6 | 8 | 10 | 12 | 14)");
        if (N === null){
            return;
        }
    } while ( N === '' || !([4,6,8,10,12,14].includes(Number(N))) );

    // Criando a array das cartas e embaralhando-a para misturar as iguais:
    const cardIndex = [];
    for ( let i = 0; i < N/2; i++){
        cardIndex.push(gifIndex[i]);
        cardIndex.push(gifIndex[i]);
    }
    cardIndex.sort(compareFunction); 

    // Colocando o HTML das cartas no DOM:
    const mainTag = document.querySelector("main");
    for (let i = 0; i < N; i++){
        let cardHTML = 
        `
        <div class="card" data-test="card">
            <div class="front-face face">
                <img alt="Parrot ${cardIndex[i]}" src="./media/gifs/parrot${cardIndex[i]}.gif" data-test="face-up-image">
            </div>
            <div class="back-face face" onclick="cardFlip(this);verifyEndGame()">
                <img alt="Parrot" src="./media/parrot.png" data-test="face-down-image">
            </div>
        </div>
        `;
        mainTag.innerHTML += cardHTML;
    }

    // Iniciando o cronômetro:
    startClock();
}
addCards();

// Lógica das Viradas de Cartas: ----------------------------------------------------------------------------------------------------
let countFlip = 0;
function cardFlip(backCard){
    let card = backCard.parentNode;
    card.lastElementChild.classList.add("rotate-back-face");
    card.firstElementChild.classList.add("rotate-front-face");

    let cardFiducial = document.querySelector(".fiducial");
    if (cardFiducial === null){
        card.classList.add("fiducial");
    } else if (card.innerHTML === cardFiducial.innerHTML){
        cardFiducial.classList.remove("fiducial");
    } else {
        setTimeout(cardsUnflip,1000,card,cardFiducial);
    }
    countFlip++;
}

function cardsUnflip(card,cardFiducial){
    card.firstElementChild.classList.remove("rotate-front-face");
    card.lastElementChild.classList.remove("rotate-back-face");
    cardFiducial.classList.remove("fiducial");
    cardFiducial.firstElementChild.classList.remove("rotate-front-face");
    cardFiducial.lastElementChild.classList.remove("rotate-back-face");
}

// Finalização do jogo: ----------------------------------------------------------------------------------------------------
function verifyEndGame(){
    if (document.querySelectorAll(".rotate-front-face").length === Number(N)){
        clearTimeout(idInterval);
        function endGame(){
            alert(`Você ganhou em ${countFlip} jogadas! A duração do jogo foi de ${second} segundos!`);

            let answer;
            do {
                answer = prompt("Gostaria de reiniciar a partida? (sim | não)");
            } while ( answer !== "sim" && answer !== "não" );

            if (answer === "sim"){
                document.querySelector("main").innerHTML = "";
                document.querySelector("p").innerHTML = `<span data-test="timer">0</span>:00`
                time = 0;
                countFlip = 0;

                setTimeout(addCards,300);
            }
        }
        setTimeout(endGame,300);
    }
}