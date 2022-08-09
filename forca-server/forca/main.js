socket.on("wordlen", x=>{
    wordcontent(x);
})
let result;
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
let hide = document.querySelectorAll("#hide");
let statics = document.querySelectorAll("#interface #statics.button");
let staticsValues = document.querySelectorAll("#interface #statics.button p");
var largura = window.screen.width;
var largura = document.body.clientWidth;
let teste;
let tamanho;
let usersstat

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
        if (inputs[i].style.backgroundColor === 'rgb(145, 196, 131)' || inputs[i].style.backgroundColor === 'rgb(255, 100, 100)') return 0
        socket.emit("palpite", palpite, i);

    }

backButton.addEventListener("click", function(){
    main.style.display = "grid";
    section.style.display = "none";
}, false)
for (let i of statics){
    i.addEventListener("click", function(){
        for (let i in hide){
            hide[i].style.display = "flex";
            statics[i].style.display = "none";
        }
    }, false)
}
options[0].addEventListener("click", function(){
    window.open("emDesen.txt", "_blank");
}, false)
options[1].addEventListener("click", function(){
    calculateSettings();
    for (let i in hide){
        hide[i].style.display = "none";
        statics[i].style.display = "flex";
    }
    
}, false)

options[2].addEventListener("click",function (){
    main.style.display = 'none';
    section.style.display = 'block';
}, false)

options[3].addEventListener("click",function (){ socket.emit("dica")}, false);


    socket.on("message", (x,y,index) => {
        if(y && typeof inputs[index] !== "undefined") inputs[index].style.backgroundColor = "#FF6464";
        else if(typeof inputs[index] !== "undefined") inputs[index].style.backgroundColor = "#91C483";
        for (let i = 0; i < x.length; i++) {
            result[i].textContent = x[i];
         }
    })

    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click",function (){enviarServer(inputs[i].textContent, i)}, false);
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
            setLocalStorage(win);
            if (!win){
                document.querySelector("#final h2").textContent = 'Você perdeu, mas continua jogando aí pprt';
            }

        final.style.display = 'flex';
        img.style.display = 'none';
        })
        socket.on('URL', url=>{
            gameUrl.href = url;
        })


        socket.on('statics',x=>usersstat = x)


function wordcontent(squareNumber){
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

function setLocalStorage(win){
    if (localStorage.length === 0){
        localStorage.setItem('games',1);
        localStorage.setItem('wins',win);
    }
    else{
        let x = win + parseInt(localStorage.getItem('wins'));
        let y =1 + parseInt(localStorage.getItem('games'));
        localStorage.setItem('games',y);
        localStorage.setItem('wins',x);
    }
   
}

function calculateSettings(){
    let acertos = parseInt(localStorage.getItem('wins'));
    let jogos = parseInt(localStorage.getItem('games'));
    let user = Math.round((acertos / jogos) * 100);
    let relative = Math.round(((user * 100) / usersstat) - 100);
    staticsValues[0].textContent = acertos;
    staticsValues[1].textContent = user + '%';
    staticsValues[2].textContent = relative + '%';
}