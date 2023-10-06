const knex = require("../../database/connection/connection");

const getCostumersAndCharges = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user; 

		const costumerData = await getCostumerData(costumerId, userId);

		if (!costumerData) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const charges = await getChargesForCostumer(costumerId);

		const formattedData = formatData(costumerData, charges);

		return res.json(formattedData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

const getCostumerData = async (costumerId, userId) => {
	return await knex("costumers")
		.select("*")
		.where({ id: costumerId, user_id: userId })
		.first();
};

const getChargesForCostumer = async (costumerId) => {
	return await knex("charges").select("*").where({ costumer_id: costumerId });
};

const formatData = (costumerData, charges) => {
	const formattedData = {
		personalData: {
			id: costumerData.id,
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
		},
		charges: charges.map((charge) => ({
			id: charge.id,
			costumer_name: costumerData.name,
			description: charge.description,
			value: charge.value,
			status: charge.status,
			charge_date: charge.charge_date,
		})),
	};

	return formattedData;
};

module.exports = getCostumersAndCharges;
