let canvas = document.querySelectorAll('canvas')[0];
let output = document.querySelectorAll('p')[0];
let ctx = canvas.getContext('2d');
let centers = [0, 0];
let ballcoords = [[0, -100], [20, 10], [-20, 10]];
let velocity = [[0, 0], [0, 0], [0, 0]];

const zoom = 1;
const radius = 8;
const drag = 0.9975;
const actdur = 1800;

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