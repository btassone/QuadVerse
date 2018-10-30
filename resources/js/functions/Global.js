// Keys are the context keys mapped to the string to pass in the request
export const PAGINATION_PARAMS_MAP = {
	perPage: "pagination",
	currentPage: "page[number]",
	filter: "filter",
	sortBy: "sort[by]",
	sortDesc: "sort[desc]"
};

export function getParamsString(param_map, value_map) {
	let out = "";
	let value_keys = Object.keys(value_map);

	// Loop over the key values
	value_keys.forEach((key, index) => {

		// If the value isn't undefined, null, or empty
		if(value_map[key] !== undefined && value_map[key] !== null && value_map[key] !== "") {

			// If first one, skip the &
			if(index !== 0)
				out += '&';

			// Add the param name and value with an = symbol in between
			out += `${param_map[key]}=${value_map[key]}`;
		}
	});

	// Return the param string
	return out;
}

export function addFilterableColumns(params, fields, column_key = "filter_columns") {
	fields.forEach(field => {
		if(field.filterable) {
			params += `&${column_key}[]=${field.key}`;
		}
	});

	return params;
}