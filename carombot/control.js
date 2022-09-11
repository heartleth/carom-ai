let ismousedown = false;
let dx, dy;

// onmousedown = e => {
//     ismousedown = true;
// }

// onmousemove = e => {
//     if (ismousedown) {
//         render(ctx);
//         ctx.beginPath();
//         ctx.moveTo(center[0] + ballcoords[0][0], center[1] - ballcoords[0][1]);
//         dx = e.clientX - (center[0] + ballcoords[0][0])
//         dy = e.clientY - (center[1] - ballcoords[0][1])
//         ctx.lineTo(center[0] + ballcoords[0][0] + dx, center[1] - ballcoords[0][1] + dy);
//         ctx.stroke();
//     }
// }

// onmouseleave = onmouseup = e => {
//     ismousedown = false;
//     velocity[0][0] -= 0.5 * dx;
//     velocity[0][1] += 0.5 * dy;
// }

function randomw(l) {
    return Float32Array.from(Array.from({ length: l }, () => (Math.random() - 0.5) * 40));
}

function rrandomw(figure) {
    return Array.from({ length: figure[0] }, () => randomw(figure[1]));
}

// // sample = Array.from({ length: 30 }, () => new Life(rrandomw([20, 6]), rrandomw([20, 20]), rrandomw([36, 20])));
// let l = new Life(rrandomw([20, 6]), rrandomw([20, 20]), rrandomw([36, 20]));

// setInterval(() => {
//     l.input_values(ballcoords[0].concat(ballcoords[1]).concat(ballcoords[2]));
//     l.evaluate();
//     let out = l.most_output();
//     output.innerText = [...l.output].map((e, i)=>e.toFixed(3) + (i==out?' !':'')).join('\n');
//     let theta = out * 10 / Math.PI;
//     velocity[0][0] -= 60 * Math.sin(theta);
//     velocity[0][1] += 60 * Math.cos(theta);
// }, 2000);