const joi = require("joi");

const schemaRegisterCostumer = joi.object({
	name: joi.string().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
		"string.base": "O Nome deve ser uma string"
	}),

	email: joi.string().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.base": "O Nome deve ser uma string",
		"string.email": "Por favor, forneça um endereço de e-mail válido."
	}),

	cpf: joi.string().required().min(11).messages({
		"any.required": "CPF é obrigatório",
		"string.empty": "CPF é obrigatório",
		"string.base": "O CPF deve ser uma string",
		"string.min": "O CPF deve conter no mínimo 11 dígitos"
	}),

	phone: joi.string().required().min(11).messages({
		"string.base": "O Telefone deve ser uma string",
		"any.required": "Telefone é obrigatório",
		"string.empty": "Telefone é obrigatório",
		"string.length": "Telefone deve no mínimo ter 11 caracteres",
	}),

	status: joi.boolean().required().messages({
		"boolean.base": "Status do cliente deve ser um boolean",
		"any.required": "Status é obrigatório",
		"string.empty": "Status é obrigatório",
	})
});

module.exports = schemaRegisterCostumer;
