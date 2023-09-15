const joi = require("joi");

const schemaValidateEmailPassword = joi.object({
	email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),
	password: joi.string().required().messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
	}),
});
const schemaValidateName = joi.object({
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),
});

module.exports = { schemaValidateEmailPassword, schemaValidateName };