const schemaValidRegister = require("../schemas/schemaValidateRegister");

const validate = async (req, res, next) => {
	try {
		await schemaValidRegister.validateAsync(req.body);
		next();
	} catch (erro) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = validate;
