function getRandomInt(min, max, p=2) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function emitsound(n) {
    let a = document.getElementById(n);
    a.play();
}

class Entity {
    constructor(balls, a) {
        this.nth = 0;
        this.ballcoords = balls;
        this.velocity = [[0, 0], [0, 0], [0, 0]];
        this.rolls = [[0, 0], [0, 0], [0, 0]];
        this.accrolls = [[0, 0], [0, 0], [0, 0]];
        this.angle = a;
        this.alive = true;
        this.cushion = 0;
    }
    
    tick() {
        for (let l = 0; l < fp; l++) {
            for (let i = 0; i < 3; i++) {
                this.ballcoords[i][0] += this.velocity[i][0];
                this.ballcoords[i][1] += this.velocity[i][1];
                this.accrolls[i][0] += this.rolls[i][0];
                this.accrolls[i][1] += this.rolls[i][1];
                if (Math.abs(this.ballcoords[i][0]) >= 150 - radius) {
                    this.ballcoords[i][0] = Math.sign(this.ballcoords[i][0]) * (150 - radius);
                    this.velocity[i][0] *= -1;
                    this.rolls[i][0] *= 0.5;
                    this.rolls[i][1] *= 0.5;
                    if (i == 0) {
                        this.cushion += 1;
                    }
                }
                if (Math.abs(this.ballcoords[i][1]) >= 300 - radius) {
                    this.ballcoords[i][1] = Math.sign(this.ballcoords[i][1]) * (300 - radius);
                    this.velocity[i][1] *= -1
                    this.rolls[i][0] *= 0.5;
                    this.rolls[i][1] *= 0.5;
                    if (i == 0) {
                        this.cushion += 1;
                    }
                }
                
                this.velocity[i][0] *= drag;
                this.velocity[i][1] *= drag;
                let spv = [this.velocity[i][0] - this.rolls[i][0], this.velocity[i][1] - this.rolls[i][1]];
                
                this.rolls[i][0] += spv[0] * fr;
                this.rolls[i][1] += spv[1] * fr;
        
                this.velocity[i][0] -= spv[0] * fr;
                this.velocity[i][1] -= spv[1] * fr;
                
                for (let j = 0; j < 3; j++) {
                    if (i != j) {
                        if (pythagorean(this.ballcoords[j][0] - this.ballcoords[i][0], this.ballcoords[j][1] - this.ballcoords[i][1]) <= radius * 2){
                            if (i == 0) {
                                if (this.alive == 9 - 3 * j) {
                                    if (this.cushion < 3) {
                                        this.alive = 10;
                                    }
                                    else {
                                        this.alive = true;
                                    }
                                }
                                else if (this.alive == false) {
                                    this.alive = 3 * j;
                                }
                            }
                            let a = [this.ballcoords[j][0] - this.ballcoords[i][0], this.ballcoords[j][1] - this.ballcoords[i][1]];
                            let d = pythagorean(...a);
                            this.ballcoords[j][0] = this.ballcoords[i][0] + a[0] * (radius * 2 / d);
                            this.ballcoords[j][1] = this.ballcoords[i][1] + a[1] * (radius * 2 / d);
                            let cosav = (a[0]*this.velocity[i][0]+a[1]*this.velocity[i][1]) / (radius * radius * 4);
                            
                            this.velocity[j][0] += a[0] * cosav;
                            this.velocity[j][1] += a[1] * cosav;
                            this.rolls[i][0] *= 0.5;
                            this.rolls[i][1] *= 0.5;

                            this.velocity[i][0] -= a[0] * cosav;
                            this.velocity[i][1] -= a[1] * cosav;
                        }
                    }
                }
            }
        }
    }

    shoot() {
        let qstrength = 10;
        let theta = this.angle * (2 * 3.1415926535897932 / 360);

        this.velocity[0][0] = qstrength * Math.sin(theta);
        this.velocity[0][1] = qstrength * Math.cos(theta);
        this.alive = false;
        this.cushion = 0;
    }

    render() {
        render(ctx, this.ballcoords, center, this.cushion, this.alive, this.velocity, this.rolls, this.accrolls);
    }
}

let bc = [
    [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])],
    [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])],
    [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])]
];

const worldsize = 180;
let world = Array.from({ length: worldsize }, (_, i) => new Entity([...bc.map(e=>[...e])], i * 2));

for (let n = 0; n < worldsize; n++) {
    world[n].nth = n;
}

let gen = 0;
let last = [];
let acacts = 0;
let act = actdur;
let present = false;
let scores = Array.from({ length: 60 }, ()=>0);
let bests = Array.from({ length: worldsize }, (_, b) => b);

setInterval(() => {
    if (act >= actdur) {
        act = 0;
        if (acacts > 0) { 
            let dl = world.map((e, i)=>[e, i]).filter(e=>e[0].alive==true).map((a)=>a[1]);
            let sw = false;
            if (present) {
                sw = present.accrolls;
            }
            present = new Entity(bc, world[dl[0]].angle);
            if (sw) {
                present.accrolls = sw;
            }
            bc = [...world[dl[0]].ballcoords];
            world = Array.from({ length: worldsize }, (_, i) => new Entity([...bc.map(e=>[...e])], i * 2));
            present.shoot();
        }
        for (let i = 0; i < worldsize; i++) {
            world[i].nth = i;
        }
        world.forEach(e=>e.shoot());
        output.innerText = acacts;
        acacts += 1;
    }
    else {
        ctx.fillStyle = '#12a4ff';
        ctx.clearRect(center[0] - 1600 * zoom, center[1] - 3100 * zoom, 3200 * zoom, 6200 * zoom);
        ctx.fillRect(center[0] - 150 * zoom, center[1] - 300 * zoom, 300 * zoom, 600 * zoom);
        if (present) {    
            present.tick();
            present.render();
        }
        world.forEach(e => e.tick());
    }
    act += fp;
}, 1);