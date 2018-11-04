import { randomIntegers } 							from "../utilities/NumberUtiltiies";

/**
 * Generate a range of numeric data (integers or doubles)
 *
 * @param options
 * @param quantity
 *
 * @returns {Array}
 */
export function rangeGenerator(options, quantity) {
	let generatedRange = [];

	let format = (options && options.format !== undefined) ? options.format : "integer";
	let start = (options && options.start !== undefined) ? options.start : 1;
	let end = (options && options.end !== undefined) ? options.end : quantity + 1;

	if((quantity+start) > end) {
		throw new Error("Incorrect End Number: quantity + start cannot be greater in size than the end number.")
	}

	switch(format) {
		default:
			generatedRange = randomIntegers(start, end, quantity);
			break;
	}

	return generatedRange;
}