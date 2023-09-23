const joi = require("joi");

const schemaRegisterCostumer = joi.object({
	name: joi.string().required().trim().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome é obrigatório",
		"string.base": "O Nome deve ser uma string",
	}),

	email: joi.string().email().required().trim().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail é obrigatório",
		"string.base": "O Nome deve ser uma string",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),

	cpf: joi.string().required().min(11).trim().messages({
		"any.required": "CPF é obrigatório",
		"string.empty": "CPF é obrigatório",
		"string.base": "O CPF deve ser uma string",
		"string.min": "O CPF deve conter no mínimo 11 dígitos",
	}),

	phone: joi.string().required().min(11).trim().messages({
		"string.base": "O Telefone deve ser uma string",
		"any.required": "Telefone é obrigatório",
		"string.empty": "Telefone é obrigatório",
		"string.length": "Telefone deve no mínimo ter 11 caracteres",
	}),
	cep: joi.string().optional().trim(),
	public_place: joi.string().allow("").optional().trim(),
	complement: joi.string().allow("").optional().trim(),
	neighborhood: joi.string().allow("").optional().trim(),
	city: joi.string().allow("").optional().trim(),
	state: joi.string().allow("").optional().trim(),
	status: joi.string().allow("").optional().trim(),
});

module.exports = schemaRegisterCostumer;
