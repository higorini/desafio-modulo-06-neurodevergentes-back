const joi = require("joi");

const schemaValidateCostumer = joi.object({
	phone: joi.string().required().messages({
		"any.required": "Telefone é obrigatório",
		"string.empty": "Telefone é obrigatório",
		"string.length": "Telefone deve ter 15 caracteres",
	}),
	status: joi.string().required().messages({
		"any.required": "Status é obrigatório",
		"string.empty": "Status é obrigatório",
	}),
	cpf: joi.string().length(11).required().messages({
		"any.required": "CPF é obrigatório",
		"string.empty": "CPF é obrigatório",
		"string.length": "CPF deve ter 11 caracteres",
	}),
});

module.exports = schemaValidateCostumer;
