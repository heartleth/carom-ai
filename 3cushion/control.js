function randomw(l) {
    return Float32Array.from(Array.from({ length: l }, () => (Math.random() - 0.5) * 40));
}

function rrandomw(figure) {
    return Array.from({ length: figure[0] }, () => randomw(figure[1]));
}