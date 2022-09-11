let canvas = document.querySelectorAll('canvas')[0];
let output = document.querySelectorAll('p')[0];
let ctx = canvas.getContext('2d');
let centers = [0, 0];
let ballcoords = [[0, -100], [20, 10], [-20, 10]];
let velocity = [[0, 0], [0, 0], [0, 0]];

let fr = 0.011;

let fp = 1;
let zoom = 1;
let radius = 9;
let drag = 0.9975;
let actdur = 1500;
let mutations = 8;
let dorender = true;
let spawnrange = [100, 200];

let center = [];

onload = onresize = e => {
    canvas.height = window.innerHeight - 8;
    center = [ window.innerWidth / 2 - 4, window.innerHeight / 2 - 4 ];
    canvas.width = window.innerWidth - 8;
    ctx = canvas.getContext('2d');

    render(ctx, [[0, 0], [0 ,0], [0, 0]], centers[0]);
}

document.getElementById('dragok').onclick = e =>{
    drag = document.getElementById('drag').value;
};

document.getElementById('rngra').onmouseup = e =>{
    radius = document.getElementById('rngra').value;
};

document.getElementById('rngfp').onmouseup = e =>{
    fp = parseInt(document.getElementById('rngfp').value);
};