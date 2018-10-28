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