import { generatedData } 							from "../utilities/DataGeneratorUtilities";
import { sortResponseData } 						from "../utilities/DataGeneratorUtilities";

/**
 * Get paginated results like you would from laravel paginate (spatie library)
 *
 * @param fieldTypeGeneratorMap
 * @param numOfResponses
 * @param perPage
 * @param fields
 * @param {{by: string, desc: boolean, type: string}} sort
 *
 * @returns {Array}
 */
export function paginatedResponseFactory(fieldTypeGeneratorMap, numOfResponses, perPage, fields, sort) {
	let totalPages = Math.ceil(numOfResponses / perPage);
	let data = generatedData(fieldTypeGeneratorMap, numOfResponses, fields);
	let sortedData = sortResponseData(data, sort);

	return paginateData(sortedData, perPage, totalPages, numOfResponses);
}

/**
 * Takes data and paginates it like laravel does (based on the way spatie json-paginate dumps out)
 *
 * @param items
 * @param perPage
 * @param totalPages
 * @param totalResponses
 *
 * @returns {Array}
 */
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