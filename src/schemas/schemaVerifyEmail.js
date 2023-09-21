const joi = require("joi");

const schemaVerifyEmail = joi.object({
    name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),

	email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),
});

module.exports = schemaVerifyEmail;