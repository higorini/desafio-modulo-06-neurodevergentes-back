function capitalizeFullName(fullName) {
	return fullName
		.split(" ")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join(" ");
}

module.exports = capitalizeFullName;
