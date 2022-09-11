function pythagorean(sideA, sideB){
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

function distance(a, b) {
    return pythagorean(a[0] - b[0], a[1] - b[1]);
}