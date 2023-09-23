const knex = require("../../database/connection/connection");
const validateAndUpdateCostumer = require("../../utils/checkForExistingCustomer");
const capitalizeFullName = require("../../utils/capitalizeName");
const trimFields = require("../../utils/trimSpaces");

const updateCostumer = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user;
		let costumerData = trimFields(req.body);

		costumerData.name = capitalizeFullName(costumerData.name);

		costumerData.email = costumerData.email.toLowerCase();

		const existingPhone = await knex("costumers")
			.where({ phone: costumerData.phone })
			.whereNot({ id: costumerId })
			.first();

		if (existingPhone) {
			return res.status(400).json({ message: "Telefone já cadastrado." });
		}

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
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
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
		status: costumerData.status,
		address: {
			cep: costumerData.cep,
			public_place: costumerData.public_place,
			complement: costumerData.complement,
			neighborhood: costumerData.neighborhood,
			city: costumerData.city,
			state: costumerData.state,
		},
	};
};

module.exports = updateCostumer;
