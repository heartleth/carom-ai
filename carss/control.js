let ismousedown = false;
let dx, dy;

onmousedown = e => {
    ismousedown = true;
}

onmousemove = e => {
    if (ismousedown) {
        render(ctx, ballcoords, center, 0, true, velocity, rolls, accrolls);
        ctx.beginPath();
        ctx.moveTo(center[0] + ballcoords[0][0], center[1] - ballcoords[0][1]);
        dx = e.clientX - (center[0] + ballcoords[0][0])
        dy = e.clientY - (center[1] - ballcoords[0][1])
        ctx.lineTo(center[0] + ballcoords[0][0] + dx, center[1] - ballcoords[0][1] + dy);
        ctx.stroke();
    }
}

onmouseleave = onmouseup = e => {
    ismousedown = false;
    velocity[0][0] += 0.5 * dx / 16;
    velocity[0][1] -= 0.5 * dy / 16;
    rolls[0][0] += rf * 0.5 * dx / 16;
    rolls[0][1] -= rf * 0.5 * dy / 16;
}

function randomw(l) {
    return Float32Array.from(Array.from({ length: l }, () => (Math.random() - 0.5) * 40));
}

function rrandomw(figure) {
    return Array.from({ length: figure[0] }, () => randomw(figure[1]));
}