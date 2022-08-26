var requestURL = 'http://forcagame.com/trends.json'; //http://localhost/trends.json
var request = new XMLHttpRequest();
const content = document.querySelectorAll('h1');
const button = document.querySelectorAll('.words');


request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const trends = request.response;
    for (let i in trends) {
        content[i].textContent = trends[i];
    }

    for (let i in button) {
        button[i].addEventListener("click", function() {
            window.open(`index.html$${content[i].textContent.replace("#", "")}`);
    
        }, false);
    }
}

