const knex = require("../database/connection/connection");

const validateCustomer = async (newEmail, cpf, phone, customerId = null) => {
	const existingEmail = await knex("costumers")
		.where({ email: newEmail })
		.first();
	const existingCpf = await knex("costumers").where({ cpf }).first();
	const existingPhone = await knex("costumers").where({ phone }).first();

	const errors = {};

	if (
		existingEmail &&
		(!customerId || existingEmail.id !== Number(customerId))
	) {
		errors.email = "E-mail já está cadastrado.";
	}

	if (existingCpf && (!customerId || existingCpf.id !== Number(customerId))) {
		errors.cpf = "CPF já está cadastrado.";
	}

	if (
		existingPhone &&
		(!customerId || existingPhone.id !== Number(customerId))
	) {
		errors.phone = "Telefone já está cadastrado.";
	}

	return Object.keys(errors).length > 0
		? { message: "Campos já estão cadastrados.", fields: errors }
		: null;
};

module.exports = validateCustomer;
