const joi = require("joi");

const schemaUpdateUser = joi.object({
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
	}),

    email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),

	password: joi.string().trim().empty("").allow(null).optional().min(6).messages({
		"any.required": "Senha é obrigatório",
		"string.empty": "Senha é obrigatório",
		"string.min": "A senha deve possuir pelo menos 6 caracteres"
	}),

	cpf: joi.string().trim().empty("").allow(null).optional().min(11).messages({
		"string.base": "O Telefone deve ser uma string",
		"string.min": "O CPF deve conter no mínimo 11 dígitos"
	}),

	phone: joi.string().trim().empty("").allow(null).optional().min(11).messages({
		"string.base": "O Telefone deve ser uma string",
		"string.min": "Telefone deve no mínimo ter 11 caracteres"
	}),
});

module.exports = schemaUpdateUser;