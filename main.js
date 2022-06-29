//const { Socket } = require("socket.io");

let result = document.querySelector(".resultado");
let inputs = document.querySelectorAll("section div")
let img = document.querySelector(".imagem");
let final = document.querySelector(".final");
let sim = document.querySelector("#sim");
let nao = document.querySelector("#nao");

    function enviarServer(palpite){
        socket.emit("palpite", palpite);

    }

    socket.on("message", x=> {result.textContent = x})

    for(let i of inputs) {
        i.addEventListener("click",function (){enviarServer(i.textContent)}, false);
    }
    socket.on("error",errorcounter=>{
        console.log(errorcounter);
        switch(errorcounter){
            case 1:
                img.style.backgroundImage = 'url(img/forca2.png)';
            break;
            case 2:
                img.style.backgroundImage = 'url(img/forca3.png)';
            break;
            case 3:
                img.style.backgroundImage = 'url(img/forca4.png)';
            break;
            case 4:
                img.style.backgroundImage = 'url(img/forca5.png)';
            break;
            case 5:
                img.style.backgroundImage = 'url(img/forca6.png)';
            break;
            case 6:
                img.style.backgroundImage = 'url(img/forca7.png)';
            break;
            case 7:
                img.style.backgroundImage = 'url(img/forca8.png)';
            break;
        }
    })
        socket.on('fim', win=>{
            console.log("final");
            if (!win){
                document.querySelector(".final h3").textContent = 'Você perdeu, mas quem sabe na próxima?';
            }

        final.style.display = 'flex';
        })
        
        
   
    sim.addEventListener("click",function (){
        socket.emit('sim');
        document.querySelector(".final h3").textContent = 'Parabéns, você ganhou!!';
        final.style.display = 'none';
        img.style.backgroundImage = 'url(img/forca1.png)';
    }, false);
    nao.addEventListener("click",function (){
        final.style.display = 'none';
    }, false);