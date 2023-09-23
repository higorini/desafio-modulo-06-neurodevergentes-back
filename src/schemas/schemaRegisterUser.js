const joi = require("joi");

const schemaValidateUser = joi.object({
	name: joi.string().required().trim().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),

	email: joi.string().email().required().trim().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),

	password: joi.string().required().min(6).trim().messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
		"string.min": "A senha deve possuir pelo menos 6 caracteres",
	}),
});

module.exports = schemaValidateUser;
