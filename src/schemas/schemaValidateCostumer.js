const joi = require("joi");

const schemaValidateCostumer = joi.object({
	phone: joi.string().required().messages({
		"string.base": "O telefone deve ser uma string",
		"any.required": "Telefone é obrigatório",
		"string.empty": "Telefone é obrigatório",
		"string.length": "Telefone deve ter 15 caracteres",
	}),
	status: joi.string().required().messages({
		"string.base": "Status do cliente deve ser uma string",
		"any.required": "Status é obrigatório",
		"string.empty": "Status é obrigatório",
	}),
	cpf: joi.string().length(11).required().messages({
		"string.base": "O cpf deve ser uma string",
		"any.required": "CPF é obrigatório",
		"string.empty": "CPF é obrigatório",
		"string.length": "CPF deve ter 11 caracteres",
	}),
});

module.exports = schemaValidateCostumer;
