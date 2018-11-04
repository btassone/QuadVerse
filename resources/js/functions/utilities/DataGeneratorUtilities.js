import { randomRangeInt } 							from "./NumberUtiltiies";
import { randomIntegers } 							from "./NumberUtiltiies";
import { verifySizes } 								from "./NumberUtiltiies";

import { nameFormat } 								from "./StringUtilities";
import { randomString } 							from "./StringUtilities";

import moment 										from "moment";

/**
 * Call the specified generator function based on the type passed into it
 *
 * @param fieldMap
 * @param quantity
 * @param fields
 *
 * @returns {*}
 */
export function generatedData(fieldMap, quantity, fields) {
	let data = {};

	fields.forEach(field => {
		if(fieldMap[field.model.type] !== undefined) {
			let type = field.model.type;
			let options = (field.model.options !== undefined) ? field.model.options : null;

			data[field.key] = fieldMap[type](options, quantity);
		}
	});

	return data;
}

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

/**
 * Get random dates between a start and an end date. Only works with days for the moment. Uses moment.js for date handling
 *
 * @param options
 * @param quantity
 *
 * @returns {Array}
 */
export function dateGenerator(options, quantity) {
	let generatedDates = [];

	let format = (options && options.format !== undefined) ? options.format : "Y-MM-DD hh:mm:ss";
	let start = (options && options.start !== undefined) ? options.start : "2018-01-01 00:00:00";
	let end = (options && options.end !== undefined) ? options.end : moment(new Date()).format(format);

	start = moment(start);
	end = moment(end);

	let maxDays = Math.floor(moment.duration(end.diff(start)).asDays());
	let minDays = 1;

	for(let i = 0; i < quantity; i++) {
		let randDay = randomRangeInt(minDays, maxDays);
		let date = moment(start).add(randDay, 'days');

		generatedDates.push(date.format(format));
	}

	return generatedDates;
}

export function paginateData(items, perPage, totalPages, totalResponses) {
	let paginatedData = [];
	let tempData = [];
	let baseResponse = {
		lastPage: totalPages,
		total: totalResponses
	};

	items.forEach((item, index) => {
		if(index > 1 && (index % perPage === 0)) {
			paginatedData.push( Object.assign( { data: tempData }, baseResponse ) );
			tempData = [];
		}

		tempData.push(items[index]);
	});

	if(tempData.length > 0) {
		paginatedData.push( Object.assign( { data: tempData }, baseResponse ) );
		tempData = [];
	}

	return paginatedData;
}

export function pieceRandomDataIntoItems(data, dataLength, fields) {

	let randomlyPiecedData = [];

	for(let i = 0; i < dataLength; i++) {
		// Create a new item object
		let item = {};

		// For each of the field keys we need to grab a piece of random data and add it to the item
		for(let g = 0; g < fields.length; g++) {

			// Get the field key
			let fieldKey = fields[g].key;

			// Reference the dataSet via the field key
			let dataSet = data[fieldKey];

			// Get an initial random number to try based off the dataSets length and use it as the max
			let randNum = randomRangeInt(0, dataSet.length-1);

			// If the array is empty, continue to the next key
			if(data[fieldKey].length === 0)
				continue;

			// If we still have data in the array we need to find a valid slot
			while(dataSet[randNum] === undefined) {
				randNum = randomRangeInt(0, dataSet.length-1);
			}

			// Once we found a random number that has data in it, assign it to the current item
			item[fieldKey] = dataSet[randNum];

			// Remove the item from the data array (ref original data holder)
			data[fieldKey].splice(randNum, 1);
		}

		randomlyPiecedData.push(item);
	}

	return randomlyPiecedData;
}

export function sortResponseData(data, sort) {
	let lastNameSort = (a, b) => {
		let splitA = a[sort.by].split(" ");
		let splitB = b[sort.by].split(" ");
		let lastA = splitA[splitA.length - 1];
		let lastB = splitB[splitB.length - 1];

		if (lastA < lastB) return (sort.desc) ? 1 : -1;
		if (lastA > lastB) return (sort.desc) ? -1 : 1;
		return 0;
	};
	let stringSort = (a, b) => {
		if(a[sort.by] < b[sort.by]) return (sort.desc) ? 1 : -1;
		if(a[sort.by] > b[sort.by]) return (sort.desc) ? -1 : 1;
		return 0;
	};
	let dateSort = (a, b) => {
		let aDate = moment(a[sort.by]);
		let bDate = moment(b[sort.by]);

		if(aDate.isBefore(bDate)) return (sort.desc) ? 1 : -1;
		if(aDate.isAfter(bDate)) return (sort.desc) ? -1 : 1;
		return 0;
	};
	let intSort = (a, b) => (sort.desc) ? b[sort.by] - a[sort.by] : a[sort.by] - b[sort.by];

	// Sort by key
	if(sort.type !== undefined && sort.type === "string") {
		data.sort(stringSort);
	} else if(sort.type !== undefined && sort.type === "name") {
		data.sort(lastNameSort);
	} else if(sort.type !== undefined && sort.type === "date") {
		data.sort(dateSort);
	} else {
		data.sort(intSort);
	}

	return data;
}