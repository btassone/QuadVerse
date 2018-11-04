import { emailGenerator } 							from "./DataGeneratorUtilities";
import { nameGenerator } 							from "./DataGeneratorUtilities";
import { rangeGenerator } 							from "./DataGeneratorUtilities";
import { dateGenerator } 							from "./DataGeneratorUtilities";
import { generatedData } 							from "./DataGeneratorUtilities";
import {randomRangeInt} from "./NumberUtiltiies";

export function paginatedResponseFactory(numOfResponses, perPage, fields) {
	let responses = [];
	let fieldTypeGeneratorMap = {
		range: rangeGenerator,
		name: nameGenerator,
		email: emailGenerator,
		date: dateGenerator
	};
	let data = generatedData(fieldTypeGeneratorMap, numOfResponses, fields);
	let totalPages = Math.ceil(numOfResponses / perPage);
	let baseResponse = {
		lastPage: totalPages,
		total: data[fields[0].key].length
	};

	// For each page until total pages
	for(let page = 0; page < totalPages; page++) {

		// Set the current page and add the lastPage and total properties with an empty data array
		let responsePage = {
			currentPage: page+1,
			lastPage: baseResponse.lastPage,
			total: baseResponse.total,
			data: []
		};

		// For each possible item in the paged stack
		for(let i = 0; i < perPage; i++) {

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

			// If the item object has no keys, assume we ran out of data and continue
			if(Object.keys(item).length === 0)
				continue;

			// If item has keys, there is data to push so push it to the responsePage object
			responsePage.data.push(item);
		}

		// If the response page objects data property has nothing in it, then we have no more data to add
		if(responsePage.data.length === 0)
			continue;

		// If there was data found push the response page to the response array.
		responses.push(responsePage);
	}

	return responses;
}