const knex = require("../../database/connection/connection");

const getCostumersAndCharges = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user;
		const costumer = await getCostumersById(costumerId, userId);
		if (!costumer) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const charges = await getChargesByCostumersId(costumerId);

		const formattedData = formatData(costumer, charges);

		return res.json(formattedData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

const getCostumersById = async (costumerId, userId) => {
	return await knex("costumers")
		.where({ id: costumerId, user_id: userId })
		.first();
};

const getChargesByCostumersId = async (costumerId) => {
	return await knex("charges").where({ costumer_id: costumerId });
};

const formatData = (costumer, charges) => {
	return {
		personalData: {
			id: costumer.id,
			name: costumer.name,
			email: costumer.email,
			cpf: costumer.cpf,
			phone: costumer.phone,
			address: {
				cep: costumer.cep,
				public_place: costumer.public_place,
				complement: costumer.complement,
				neighborhood: costumer.neighborhood,
				city: costumer.city,
				state: costumer.state,
			},
			status: costumer.status,
		},
		charges: charges.map((charge) => ({
			id: charge.id,
			costumer_name: costumer.name,
			description: charge.description,
			value: charge.value,
			status: charge.status,
			maturity: charge.maturity,
		})),
	};
};

module.exports = getCostumersAndCharges;
