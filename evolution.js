function getRandomInt(min, max, p=2) {
    if (p==1){
        let r = Math.random();
        if (r <= 0.7) {
            return 2;
        }
        else if (r = 0.85) {
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
            [getRandomInt(-100, 101), getRandomInt(-100, 101)],
            [getRandomInt(-100, 101), getRandomInt(-100, 101)],
            [getRandomInt(-100, 101), getRandomInt(-100, 101)]
        ];
        this.velocity = [[0, 0], [0, 0], [0, 0]];
        this.weights = weights;
        this.life = new Life(...this.weights);
        this.alive = true;
    }
    
    tick() {
        for (let i = 0; i < 3; i++) {
            this.ballcoords[i][0] += this.velocity[i][0] * fp / 16;
            this.ballcoords[i][1] += this.velocity[i][1] * fp / 16;
            if (Math.abs(this.ballcoords[i][0]) >= 150 - radius) {
                this.ballcoords[i][0] = Math.sign(this.ballcoords[i][0]) * (150 - radius);
                this.velocity[i][0] *= -1
            }
            if (Math.abs(this.ballcoords[i][1]) >= 300 - radius) {
                this.ballcoords[i][1] = Math.sign(this.ballcoords[i][1]) * (300 - radius);
                this.velocity[i][1] *= -1
            }
            this.velocity[i][0] *= Math.pow(drag, fp);
            this.velocity[i][1] *= Math.pow(drag, fp);

            for (let j = 0; j < 3; j++) {
                if (i != j) {
                    if (pythagorean(this.ballcoords[j][0] - this.ballcoords[i][0], this.ballcoords[j][1] - this.ballcoords[i][1]) <= radius * 2){
                        // emitsound(this.nth % 10);
                        if (i == 0) {
                            if (this.alive == 9 - 3 * j) {
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

                        this.velocity[i][0] -= a[0] * cosav;
                        this.velocity[i][1] -= a[1] * cosav;
                    }
                }
            }
        }
    }

    shoot() {
        this.life.input_values(this.ballcoords[0].concat(this.ballcoords[1]).concat(this.ballcoords[2]));
        this.life.evaluate();
        // let out = this.life.most_output();
        // let theta = out * 5 / Math.PI;
        let out = this.life.binangle();
        let theta = out * (2 * 3.1415926535897932 / 256);
        
        this.velocity[0][0] -= 100 * Math.sin(theta);
        this.velocity[0][1] += 100 * Math.cos(theta);
        this.alive = false;
    }

    render() {
        render(ctx, this.ballcoords, centers[this.nth % 4], this.nth, this.alive);
    }
}

const worldsize = 128;
let world = Array.from({ length: worldsize }, () => new Entity([rrandomw([8, 6]), rrandomw([8, 8]), rrandomw([8, 8])]));

for (let n = 0; n < worldsize; n++) {
    world[n].nth = n;
}

let act = actdur;
let gen = 0;
let last = [];
let acacts = 0;
let bests = Array.from({ length: worldsize }, (_, b) => b);

function randombetween(a) {
    return Float32Array.from(Array.from({ length: a[0].length }, (_, i) => [...a][getRandomInt(0, a.length, 1)][i]));
}

function randombetweenw(ad) {
    return Array.from({ length: ad[0].length }, (_, i) => randombetween(ad.map(e=>e[i])))
}

let adams = [];

setInterval(() => {
    if (act >= actdur) {
        let dl = world.map((e, i)=>[e, i]).filter(e=>e[0].alive==true).map((a)=>a[1]);
        bests = bests.filter(e => !dl.includes(e)).concat(dl);
        if (dl.length == 0) {
            gen += 1;
            let adam = bests.slice(worldsize - 3).map(e=>world[e]);
            adams = bests.slice(worldsize - 3);
            
            let childs = Array.from({ length: worldsize - mutations }, () => new Entity([
                randombetweenw(adam.map(e=>e.weights[0])),
                randombetweenw(adam.map(e=>e.weights[1])),
                randombetweenw(adam.map(e=>e.weights[2]))
            ]));
            world = Array.from({ length: mutations }, () => new Entity([rrandomw([8, 6]), rrandomw([8, 8]), rrandomw([8, 8])]));
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
        act = 0;
        acacts += 1;
    }
    else {
        ctx.clearRect(0, 0, 9999, 9999);
        ctx.fillStyle = '#90d64f';
        for (let c of centers) {
            ctx.fillRect(c[0] - 150 * zoom, c[1] - 300 * zoom, 300 * zoom, 600 * zoom);
        }
        world.filter((e, i)=>last.includes(i)).forEach(e => e.tick());
        world.filter((e, i)=>last.includes(i)).forEach(e => e.render());
    }
    act += fp;
}, 1);