const knex = require("../../database/connection/connection");
const { getCustomersDefaulting, getCustomersUpToDate } = require("../../utils/customersConsuts");

const getCustomers = async (req, res) => {
	try {
		const { id } = req.user;

		const customersDefaulting = await getCustomersDefaulting(id);

		for (const customer of customersDefaulting) {
			const { customer_id } = customer;
			await knex("costumers").where("id", customer_id).update("status", "Inadimplente");
		}

		const customersUpToDate = await getCustomersUpToDate(customersDefaulting);

		for (const customer of customersUpToDate) {
			const { customer_id } = customer;
			await knex("costumers").where("id", customer_id).update("status", "Em dia");
		}

		const allCustomers = await knex("costumers").where("user_id", id).orderBy("status", "desc");

		const customersData = allCustomers.map(({ id, user_id, name, cpf, email, phone, status }) => {
			return {
				id,
				user_id,
				name,
				cpf,
				email,
				phone,
				status
			}
		});

		return res.status(200).json(customersData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = getCustomers;