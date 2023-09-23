const knex = require("../../database/connection/connection");

const getCostumersAndCharges = async (req, res) => {
	try {
		const { costumerId } = req.params;
		const { id: userId } = req.user;

		const customerData = await getCustomerData(costumerId, userId);
		if (!customerData) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const charges = await getChargesForCustomer(costumerId);

		const formattedData = formatData(customerData, charges);

		return res.json(formattedData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

const getCustomerData = async (customerId, userId) => {
	return await knex("costumers")
		.select("*")
		.where({ id: customerId, user_id: userId })
		.first();
};

const getChargesForCustomer = async (customerId) => {
	return await knex("charges").select("*").where({ costumer_id: customerId });
};

const formatData = (customerData, charges) => {
	const formattedData = {
		personalData: {
			id: customerData.id,
			name: customerData.name,
			email: customerData.email,
			cpf: customerData.cpf,
			phone: customerData.phone,
			status: customerData.status,
			address: {
				cep: customerData.cep,
				public_place: customerData.public_place,
				complement: customerData.complement,
				neighborhood: customerData.neighborhood,
				city: customerData.city,
				state: customerData.state,
			},
		},
		charges: charges.map((charge) => ({
			id: charge.id,
			customer_name: customerData.name,
			description: charge.description,
			value: charge.value,
			status: charge.charge_status,
			maturity: charge.maturity,
		})),
	};

	return formattedData;
};

module.exports = getCostumersAndCharges;
