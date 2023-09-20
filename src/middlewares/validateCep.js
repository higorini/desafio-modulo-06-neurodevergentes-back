const schemaValidateCep = require("../schemas/schemaValidateCep");

const validateCep = async (req, res, next) => {
	const { cep } = req.params;

	try {
		await schemaValidateCep.validateAsync({ cep });
		next();
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
module.exports = validateCep;
