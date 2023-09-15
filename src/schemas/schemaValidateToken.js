const joi = require("joi");

const schemaValidateToken = joi.object({
	token: joi.string().required().messages({
		"string.base": "O token deve ser uma string.",
		"string.empty": "Token não fornecido",
		"any.required": "Token não fornecido",
	}),
});

module.exports = schemaValidateToken;
