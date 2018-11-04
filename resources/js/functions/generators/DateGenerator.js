import { randomRangeInt } 							from "../utilities/NumberUtiltiies";
import moment 										from "moment";

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