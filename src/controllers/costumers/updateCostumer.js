const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");

const updateCostumer = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user;
		let costumerData = req.body;

		costumerData.name = capitalizeFullName(costumerData.name);
		costumerData.status = capitalizeFullName(costumerData.status);

		costumerData.email = costumerData.email.toLowerCase();

		const validationMessages = await validateAndUpdateCostumer(
			costumerId,
			userId,
			costumerData
		);

		if (validationMessages.email) {
			return res.status(400).json({ message: validationMessages.email });
		}

		if (validationMessages.cpf) {
			return res.status(400).json({ message: validationMessages.cpf });
		}

		const updatedData = await getCostumerById(costumerId);

		if (!updatedData) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const formattedData = formatCostumerData(updatedData);

		return res.json(formattedData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

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

const getCostumerById = async (costumerId) => {
	return await knex("costumers").where({ id: costumerId }).first();
};

const formatCostumerData = (costumerData) => {
	return {
		id: costumerData.id,
		user_id: costumerData.user_id,
		name: costumerData.name,
		email: costumerData.email,
		cpf: costumerData.cpf,
		phone: costumerData.phone,
		address: {
			cep: costumerData.cep,
			public_place: costumerData.public_place,
			complement: costumerData.complement,
			neighborhood: costumerData.neighborhood,
			city: costumerData.city,
			state: costumerData.state,
		},
		status: costumerData.status,
	};
};

module.exports = updateCostumer;
