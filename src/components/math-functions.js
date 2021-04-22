function meanSkew(x, mean, skew) {
	return Math.pow(x, (((mean - 0.5) * skew) + 1));
}

function stdSkew(x, std, skew) {
	return clamp((x - 0.5) * Math.pow(1 + (1 / Math.sqrt(12)) - std, skew) + 0.5, 0, 1);
}

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function normalise(array) {
	const sum = array.reduce((a, b) => a + b, 0);
	if (sum === 0) {
		return array.map(x => 1 / array.length);
	}
	return array.map(x => x / sum);
}

function factorial(x) {
	if (x === 0) return 1;
	else return x * factorial(x - 1);
}

function combination(n, r) {
	return factorial(n) / (factorial(r) * factorial(n - r));
}

export {
	meanSkew,
	stdSkew,
	clamp,
	normalise,
	factorial,
	combination
}
