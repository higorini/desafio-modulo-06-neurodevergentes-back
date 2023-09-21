const {
	schemaValidateEmail,
	schemaValidatePassword,
} = require("../schemas/schemaRegisterUser");

const validateLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		await schemaValidateEmail.validateAsync({ email });
		await schemaValidatePassword.validateAsync({ password });
		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};

module.exports = validateLogin;
