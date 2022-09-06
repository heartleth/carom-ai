function drawBall(ctx, color, pos) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(...pos, radius * zoom, 0, 6.28);
    ctx.fill();
}

function render(ctx, balls, center, n, alive) {
    ctx.font = 10 * zoom + 'px serif';
    drawBall(ctx, 'white', [center[0] + balls[0][0] * zoom, center[1] - balls[0][1] * zoom]);
    drawBall(ctx, 'orange', [center[0] + balls[1][0] * zoom, center[1] - balls[1][1] * zoom]);
    drawBall(ctx, 'red', [center[0] + balls[2][0] * zoom, center[1] - balls[2][1] * zoom]);
    
    ctx.strokeText(n, center[0] + (balls[0][0] - 6) * zoom, center[1] - (balls[0][1]) * zoom);
    ctx.strokeText(n + (alive=='3' || alive==true?'*':''), center[0] + (balls[1][0] - 6) * zoom, center[1] - (balls[1][1]) * zoom);
    ctx.strokeText(n + (alive=='6' || alive==true?'*':''), center[0] + (balls[2][0] - 6) * zoom, center[1] - (balls[2][1]) * zoom);
}