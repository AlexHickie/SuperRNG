import * as RNG from './RNG.js'

class Generator {
	constructor(
		sidesOnDie = 6,
		numberOfDice = 1,
	) {
		this.sidesOnDie = sidesOnDie;
		this.numberOfDice = numberOfDice;

		this.reset();
	}

	generateNumber(randomInput = Math.random()) {
		return this.rng.generate(randomInput);
	}

	setSidesOnDie(sidesOnDie) {
		this.sidesOnDie = sidesOnDie;
		this.reset();
	}

	setNumberOfDice(numberOfDice) {
		this.numberOfDice = numberOfDice;
		this.reset();
	}

	reset() {
		// TODO: Pick settings that feel good
		this.rng = new RNG.ExponentialDiscrete(
			this.sidesOnDie,
			this.numberOfDice
		);
	}
}

export default Generator;
