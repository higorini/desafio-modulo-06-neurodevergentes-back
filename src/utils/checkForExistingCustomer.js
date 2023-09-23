const knex = require("../database/connection/connection");

const validateAndUpdateCostumer = async (costumerId, userId, costumerData) => {
	const { email, cpf } = costumerData;

	const validationMessages = {};

	const isEmailInvalid = await checkForExistingEmail(email, costumerId);
	const isCpfInvalid = await checkForExistingCpf(cpf, costumerId);

	if (isEmailInvalid) {
		validationMessages.email = "O e-mail já está em uso.";
	}

	if (isCpfInvalid) {
		validationMessages.cpf = "O CPF já está em uso.";
	}

	if (!isEmailInvalid && !isCpfInvalid) {
		await knex("costumers")
			.where({ id: costumerId, user_id: userId })
			.update(costumerData);
	}

	return validationMessages;
};

const checkForExistingEmail = async (email, costumerId) => {
	const existingEmail = await knex("costumers")
		.where({ email })
		.andWhereNot({ id: costumerId })
		.first();

	return existingEmail;
};

const checkForExistingCpf = async (cpf, costumerId) => {
	const existingCpf = await knex("costumers")
		.where({ cpf })
		.andWhereNot({ id: costumerId })
		.first();

	return existingCpf;
};

module.exports = validateAndUpdateCostumer;
