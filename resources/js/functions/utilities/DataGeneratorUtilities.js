import { randomRangeInt } 							from "./NumberUtiltiies";

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

	return randomizeDataIntoRows(data, quantity, fields);
}

/**
 * Takes sets of data that are equal in length and randomly picks data from each and matches them to the field key
 * scheme to create lines of items
 *
 * @param data
 * @param dataLength
 * @param fields
 *
 * @returns {Array}
 */
export function randomizeDataIntoRows(data, dataLength, fields) {

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

/**
 * Used for sorting data sets for tests (pre pagination - must be flat)
 *
 * @param data
 * @param sort
 *
 * @returns {*}
 */
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