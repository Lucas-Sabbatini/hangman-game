const { fork } = require('child_process');
const child = fork('teste2.js');
child.on('message', (msg) => {
    console.log(`mesage from child: ${msg}`);
});