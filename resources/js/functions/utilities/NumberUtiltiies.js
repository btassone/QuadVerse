/**
 * Get a set of random integers based on start, end, and quantity
 *
 * @param start
 * @param end
 * @param quantity
 *
 * @returns {Array}
 */
export function randomIntegers(start, end, quantity) {
	let randomIntegers = [];

	while(randomIntegers.length < quantity) {
		let rand = randomRangeInt(Math.ceil(start), Math.floor(end));

		if(randomIntegers.indexOf(rand) === -1) {
			randomIntegers.push(rand);
		}
	}

	return randomIntegers;
}

/**
 * Get a number in between a min and a max
 *
 * @param min
 * @param max
 *
 * @returns {int}
 */
export function randomRangeInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Take in a set of default sizes and the passed in sizes. Check for integrity and if not found
 * replace them with the defaults where applicable
 *
 * @param defaults
 * @param size
 *
 * @returns {*}
 */
export function verifySizes(defaults, size) {
	Object.keys(defaults).forEach(key => {

		// Verify that we have some values set
		size[key] = (size[key] !== undefined) ? size[key] : defaults[key];

		// Set the sizeSet
		let sizeSet = size[key];
		let defaultSet = defaults[key];

		// If the size set min is undefined or less than or equal to 0 set it to the default min
		if(sizeSet.min === undefined || sizeSet.min <= 0) {
			sizeSet["min"] = defaultSet.min;
		}

		// If size set max undefined or less than min set it to the default max and test if its greater
		// than the min if not set it to the min + 1
		if(sizeSet.max === undefined || sizeSet.max < sizeSet.min) {
			sizeSet["max"] = defaultSet.max;
			sizeSet["max"] = (sizeSet.max > sizeSet.min) ? sizeSet.max : sizeSet.min + 1;
		}

		size[key] = sizeSet;
	});

	return size;
}