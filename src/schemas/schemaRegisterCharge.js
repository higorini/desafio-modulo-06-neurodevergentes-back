const joi = require("joi");

const schemaRegisterCharge = joi.object({ 
    costumer_name: joi.string().required().messages({
		"any.required": "Nome do cliente é obrigatório",
		"string.empty": "Nome do cliente não pode ser vazio",
        "string.base": "O Nome deve ser uma string"
	}),

    description: joi.string().required().messages({
        "string.base": "A descrição deve ser uma string",
		"any.required": "A descrição é obrigatória",
		"string.empty": "A descrição nao pode ser vazia"
    }),

    status: joi.string().required().messages({
		"string.base": "Status deve ser uma string",
		"any.required": "Status é obrigatório",
		"string.empty": "Status não pode ser vazio",
	}),

    value: joi.number().integer().required().messages({
        "number.base":"O valor precisa ser um número inteiro",
        "any.required":"O valor é obrigatório"
    }),

    charge_date: joi.date().required().messages({
        "date.base": "Formato de data inválido",
        "date.format": "Formato de data inválido",
        "any.required":"A data é obrigatória"
    })
});

module.exports = schemaRegisterCharge;