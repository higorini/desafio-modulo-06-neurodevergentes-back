const joi = require("joi");

const schemaValidateRegister = joi.object({
	email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),
	password: joi.string().required().messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
	}),
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),
});
const schemaValidateLogin = joi.object({
	password: joi.string().required().messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
	}),
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),
});
const schemaValidateEdit = joi.object({
	email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),
});

module.exports = {
	schemaValidateRegister,
	schemaValidateEdit,
	schemaValidateLogin,
};
