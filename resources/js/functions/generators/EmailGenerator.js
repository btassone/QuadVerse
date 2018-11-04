import { randomRangeInt } 						from "../utilities/NumberUtiltiies";
import { verifySizes } 							from "../utilities/NumberUtiltiies";
import { randomString } 						from "../utilities/StringUtilities";

/**
 * Generate a set of email address by providing a set of domains and sizes for the mailbox
 *
 * @param options
 * @param quantity
 *
 * @returns {Array}
 */
export function emailGenerator(options, quantity) {
	let generatedEmails = [];

	let domains = (options && options.domains !== undefined && options.domains.length > 0) ? options.domains : ["google.com", "yahoo.com", "hotmail.com", "mail.org"];
	let sizeDefaults = {
		mailbox: { min: 5, max: 20 }
	};
	let size = (options && options.size !== undefined) ? verifySizes(sizeDefaults, options.size) : sizeDefaults;

	let randMailbox = size => randomString(randomRangeInt(size.min, size.max));

	for(let i = 0; i < quantity; i++) {
		let mailbox = randMailbox(size["mailbox"]);
		let domain = domains[randomRangeInt(0, domains.length)];

		generatedEmails.push(`${mailbox}@${domain}`);
	}

	return generatedEmails;
}