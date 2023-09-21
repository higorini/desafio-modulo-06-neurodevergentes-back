const joi = require("joi");

const validateCharge = joi.object({
    description: joi.string().required().messages({
        "string.base": "A descrição deve ser uma string",
		"any.required": "O descrição é obrigatória",
		"string.empty": "O descrição é obrigatória"
    }),

    value: joi.number().integer().required().messages({
        "number.base":"O valor precisa ser um número inteiro",
        "any.required":"O valor é obrigatório"
    }),

    status: joi.number().integer().max(3).required().messages({
        "number.base":"O status precisa ser um número inteiro",
        "number.max":"O numero máximo deve ser 3",
        "any.required":"O status é obrigatório"
    }),

    maturity: joi.date().required().messages({
        "date.base": "Formato de data inválido",
        "date.format": "Formato de data inválido",
        "any.required":"O status é obrigatório"
    })
});

module.exports = validateCharge;