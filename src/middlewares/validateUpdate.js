const {
	schemaValidateEmail,
	schemaValidateName,
} = require("../schemas/schemaValidateUser");
const validateEdit = async (req, res, next) => {
	try {
		let { name, email } = req.body;
		await schemaValidateEmail.validateAsync({ email });
		await schemaValidateName.validateAsync({ name });
		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};
module.exports = validateEdit;
