// Embaralhando os índices das gifs a serem utilizadas:
function compareFunction(){ 
	return Math.random() - 0.5; 
}

const gifIndex = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
gifIndex.sort(compareFunction); 

// ----------------------------------------------------------------------------------------------------

// Distribuindo as cartas:
function addCards(){
    // Determinando o número de cartas:
    let N;
    do {
        N = prompt("Com quantas cartas quer jogar? (4 / 6 / 8 / 10 / 12 / 14)");
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
        <div class="card">
            <div class="front-face face hidden">
                <img alt="Parrot ${cardIndex[i]}" src="./media/gifs/parrot${cardIndex[i]}.gif">
            </div>
            <div class="back-face face">
                <img alt="Parrot" src="./media/parrot.png">
            </div>
        </div>
        `;
        mainTag.innerHTML += cardHTML;
    }
}

addCards();