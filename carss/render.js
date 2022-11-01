let dpos = [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
    [-1, 0, 0],
    [0, 0, -1],
];

function drawBall(ctx, color, pos, v, s, ar) {
    if (v) {
        let pv = pythagorean(v[0], v[1]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(...pos);
        let adf = (pv * 10 + 9 * zoom) / (pv * 10);
        ctx.lineTo(pos[0] + adf * v[0] * 10, pos[1] - adf * v[1] * 10);
        ctx.stroke();

        let ps = pythagorean(s[0], s[1]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(...pos);
        let asf = (ps * 10 + 9 * zoom) / (ps * 10);
        ctx.lineTo(pos[0] + asf * s[0] * 10, pos[1] - asf * s[1] * 10);
        ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(...pos, radius * zoom, 0, 6.28);
    ctx.fill();
    ctx.lineWidth=1;
    
    if (ar) {
        let dcm = { white: 'red', orange: 'red', red: 'white' };
        ctx.fillStyle = dcm[color];
        ctx.beginPath();
        for (let d of dpos) {
            let ad = 0.08;
            let cos = e=>Math.cos(ad*e);
            let sin = e=>Math.sin(ad*e);
            let a = [
                d[0]*cos(ar[1]) + d[2]*sin(ar[1]),
                d[0]*sin(ar[0])*sin(ar[1]) + d[1]*cos(ar[0]) - d[2]*sin(ar[0])*cos(ar[1]),
                -d[0]*cos(ar[0])*sin(ar[1]) + d[1]*sin(ar[0]) + d[2]*cos(ar[0])*cos(ar[1])
            ];
            if (a[2] > 0) {
                ctx.moveTo(...pos);
                ctx.arc(
                    pos[0] - a[1] * radius * zoom,
                    pos[1] - a[0] * radius * zoom,
                    Math.sqrt(a[2]) * radius * zoom * 0.15, 0, 6.28);
            }
        }
        ctx.fill();
    }
}
function render(ctx, balls, center, n, alive, v, s, ar) {
    if (dorender) {
        ctx.font = 10 * zoom + 'px serif';
        drawBall(ctx, 'white', [center[0] + balls[0][0] * zoom, center[1] - balls[0][1] * zoom], v[0], s[0], ar[0]);
        drawBall(ctx, 'red', [center[0] + balls[1][0] * zoom, center[1] - balls[1][1] * zoom], v[1], s[1], ar[1]);
        drawBall(ctx, 'orange', [center[0] + balls[2][0] * zoom, center[1] - balls[2][1] * zoom], v[2], s[2], ar[2]);
        // drawBall(ctx, 'orange', [center[0] + balls[3][0] * zoom, center[1] - balls[3][1] * zoom], v[3], s[3], ar[3]);

        // ctx.strokeStyle = 'black';    
        // ctx.strokeText(n, center[0] + (balls[0][0] - 6) * zoom, center[1] - (balls[0][1]) * zoom);
        // ctx.strokeStyle = 'white';    
        // ctx.strokeText(n + (alive=='3' || alive==true?'*':''), center[0] + (balls[1][0] - 6) * zoom, center[1] - (balls[1][1]) * zoom);
        // ctx.strokeStyle = 'white';    
        // ctx.strokeText(n + (alive=='6' || alive==true?'*':''), center[0] + (balls[2][0] - 6) * zoom, center[1] - (balls[2][1]) * zoom);
    }
}

function drawGraph(tt, gen) {
    ctx.clearRect(0, 2 * center[1] - 500, 2 * center[0], 500);
    ctx.beginPath();
    ctx.moveTo(0, center[1] * 2);
    for (let i = 0; i < 60; i++) {
        ctx.lineTo(center[0] * 2 * (i / 59), center[1] * 2 - tt[i] * 20);
    }
    ctx.lineTo(center[0] * 2, center[1] * 2);
    ctx.fillStyle = '#0091ff';
    ctx.fill();
    
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.moveTo(center[0] * 2 * (i / 59), center[1] * 2);
        ctx.lineTo(center[0] * 2 * (i / 59), center[1] * 2 - tt[i] * 20);
        ctx.stroke();
        ctx.strokeStyle = 'grey';
        ctx.strokeText(gen - 59 + i + ', ' + tt[i], center[0] * 2 * (i / 59) - 8, center[1] * 2 - tt[i] * 20 - 10);
    }
}
