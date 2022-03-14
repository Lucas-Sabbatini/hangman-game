let result = document.querySelector(".resultado");
let inputs = document.querySelectorAll("section div")
let img = document.querySelector(".imagem");
let final = document.querySelector(".final");
let sim = document.querySelector("#sim");
let nao = document.querySelector("#nao");
const p = 'VITORIA'; //TEM Q LIGAR O CAPS LOCK
    let word=[];
    for(let i in p){
        word[i] = '*';
    }
    result.textContent= word.join(' ')
    for(let i of inputs) {
        i.addEventListener("click",function (){forca(i.textContent,p)}, false);
    }
    let pontuador=0;
    let errorcounter=0;
    function forca(a,p){
    if (errorcounter>6) return 0;
    let errou = true; 
        for(let i=0; i<p.length; i++) {
            if (a==p[i]&&a!==word[i]) {
                pontuador++; 
                errou = false;
                word[i]=p[i];
                
            }
            
        }
        if (errou) error();
        result.textContent= word.join('  ');
        if(pontuador==p.length){
            reset(1);
        }
        
    }

    function error(){
        errorcounter++;
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
                reset(0);
            break;
        }

    }
    function reset(win) {
        if (!win){
            document.querySelector(".final h3").textContent = 'Você perdeu, mas quem sabe na próxima?';
        }
        final.style.display = 'flex';
        
    }
    sim.addEventListener("click",function (){
        final.style.display = 'none';
        word=[];
        for(let i in p){
            word[i] = '*';
        }
        result.textContent= word.join(' ');
        pontuador=0;
        errorcounter=0;
        img.style.backgroundImage = 'url(img/forca1.png)';
    }, false);
    nao.addEventListener("click",function (){
        final.style.display = 'none';
        img.style.backgroundImage = 'url(img/forca1.png)';
    }, false);