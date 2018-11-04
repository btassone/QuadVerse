/**
 * Format a string into the format of a name. Capital first later, rest lower case
 *
 * @param str
 *
 * @returns {string}
 */
export function nameFormat(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate a random string based on length
 *
 * @param length
 *
 * @returns {string}
 */
export function randomString(length = 8) {
	let randString = '';
	let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	for (let i = 0; i < length; i++) {
		let randNum = Math.floor( Math.random() * chars.length );

		randString += chars.substring( randNum, randNum + 1 );
	}

	return randString;
}