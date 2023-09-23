const trimFields = (fields) => {
	return Object.fromEntries(
		Object.entries(fields).map(([key, value]) => [key, value.trim()])
	);
};

module.exports = trimFields;
