let j = require('./cp.json');
let fs = require('fs');
let s = '';

s += j.weights[0].map(e=>Array.from({length: 6}, (_, i)=>(e[i])).join(',')).join('\n')
s += '\n';
s += j.weights[1].map(e=>Array.from({length: 20}, (_, i)=>(e[i])).join(',')).join('\n')
s += '\n';
s += j.weights[2].map(e=>Array.from({length: 20}, (_, i)=>(e[i])).join(',')).join('\n')
fs.writeFileSync('weights1.csv', s);