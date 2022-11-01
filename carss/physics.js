function pythagorean(sideA, sideB){
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

let rolls = [[0, 0], [0, 0], [0, 0], [0, 0]];
let accrolls = [[0, 0], [0, 0], [0, 0], [0, 0]];
let trail = [];

setInterval(() => {
    ctx.clearRect(0, 0, 9999, 9999);
    ctx.fillStyle = '#12a4ff';
    ctx.fillRect(center[0] - 150, center[1] - 300, 300, 600);
    
    // for (let i = 0; i < trail.length - 1; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         ctx.strokeStyle = ['white', 'red', 'red', 'orange'][j];
            
    //         ctx.beginPath();
    //         ctx.moveTo(center[0] + trail[i][j][0], center[1] - trail[i][j][1]);
    //         ctx.lineTo(center[0] + trail[i + 1][j][0], center[1] - trail[i + 1][j][1]);
    //         ctx.stroke();
    //     }
    // }
    render(ctx, ballcoords, center, 0, true, velocity, rolls, accrolls);
});

setInterval(() => {
    for (let i = 0; i < 3; i++) {
        ballcoords[i][0] += velocity[i][0];
        ballcoords[i][1] += velocity[i][1];
        accrolls[i][0] += rolls[i][0];
        accrolls[i][1] += rolls[i][1];

        if (Math.abs(ballcoords[i][0]) >= 140) {
            ballcoords[i][0] = Math.sign(ballcoords[i][0]) * 140;
            velocity[i][0] *= -1;
            rolls[i][0] *= 0.5;
            rolls[i][1] *= 0.5;
        }
        if (Math.abs(ballcoords[i][1]) >= 290) {
            ballcoords[i][1] = Math.sign(ballcoords[i][1]) * 290;
            velocity[i][1] *= -1;
            rolls[i][0] *= 0.5;
            rolls[i][1] *= 0.5;
        }
        velocity[i][0] *= 0.9975;
        velocity[i][1] *= 0.9975;
        
        let spv = [velocity[i][0] - rolls[i][0], velocity[i][1] - rolls[i][1]];

        rolls[i][0] += spv[0] * fr;
        rolls[i][1] += spv[1] * fr;

        velocity[i][0] -= spv[0] * fr;
        velocity[i][1] -= spv[1] * fr;
     
        for (let j = 0; j < 3; j++) {
            if (i != j) {
                if (pythagorean(ballcoords[j][0] - ballcoords[i][0], ballcoords[j][1] - ballcoords[i][1]) <= 20){
                    let a = [ballcoords[j][0] - ballcoords[i][0], ballcoords[j][1] - ballcoords[i][1]];
                    let d = pythagorean(...a);
                    ballcoords[j][0] = ballcoords[i][0] + a[0] * (20 / d);
                    ballcoords[j][1] = ballcoords[i][1] + a[1] * (20 / d);
                    let v = pythagorean(...velocity[i]);
                    let cosav = (a[0]*velocity[i][0]+a[1]*velocity[i][1]) / 400;
                    
                    // velocity[i][0] -= a[0] * cosav;
                    // velocity[i][1] -= a[1] * cosav;
                    velocity[i][0] -= a[0] * cosav;
                    velocity[i][1] -= a[1] * cosav;
                    rolls[i][0] /= 2;
                    rolls[i][1] /= 2;

                    // velocity[j][0] += a[0] * cosav;
                    // velocity[j][1] += a[1] * cosav;
                    velocity[j][0] = a[0] * cosav;
                    velocity[j][1] = a[1] * cosav;
                }
            }
        }
    }
    trail.push([...ballcoords.map(e=>[...e])]);
    if (trail.length > 300) {
        trail = trail.slice(1);
    }
});
