const joi = require("joi");

const schemaValidateCep = joi.object({
	cep: joi.string().required().messages({
		"string.base": "O cep deve ser uma string",
		"any.required": "O Cep é obrigatório",
		"string.empty": "O Cep é obrigatório",
	}),
});

module.exports = schemaValidateCep;
