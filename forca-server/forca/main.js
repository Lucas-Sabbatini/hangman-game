socket.on("wordlen", x=>{
    console.log("wordlenFoiChamado")
    wordcontent(x);
})
let result;
let changeColor;
document.querySelector("#search img").addEventListener("click",function (){gameSearchBar();}, false);
let inputs = document.querySelectorAll("#letters .button");
let options = document.querySelectorAll("#interface .button");
let img = document.querySelector("#game-img");
let final = document.querySelector("#final");
let main = document.querySelector("#main");
let phrase = document.querySelector("#phrase p");
let section = document.querySelector("section");
let backButton = document.querySelector("section img");
let params = window.location.href.split('$')[1];
let gameUrl = document.querySelector("#final a");
var largura = window.screen.width;
var largura = document.body.clientWidth;
let teste;
let tamanho;

setTimeout(() => {
    checkcontent();
  }, "10000");


if(largura < 740) {
    tamanho = (largura - 40) /1.4;
    teste = `${Math.round((largura - 40) /1.4)}px`;
    if (largura < 420) main.style.height = `${tamanho * 4}px`;
    else main.style.height = teste;
}
phrase.append(decodeURI(params));
    function enviarServer(palpite, i){
        if (i.style.backgroundColor === 'rgb(145, 196, 131)' || i.style.backgroundColor === 'rgb(255, 100, 100)') return 0
        socket.emit("palpite", palpite);
        changeColor = i;

    }
backButton.addEventListener("click", function(){
    main.style.display = "grid";
    section.style.display = "none";
}, false)
options[2].addEventListener("click",function (){
    main.style.display = 'none';
    section.style.display = 'block';
}, false)
options[3].addEventListener("click",function (){ socket.emit("dica")}, false);
    socket.on("message", (x,y) => {
        console.log("chamou o message event");
        if(y && typeof changeColor !== "undefined") changeColor.style.backgroundColor = "#FF6464";
        else if(typeof changeColor !== "undefined") changeColor.style.backgroundColor = "#91C483";
        for (let i = 0; i < x.length; i++) {
            result[i].textContent = x[i];
         }
    })

    for(let i of inputs) {
        i.addEventListener("click",function (){enviarServer(i.textContent, i)}, false);
    }
    socket.on("error",errorcounter=>{
        switch(errorcounter){
            case 1:
                img.src = "img/forca2.png";
            break;
            case 2:
                img.src = "img/forca3.png";
            break;
            case 3:
                img.src = "img/forca4.png";
            break;
            case 4:
                img.src = "img/forca5.png";
            break;
            case 5:
                img.src = "img/forca6.png";
            break;
            case 6:
                img.src = "img/forca7.png";
            break;
            case 7:
                img.src = "img/forca8.png";
            break;
        }
    })
        socket.on('fim', win=>{
            if (!win){
                document.querySelector("#final h2").textContent = 'Você perdeu, mas continua jogando aí pprt';
            }

        final.style.display = 'flex';
        img.style.display = 'none';
        })
        socket.on('URL', url=>{
            gameUrl.href = url;
        })

        
        socket.on('teste', x=>{
            console.log(x);
        })
function wordcontent(squareNumber){
    console.log("chamou a função");
    const wordLetter = document.querySelector("#word-c");
    const word = document.querySelector("#word");
    const width = document.querySelector("#word").getBoundingClientRect().width;
    let squareWidth = (18.53 * width) / 100;
    const suposeWidth = (squareWidth * squareNumber) + ((1+squareNumber) *5);
    if (suposeWidth > width) {
        squareWidth = (width - ((squareNumber + 1)*5))/squareNumber;
    }
    
    wordLetter.style.height = `${squareWidth}px`;
    wordLetter.style.width = `${squareWidth}px`;
    for (let i = 0; i < (squareNumber-1); i++) {
        const divNova = document.createElement("div");
        divNova.id = 'word-c';
        divNova.style.height = `${squareWidth}px`;
        divNova.style.width = `${squareWidth}px`;
        word.appendChild(divNova);
    } 
    result  = document.querySelectorAll("#word-c");
}

function gameSearchBar() {
    let gameInput = document.querySelector("#search input").value;
    if (!gameInput) alert("Por favor preencha o campo de pesquisa");
    else window.location.replace(`index.html$${gameInput}`);


}
function checkcontent(){
    if (result === undefined){
        document.querySelector("#final h2").textContent = 'Não encontramos nada, tente algo novo!';
        final.style.display = 'flex';
        img.style.display = 'none';
        gameUrl.style.display = 'none';
    }
}