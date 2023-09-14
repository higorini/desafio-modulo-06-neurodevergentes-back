const joi = require("joi");

const schemaValidateRegister = joi.object({
	name: joi.string().required().message({
		"any.required": "Nome é obrigátorio",
	}),
	email: joi.string().email().required().message({
		"any.required": "E-mail é obrigátorio",
	}),
	password: joi.string().required().message({
		"any.required": "Senha é obrigátorio",
	}),
});

module.exports = schemaValidateRegister;
