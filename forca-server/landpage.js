document.querySelector("#search img").addEventListener("click",function (){
    let gameInput = document.querySelector("#search input").value;
    if (!gameInput) alert("Por favor preencha o campo de pesquisa");
    else window.location.replace(`index.html$${gameInput}`);

}, false);