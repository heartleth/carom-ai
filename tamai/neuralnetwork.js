function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

function tanh(z) {
    return Math.tanh(z);
}

function LeakyReLU(z) {
    if (z > 0) {
        return z;
    }
    else {
        return 0.01 * z;
    }
}

class Life {
    constructor(a, b, c) {
        this.input = new Float32Array(8);
        this.input_bias = 10
        this.hidden1 = new Float32Array(8);
        this.hidden1_bias = 1;
        this.hidden2 = new Float32Array(8);
        this.hidden2_bias = 1;
        this.output = new Float32Array(12);

        this.weights = [a, b, c];
    }
    
    evaluate(balls) {
        for (let i = 0; i < 8; i++) {
            this.hidden1[i] = this.input_bias;
            for (let j = 0; j < 8; j++) {
                this.hidden1[i] += this.weights[0][i][j] * this.input[j];
            }
            this.hidden2[i] = tanh(this.hidden2[i]);
        }
        for (let i = 0; i < 8; i++) {
            this.hidden2[i] = this.hidden1_bias;
            for (let j = 0; j < 8; j++) {
                this.hidden2[i] += this.weights[1][i][j] * this.hidden1[j];
            }
            this.hidden2[i] = tanh(this.hidden2[i]);
        }
        for (let i = 0; i < 12; i++) {
            this.output[i] = this.hidden2_bias;
            for (let j = 0; j < 8; j++) {
                this.output[i] += this.weights[2][i][j] * this.hidden2[j];
            }
            this.output[i] = sigmoid(this.output[i]);
        }
    }
    
    input_values(v) {
        // for (let i = 0; i < 3; i++) {
        //     this.input[i] = Math.atan2(v[i * 2 + 2] - v[0], v[i * 2 + 3] - v[1]) / Math.PI;
        // }
        this.input = v;
    }
    
    most_output() {
        let max = 0;
        for (let i = 0; i < 72; i++) {
            if (this.output[i] > this.output[max]) {
                max = i;
            }
        }
        return max;
    }
    
    binangle() {
        return this.output.slice(0, 9).map(e => e > 0.5).map((e, i) => Math.pow(2, i) * e).reduce((a, b) => a + b);
    }
    
    strength() {
        return this.output.slice(9).map(e => e > 0.5).map((e, i) => Math.pow(2, i) * e).reduce((a, b) => a + b);
    }
}