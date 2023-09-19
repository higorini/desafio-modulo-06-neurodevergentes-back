const { schemaValidatePassword } = require("../schemas/schemaValidateUser");

const validateRegister = async (req, res, next) => {
	const { password } = req.body;
	try {
		await schemaValidatePassword.validateAsync({ password });
		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};

module.exports = validateRegister;
