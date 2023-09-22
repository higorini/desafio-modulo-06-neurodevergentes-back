const knex = require("../../database/connection/connection");

const getCostumersAndCharges = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user;

		const data = await knex("costumers")
			.join("charges", "costumers.id", "=", "charges.costumer_id")
			.select("*")
			.where("costumers.id", costumerId)
			.andWhere("costumers.user_id", userId);

		if (data.length === 0) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const formattedData = formatData(data);

		return res.json(formattedData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

const formatData = (data) => {
	const formattedData = {
		personalData: {
			id: data[0].costumer_id,
			name: data[0].name,
			email: data[0].email,
			cpf: data[0].cpf,
			phone: data[0].phone,
			status: data[0].status,
			address: {
				cep: data[0].cep,
				public_place: data[0].public_place,
				complement: data[0].complement,
				neighborhood: data[0].neighborhood,
				city: data[0].city,
				state: data[0].state,
			},
		},
		charges: data.map((row) => ({
			id: row.charge_id,
			customer_name: row.name,
			description: row.description,
			value: row.value,
			status: row.charge_status,
			maturity: row.maturity,
		})),
	};

	return formattedData;
};

module.exports = getCostumersAndCharges;
