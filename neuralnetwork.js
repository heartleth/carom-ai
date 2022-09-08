function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
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
        this.input = new Float32Array(6);
        this.input_bias = 0
        this.hidden1 = new Float32Array(8);
        this.hidden1_bias = 0;
        this.hidden2 = new Float32Array(8);
        this.hidden2_bias = 0;
        // this.hidden3 = new Float32Array(10);
        // this.hidden3_bias = 10;
        this.output = new Float32Array(8);

        this.weights = [a, b, c];
    }
    
    evaluate(balls) {
        for (let i = 0; i < 8; i++) {
            this.hidden1[i] = this.input_bias;
            for (let j = 0; j < 6; j++) {
                this.hidden1[i] += this.weights[0][i][j] * this.input[j];
            }
            this.hidden1[i] = LeakyReLU(this.hidden1[i]);
        }
        for (let i = 0; i < 8; i++) {
            this.hidden2[i] = this.hidden1_bias;
            for (let j = 0; j < 8; j++) {
                this.hidden2[i] += this.weights[1][i][j] * this.hidden1[j];
            }
            this.hidden2[i] = sigmoid(this.hidden2[i]);
        }
        for (let i = 0; i < 8; i++) {
            this.output[i] = this.hidden2_bias;
            for (let j = 0; j < 8; j++) {
                this.output[i] += this.weights[2][i][j] * this.hidden2[j];
            }
            this.output[i] = sigmoid(this.output[i]);
        }
    }
    
    input_values(v) {
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
        return this.output.map(e => e > 0.01).map((e, i) => Math.pow(2, i) * e).reduce((a, b) => a + b);
    }
}