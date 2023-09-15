const { schemaValidateLogin } = require("../schemas/schemaValidateUser");

const validateLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "E-mail e senha são obrigatórios." });
		}
		await schemaValidateLogin.validateAsync(req.body);
		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};

module.exports = validateLogin;
