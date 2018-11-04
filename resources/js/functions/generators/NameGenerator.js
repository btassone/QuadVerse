import { randomRangeInt } 					from "../utilities/NumberUtiltiies";
import { verifySizes } 						from "../utilities/NumberUtiltiies";
import { randomString } 					from "../utilities/StringUtilities";
import { nameFormat } 						from "../utilities/StringUtilities";

/**
 * Generate a set of names (first and/or last)
 *
 * @param options
 * @param quantity
 *
 * @returns {Array}
 */
export function nameGenerator(options, quantity) {
	let generatedNames = [];

	let last = (options && options.last !== undefined) ? options.last : true;
	let separator = (options && options.separator !== undefined) ? options.separator : " ";

	let sizeDefaults = {
		first: { min: 5, max: 12 },
		last: { min: 7, max: 20 }
	};
	let size = (options && options.size !== undefined) ? verifySizes(sizeDefaults, options.size) : sizeDefaults;

	let randName = size => nameFormat(randomString(randomRangeInt(size.min, size.max)));

	for(let i = 0; i < quantity; i++) {
		let name = randName(size["first"]);
		name += (last) ? (separator + randName(size["last"])) : "";

		generatedNames.push(name);
	}

	return generatedNames;
}