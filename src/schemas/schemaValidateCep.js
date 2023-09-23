const joi = require("joi");

const schemaValidateCep = joi.object({
	cep: joi
		.string()
		.trim()
		.required()
		.pattern(/^\d{8}$/)
		.messages({
			"string.pattern.base":
				"O CEP deve conter exatamente 8 dígitos numéricos.",
			"any.required": "O Cep é obrigatório",
			"string.empty": "O Cep é obrigatório",
		}),
});

module.exports = schemaValidateCep;
