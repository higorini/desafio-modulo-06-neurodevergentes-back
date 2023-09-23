const joi = require("joi");

const schemaRegisterCostumer = joi.object({
	name: joi.string().trim().required().messages({
		"any.required": "Nome é obrigatório",
		"string.empty": "Nome não pode ser vazio",
		"string.base": "O Nome deve ser uma string",
	}),

	email: joi.string().trim().email().required().messages({
		"any.required": "E-mail é obrigatório",
		"string.empty": "E-mail não pode ser vazio",
		"string.base": "E-mail deve ser uma string",
		"string.email": "Por favor, forneça um endereço de e-mail válido.",
	}),

	cpf: joi.string().trim().min(11).required().messages({
		"any.required": "CPF é obrigatório",
		"string.empty": "CPF não pode ser vazio",
		"string.base": "O CPF deve ser uma string",
		"string.min": "O CPF deve conter no mínimo 11 dígitos",
	}),

	phone: joi.string().trim().min(11).required().messages({
		"any.required": "Telefone é obrigatório",
		"string.empty": "Telefone não pode ser vazio",
		"string.base": "O Telefone deve ser uma string",
		"string.length": "Telefone deve ter no mínimo 11 caracteres",
	}),

	cep: joi.string().trim().allow("").optional(),
	public_place: joi.string().trim().allow("").optional(),
	complement: joi.string().trim().allow("").optional(),
	neighborhood: joi.string().trim().allow("").optional(),
	city: joi.string().trim().allow("").optional(),
	state: joi.string().trim().allow("").optional(),
	status: joi.string().trim().allow("").optional(),
});

module.exports = schemaRegisterCostumer;
