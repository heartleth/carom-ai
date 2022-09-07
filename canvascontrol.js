let canvas = document.querySelectorAll('canvas')[0];
let output = document.querySelectorAll('p')[0];
let ctx = canvas.getContext('2d');
let centers = [0, 0];
let ballcoords = [[0, -100], [20, 10], [-20, 10]];
let velocity = [[0, 0], [0, 0], [0, 0]];

let fp = 1;
let zoom = 1;
let radius = 12;
let drag = 0.9975;
let actdur = 1500;
let mutations = 5;

onload = onresize = e => {
    canvas.height = window.innerHeight - 8;
    let center = [ window.innerWidth / 2 - 4, window.innerHeight / 2 - 4 ];
    
    // centers = [];
    // for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         centers.push([center[0] + (160 * j - 560), center[1] + (320 * i - 160)]);
    //     }
    // }
    centers = [
        [center[0] + 160, center[1]],
        [center[0] + 480, center[1]],
        [center[0] - 160, center[1]],
        [center[0] - 480, center[1]]
    ];
    canvas.width = window.innerWidth - 8;
    ctx = canvas.getContext('2d');

    render(ctx);
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