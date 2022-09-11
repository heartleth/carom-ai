function pythagorean(sideA, sideB){
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

// setInterval(() => {
//     ctx.clearRect(0, 0, 9999, 9999);
//     ctx.fillStyle = '#90d64f';
//     ctx.fillRect(center[0] - 150, center[1] - 300, 300, 600);
//     render(ctx, ball);
// });
    
// setInterval(() => {
//     for (let i = 0; i < 3; i++) {
//         ballcoords[i][0] += velocity[i][0] / 16;
//         ballcoords[i][1] += velocity[i][1] / 16;
//         if (Math.abs(ballcoords[i][0]) >= 140) {
//             velocity[i][0] *= -1
//         }
//         if (Math.abs(ballcoords[i][1]) >= 290) {
//             velocity[i][1] *= -1
//         }
//         velocity[i][0] *= 0.990
//         velocity[i][1] *= 0.990
        
//         for (let j = 0; j < 3; j++) {
//             if (i != j) {
//                 if (pythagorean(ballcoords[j][0] - ballcoords[i][0], ballcoords[j][1] - ballcoords[i][1]) <= 20){
//                     let a = [ballcoords[j][0] - ballcoords[i][0], ballcoords[j][1] - ballcoords[i][1]];
//                     let d = pythagorean(...a);
//                     ballcoords[j][0] = ballcoords[i][0] + a[0] * (20 / d);
//                     ballcoords[j][1] = ballcoords[i][1] + a[1] * (20 / d);
//                     let v = pythagorean(...velocity[i]);
//                     let cosav = (a[0]*velocity[i][0]+a[1]*velocity[i][1]) / 400;
                    
//                     velocity[j][0] += a[0] * cosav;
//                     velocity[j][1] += a[1] * cosav;

//                     velocity[i][0] -= a[0] * cosav;
//                     velocity[i][1] -= a[1] * cosav;
//                 }
//             }
//         }
//     }
//     render(ctx);
// }, 0.000000001);