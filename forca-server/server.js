const http = require('http');
const url = require('url');
const port = 80;
const fs = require('fs');
const mimeTypes = require('mime-types').lookup;
const { fork } = require('child_process');
const { spawn } = require('child_process');
let searchedWord;
let secretWord;
let gameUrl;
process.on('warning', e => console.warn(e.stack));


const server = http.createServer((req, res) => {
   let parsedUrl = url.parse(req.url, true);
   let pathword = parsedUrl.path.replace(/\/$/, '');
   pathword = pathword.split('$');
   let path = pathword[0];
   if (pathword[1]){
    searchedWord = pathword[1];
    searchWord(searchedWord);
} 
   if (path =='') path = 'landpage.html';


   let file = __dirname + '/forca/' +path;
   fs.readFile(file, (err, data) => {
       if (err) {
         res.writeHead(404, err.statusCode);
         res.end();
        }else {
        let type = mimeTypes(path);
        res.writeHead(200,{"Content-type" : type});
        res.end(data);
       }
       
   })


})

server.listen(port,(err) => {
    if(err) console.log(err);
    else console.log('listening on port ' + port);
})
const io =require('socket.io')(server);

    io.on('connection', socket => {
        let chamou = 0;
        const myInterval = setInterval(myTimer, 1700);
        socket.on('disconnect', () => {
            console.log('disconnect');
            clearInterval(myInterval);
            socket.removeAllListeners();
          });

        function myTimer() {
            chamou +=1;
            console.log("chamou:" + chamou);
            if (chamou > 4) clearInterval(myInterval);
            if (secretWord && gameUrl){
                clearInterval(myInterval);
                myStopFunction(secretWord, gameUrl);
            } 
        }

        function myStopFunction(p, url) {
            secretWord = '';
            gameUrl = '';
        console.log('new connection');
        function win(win) {
            socket.emit('fim', win);
            socket.disconnect();
            pontuador=0;
            errorcounter=0;
        }
        function mandarWord(word, errou){
            socket.emit("message",word,errou);
        }
        function forca(a,p){
            if (errorcounter>6) return 0;
            let errou = true; 
                for(let i=0; i<p.length; i++) {
                    if (a==p[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "")&&a!==word[i]) {
                        pontuador++; 
                        errou = false;
                        word[i]=p[i];
                        
                    }
                    
                }
                if (errou) {
                    ++errorcounter;
                    socket.emit("error",errorcounter);
                    if (errorcounter===7) win(0);
                }
                mandarWord(word, errou);
                if(pontuador==p.length){
                    win(1);

                }
                
        }
        let pontuador=0;
        let errorcounter=0;
        console.log("a palavra é: " + p + ";");
        socket.emit("wordlen", p.length);
        socket.emit('URL', url);
        socket.emit('teste', 'test');
        let word=[];
        for(let i in p){
            word[i] = '_';
        }
        mandarWord(word, false);

        socket.on("palpite", palpite=> {
            forca(palpite,p);
        })
        socket.on("dica",()=> {
            let possibleHints = [];
            for (let i in word){
                if(word[i] === "_") possibleHints.push(i);
            }
            forca(p[possibleHints[getRandomIntInclusive(0, possibleHints.length)]],p);
        })
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
})


function searchWord(a){
    if (a.length > 20) return 0;
    const twitterChild = fork('../twitter-bot/index.js');
    twitterChild.send(a);
    twitterChild.on('message', (x) => {
     classify(x, a);
    })
}

function classify(x, a) {
   const pythonchild = spawn('/usr/bin/python3.6', ['../twitter-bot/convert.py']); //py
   pythonchild.stdin.setEncoding('utf8');
   pythonchild.stdout.setEncoding('utf8');
   x.tweets.push(a);
   pythonchild.stdin.write(JSON.stringify(x.tweets));
   pythonchild.stdin.end();

   pythonchild.stdout.on('data', (y)=>{
    let divided = y.split('|');
    secretWord = divided[0].toUpperCase().replace(/(\r\n|\n|\r)/gm, "");
    gameUrl = `https://twitter.com/${x.users[parseInt(divided[1])]}/status/${x.ids[parseInt(divided[1])]}`;
});
   pythonchild.stderr.on('data', (x)=>console.log("temos um erro: " + x));
}