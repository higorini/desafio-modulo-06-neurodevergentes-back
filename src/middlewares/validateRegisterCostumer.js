const {
	schemaValidateEmail,
	schemaValidateName,
} = require("../schemas/schemaValidateUser");

const schemaValidateCostumer = require("../schemas/schemaRegisterCostumer");

const validateRegisterCostumer = async (req, res, next) => {
	let { name, email, cpf, phone, status } = req.body;

	try {
		await schemaValidateEmail.validateAsync({ email });
		await schemaValidateName.validateAsync({ name });
		await schemaValidateCostumer.validateAsync({ cpf, phone, status });
		return next();
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
module.exports = validateRegisterCostumer;
