const joi = require("joi");

const schemaUpdateCustomer = joi.object({
	name: joi.string().trim().empty("").required().messages({
		"any.required": "O nome é um campo obrigatório.",
		"string.base": "O nome deve ser uma string.",
		"string.empty": "O nome não pode estar vazio.",
	}),
	email: joi.string().trim().empty("").email().required().messages({
		"any.required": "O email é um campo obrigatório.",
		"string.email": "O email deve ser um endereço de email válido.",
		"string.empty": "O email não pode estar vazio.",
	}),
	cpf: joi
		.string()
		.trim()
		.empty("")
		.pattern(/^\d{11}$/)
		.required()
		.messages({
			"any.required": "O CPF é um campo obrigatório.",
			"string.pattern.base":
				"O CPF deve conter exatamente 11 dígitos numéricos.",
			"string.empty": "O CPF não pode estar vazio.",
		}),
	phone: joi.string().trim().empty("").required().messages({
		"any.required": "O telefone é um campo obrigatório.",
		"string.base": "O telefone deve ser uma string.",
		"string.empty": "O telefone não pode estar vazio.",
	}),
	cep: joi
		.string()
		.trim()
		.empty("")
		.pattern(/^\d{8}$/)
		.allow(null)
		.optional()
		.messages({
			"string.pattern.base":
				"O CEP deve conter exatamente 8 dígitos numéricos.",
		}),
	public_place: joi.string().trim().empty("").allow(null).optional(),
	complement: joi.string().trim().empty("").allow(null).optional(),
	neighborhood: joi.string().trim().empty("").allow(null).optional(),
	city: joi.string().trim().empty("").allow(null).optional(),
	state: joi.string().trim().empty("").allow(null).optional(), 
});

module.exports = schemaUpdateCustomer;
