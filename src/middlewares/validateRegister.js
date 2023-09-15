const {
	schemaValidateEmailPassword,
	schemaValidateName,
} = require("../schemas/schemaValidateUser");

const validate = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		if (!name & !email & !password) {
			return res
				.status(400)
				.json({ message: "Todos os campos são obrigatórios" });
		}
		await schemaValidateEmailPassword.validateAsync({ email, password });
		await schemaValidateName.validateAsync({ name });
		next();
	} catch (erro) {
		console.log(erro);
		res.status(400).json({ message: erro.message });
	}
};

module.exports = validate;
