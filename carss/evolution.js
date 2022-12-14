function getRandomInt(min, max, p=2) {
    if (p==1){
        let r = Math.random();
        if (r <= 0.70) {
            return 3;
        }
        else if (r <= 0.80) {
            return 2;
        }
        else if (r <= 0.90) {
            return 1;
        }
        else {
            return 0;
        }
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function emitsound(n) {
    let a = document.getElementById(n);
    a.play();
}

class Entity {
    constructor(weights) {
        this.nth = 0;
        this.ballcoords = [
            [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])],
            [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])],
            [getRandomInt(-spawnrange[0], spawnrange[0]), getRandomInt(-spawnrange[1], spawnrange[1])]
        ];
        this.velocity = [[0, 0], [0, 0], [0, 0]];
        this.spins = [[0, 0], [0, 0], [0, 0]];
        this.weights = weights;
        this.life = new Life(...this.weights);
        this.alive = true;
        this.cushion = 0;
    }
    
    tick() {
        for (let l = 0; l < fp; l++) {
            for (let i = 0; i < 3; i++) {
                this.ballcoords[i][0] += this.velocity[i][0];
                this.ballcoords[i][1] += this.velocity[i][1];
                if (Math.abs(this.ballcoords[i][0]) >= 150 - radius) {
                    this.ballcoords[i][0] = Math.sign(this.ballcoords[i][0]) * (150 - radius);
                    this.velocity[i][0] *= -1;
                    this.rolls[i][0] *= 0.5;
                    this.rolls[i][1] *= 0.5;
                }
                if (Math.abs(this.ballcoords[i][1]) >= 300 - radius) {
                    this.ballcoords[i][1] = Math.sign(this.ballcoords[i][1]) * (300 - radius);
                    this.velocity[i][1] *= -1
                    this.rolls[i][0] *= 0.5;
                    this.rolls[i][1] *= 0.5;
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
                            emitsound(this.nth % 10);
                            if (i == 0) {
                                if (j == 3) {
                                    this.alive = 10;
                                }
                                else if (this.alive == 9 - 3 * j) {
                                    this.alive = true;
                                }
                                else if (this.alive == false) {
                                    this.alive = 3 * j;
                                }
                            }
                            let a = [this.ballcoords[j][0] - this.ballcoords[i][0], this.ballcoords[j][1] - this.ballcoords[i][1]];
                            let d = pythagorean(...a);
                            this.ballcoords[j][0] = this.ballcoords[i][0] + a[0] * (radius * 2 / d);
                            this.ballcoords[j][1] = this.ballcoords[i][1] + a[1] * (radius * 2 / d);
                            let v = pythagorean(...this.velocity[i]);
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
        this.life.input_values(this.ballcoords[0].concat(this.ballcoords[1]).concat(this.ballcoords[2]));
        this.life.evaluate();
        let out = this.life.binangle();
        let qstrength = this.life.strength() * 10 + 20;
        let theta = out * (2 * 3.1415926535897932 / 512);

        this.velocity[0][0] = qstrength * Math.sin(theta);
        this.velocity[0][1] = qstrength * Math.cos(theta);
        this.alive = false;
        this.cushion = 0;
    }

    render() {
        render(ctx, this.ballcoords, centers[this.nth % 4], this.nth, this.alive);
    }
}

let makenew = () => new Entity([rrandomw([8, 6]), rrandomw([8, 8]), rrandomw([12, 8])]);

const worldsize = 128;
let world = Array.from({ length: worldsize }, makenew);

for (let n = 0; n < worldsize; n++) {
    world[n].nth = n;
}

let act = actdur;
let gen = 0;
let last = [];
let acacts = 0;
let scores = Array.from({ length: 60 }, ()=>0);
let bests = Array.from({ length: worldsize }, (_, b) => b);

function randombetween(a, b) {
    if (b == 1) {
       return Float32Array.from(Array.from({ length: a[0].length }, (_, i) => [...a][getRandomInt(0, a.length, 1)][i]));
    }
    else {
        let r = getRandomInt(0, a.length, 1);
        return Float32Array.from(Array.from({ length: a[0].length }, (_, i) => [...a][r][i]));
    }
}

function randombetweenw(ad) {
    return Array.from({ length: ad[0].length }, (_, i) => randombetween(ad.map(e=>e[i]), Math.round(Math.random())))
}

let adams = [];

setInterval(() => {
    if (act >= actdur) {
        act = 0;
        let dl = world.map((e, i)=>[e, i]).filter(e=>e[0].alive==true).map((a)=>a[1]);
        bests = bests.filter(e => !dl.includes(e)).concat(dl);
        if (dl.length == 0) {
            scores = scores.slice(1);
            scores.push(acacts);
            drawGraph(scores, gen);
            gen += 1;
            let adam = bests.slice(worldsize - 4).map(e=>world[e]);
            adams = bests.slice(worldsize - 4);
            
            let childs = Array.from({ length: worldsize - mutations - 20}, () => new Entity([
                randombetweenw(adam.map(e=>e.weights[0])),
                randombetweenw(adam.map(e=>e.weights[1])),
                randombetweenw(adam.map(e=>e.weights[2]))
            ]));
            world = Array.from({ length: mutations }, makenew);
            for (let i = 0; i < 4; i++) {
                world = world.concat([adam[0], adam[0], adam[1], adam[2], adam[3]]);
            }
            world = world.concat(childs);
            for (let n = 0; n < worldsize; n++) {
                world[n].nth = n;
            }
            dl = Array.from({ length: worldsize }, (_, b) => b);
            acacts = 0;
        }
        last = dl;
        
        output.innerText = last.join(' ') + '\nSUP ' + bests.join(' ') + `\nSUCCEEDING ${adams.join(' ')}\n# GEN ${gen} \n` + `# SCORE ${acacts}`;
        world.filter((e, i)=>last.includes(i)).forEach(e=>e.shoot());
        acacts += 1;
    }
    else {
        ctx.fillStyle = '#12a4ff';
        for (let c of centers) {
            ctx.clearRect(c[0] - 160 * zoom, c[1] - 310 * zoom, 320 * zoom, 620 * zoom);
            ctx.fillRect(c[0] - 150 * zoom, c[1] - 300 * zoom, 300 * zoom, 600 * zoom);
        }
        world.filter((e, i)=>last.includes(i)).forEach(e => e.tick());
        world.filter((e, i)=>last.includes(i)).forEach(e => e.render());
    }
    act += fp;
}, 1);