import { emailGenerator } 							from "./DataGeneratorUtilities";
import { nameGenerator } 							from "./DataGeneratorUtilities";
import { rangeGenerator } 							from "./DataGeneratorUtilities";
import { dateGenerator } 							from "./DataGeneratorUtilities";
import { generatedData } 							from "./DataGeneratorUtilities";
import { pieceRandomDataIntoItems }					from "./DataGeneratorUtilities";
import { sortResponseData } 						from "./DataGeneratorUtilities";
import { paginateData } 							from "./DataGeneratorUtilities";

/**
 * Get paginated results like you would from laravel paginate (spatie library)
 *
 * @param numOfResponses
 * @param perPage
 * @param fields
 * @param {{by: string, desc: boolean, type: string}} sort
 *
 * @returns {Array}
 */
export function paginatedResponseFactory(numOfResponses, perPage, fields, sort) {
	let fieldTypeGeneratorMap = {
		range: rangeGenerator,
		name: nameGenerator,
		email: emailGenerator,
		date: dateGenerator
	};
	let totalPages = Math.ceil(numOfResponses / perPage);
	let data = generatedData(fieldTypeGeneratorMap, numOfResponses, fields);
	let piecedData = pieceRandomDataIntoItems(data, numOfResponses, fields);
	let sortedData = sortResponseData(piecedData, sort);

	return paginateData(sortedData, perPage, totalPages, numOfResponses);
}