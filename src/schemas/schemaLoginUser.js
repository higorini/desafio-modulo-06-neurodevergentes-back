const joi = require("joi");

const schemaLoginUser = joi.object({
    email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),

	password: joi.string().required().min(6).messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
		'string.min': 'A senha deve possuir pelo menos 6 caracteres'
	}),
});

module.exports = schemaLoginUser;