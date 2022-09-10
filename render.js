function drawBall(ctx, color, pos) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(...pos, radius * zoom, 0, 6.28);
    ctx.fill();
}

function render(ctx, balls, center, n, alive) {
    if (dorender) {
        ctx.font = 10 * zoom + 'px serif';
        drawBall(ctx, 'white', [center[0] + balls[0][0] * zoom, center[1] - balls[0][1] * zoom]);
        drawBall(ctx, 'red', [center[0] + balls[1][0] * zoom, center[1] - balls[1][1] * zoom]);
        drawBall(ctx, 'red', [center[0] + balls[2][0] * zoom, center[1] - balls[2][1] * zoom]);

        ctx.strokeStyle = 'black';    
        ctx.strokeText(n, center[0] + (balls[0][0] - 6) * zoom, center[1] - (balls[0][1]) * zoom);
        ctx.strokeStyle = 'white';    
        ctx.strokeText(n + (alive=='3' || alive==true?'*':''), center[0] + (balls[1][0] - 6) * zoom, center[1] - (balls[1][1]) * zoom);
        ctx.strokeStyle = 'white';    
        ctx.strokeText(n + (alive=='6' || alive==true?'*':''), center[0] + (balls[2][0] - 6) * zoom, center[1] - (balls[2][1]) * zoom);
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