import * as MathFunctions from './math-functions.js';

class RNG {
	constructor(historySize = 20) {
		this.historySize = historySize;
		this.history = [];
	}

	reset() {
		this.history = [];
	}

	generate() { };

	getHistory(numel = this.historySize) {
		return this.history.slice(Math.max(0, this.history.length - numel));
	}

	pushHistory(num) {
		//Store history of generated numbers for getHistory()
		this.history.push(num);
		this.history = this.history.slice(Math.max(0, this.history.length - this.historySize));
	}
}

class ContinuousRNG extends RNG {
	constructor(historySize) {
		super(historySize);
	}
}

class ExponentialContinuous extends ContinuousRNG {
	constructor(sidesOnDie = 6, numberOfDice = 1, meanSkewStrenth = 1, stdSkewStrenth = 1, forgettingFactor = 0.01, historySize = 20) {
		super(historySize);
		this.forgettingFactor = forgettingFactor;

		this.rngMean = 0.5;
		this.variance = 1 / 12;
		this.previousResult = 0.5;
	}

	reset() {
		this.rngMean = 0.5;
		this.variance = 1 / 12;
		this.previousResult = 0.5;
	}

	generate(randomInput = Math.random()) {
		// Generate adjusted random number
		const result = MathFunctions.stdSkew(MathFunctions.meanSkew(randomInput, rngMean, meanSkewStrenth), Math.sqrt(variance), stdSkewStrenth);

		// Calculate weighting parameters for the next call
		rngMean = this.forgettingFactor * previousResult + (1 - this.forgettingFactor) * rngMean;
		variance = (1 - this.forgettingFactor) * (variance + this.forgettingFactor * Math.pow(previousResult - rngMean, 2));

		return result;
	}

}

class UniformContinuous extends ContinuousRNG {
	constructor(sidesOnDie = 6, numberOfDice = 1, meanSkewStrenth = 1, stdSkewStrenth = 1, memoryLength = 10, historySize = 20) {
		historySize = Math.max(memoryLength, historySize);
		super(historySize);
		this.memoryLength = memoryLength;
	}

	generate(randomInput = Math.random()) {
		const memory = this.history.slice(Math.max(0, this.history.length - this.memoryLength));
		const sum = memory.reduce((a, b) => a + b, 0);
		const rngMean = sum / memory.length;
		const stdev = Math.sqrt(history.map(x => Math.pow(x - rngMean, 2)).reduce((a, b) => a + b, 0) / memory.length);
		const result = MathFunctions.stdSkew(MathFunctions.meanSkew(randomInput, rngMean, meanSkewStrenth), stdev, stdSkewStrenth);

		super.pushHistory(result);
		return result;
	}
}

class DiscreteRNG extends RNG {
	constructor(sidesOnDie, numberOfDice, skew, historySize) {
		super(historySize);
		this.skew = skew;
		this.sidesOnDie = sidesOnDie;
		this.numberOfDice = numberOfDice;

		this.numberOfBins = numberOfDice * sidesOnDie - (numberOfDice - 1);
		this.labels = new Array(this.numberOfBins);
		this.PDF = [];
		for (let result = numberOfDice; result <= numberOfDice * sidesOnDie; result++) {
			this.labels[result - numberOfDice] = result;
			// Generates an array containing the numbers 0 - n
			const rangeArray = [...Array(Math.floor((result - this.numberOfDice) / this.sidesOnDie) + 1).keys()];
			this.PDF[result - numberOfDice] = (1 / Math.pow(this.sidesOnDie, this.numberOfDice)) * rangeArray.map(k => {
				return Math.pow(-1, k)
					* MathFunctions.combination(this.numberOfDice, k)
					* MathFunctions.combination(result - this.sidesOnDie * k - 1, this.numberOfDice - 1);
			}).reduce((a, b) => a + b);
		}
		this.PDF = MathFunctions.normalise(this.PDF);
	}
}

class ExponentialDiscrete extends DiscreteRNG {
	constructor(sidesOnDie = 6, numberOfDice = 1, skew = 1, forgettingFactor = 0.05, historySize = 20) {
		super(sidesOnDie, numberOfDice, skew, historySize);
		this.forgettingFactor = forgettingFactor;
		this.reset();
	}

	reset() {
		super.reset();
		this.counts = new Array(this.numberOfBins).fill(1);
		this.hits = this.numberOfBins;
	}

	generate(randomInput = Math.random()) {
		// Generate correction histogram
		let neghist = [];
		for (let i = 0; i < this.counts.length; i++) {
			const hist = this.counts[i] / this.PDF[i] / this.hits;
			neghist[i] = Math.pow((1 / hist), this.skew);
		}

		const neghistnorm = MathFunctions.normalise(neghist);

		// Generate adjusted random number
		let coeff = [];
		let result = 1;
		coeff[0] = neghistnorm[0];
		for (let i = 0; i < neghistnorm.length; i++) {
			if (i > 0) coeff[i] = coeff[i - 1] + neghistnorm[i];

			result = i;

			if (randomInput < coeff[i]) {
				break;
			}
		}
		// Recalculate weightings
		for (let i = 0; i < this.counts.length; i++) {
			if (i === result) {
				this.counts[i] = this.counts[i] * Math.exp(-this.forgettingFactor) + 1;
			} else {
				this.counts[i] *= Math.exp(-this.forgettingFactor);
			}
		}
		this.hits = this.hits * Math.exp(-this.forgettingFactor) + 1;

		super.pushHistory(result);

		return this.labels[result];
	}

	getHistory(numel) {
		return this.history.slice(Math.max(0, this.history.length - numel));
	}
}

class UniformDiscrete extends DiscreteRNG {
	constructor(sidesOnDie = 6, numberOfDice = 1, skew = 1, memoryLength, historySize = 20) {
		if (memoryLength === undefined) {
			memoryLength = Math.ceil(numberOfDice * sidesOnDie * 1.5);
		}
		historySize = Math.max(memoryLength, historySize);
		super(sidesOnDie, numberOfDice, skew, historySize);
		this.memoryLength = memoryLength;
	}

	generate(randomInput = Math.random()) {

		// Generate correction histogram //
		let neghist = [];
		let counts = [];
		const memory = this.history.slice(Math.max(0, this.history.length - this.memoryLength));
		// Init count array
		for (let i = 0; i < this.numberOfBins; i++) {
			counts[i] = 1e-12;
		}
		// Count occurrence of results
		for (let i = 0; i < memory.length; i++) {
			counts[memory[i]]++;
		}
		// Calculate correction histogram
		for (let i = 0; i < counts.length; i++) {
			const hist = memory.length === 0 ? 1 : (counts[i] / memory.length);
			neghist[i] = Math.pow((1 / hist), this.skew);
		}
		const neghistnorm = MathFunctions.normalise(neghist);

		// Generate adjusted random number //
		let coeff = [];
		let result = 0;
		coeff[0] = neghistnorm[0];
		for (let i = 0; i < neghistnorm.length; i++) {
			if (i > 0) coeff[i] = coeff[i - 1] + ((neghistnorm[i] + this.PDF[i]) / 2);

			result = i;

			if (randomInput < coeff[i]) {
				break;
			}
		}

		super.pushHistory(result);

		return this.labels[result];
	}
}

export { RNG, DiscreteRNG, ContinuousRNG, UniformDiscrete, UniformContinuous, ExponentialDiscrete, ExponentialContinuous };
