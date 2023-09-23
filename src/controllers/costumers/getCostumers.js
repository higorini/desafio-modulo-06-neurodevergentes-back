const knex = require("../../database/connection/connection");

const getCostumers = async (req, res) => {
	try {
		const { id } = req.user;

		const defaultingCustomers = await knex('costumers')
			.select(
				'costumers.id as costumer_id',
			)
			.join('charges', 'costumers.id', '=', 'charges.costumer_id')
			.where('charges.charge_date', '<', knex.raw('NOW()'))
			.andWhere('charges.status', '=', 'Pendente')
			.andWhere('costumers.user_id', '=', id);

		for (const costumer of defaultingCustomers) {
			const costumer_id = costumer.costumer_id;
			await knex('costumers').where('id', costumer_id).update('status', 'Inadimplente');
		}

		const costumersOK = await knex('costumers')
			.whereNotIn('id', defaultingCustomers.map(costumer => costumer.costumer_id));

		for (const costumer of costumersOK) {
			const costumer_id = costumer.id;
			await knex('costumers').where('id', costumer_id).update('status', 'Em dia');
		}

		const allCostumers = await knex("costumers").where("user_id", id);

		const costumersData = allCostumers.map(({ id, user_id, name, cpf, email, phone, status }) => {
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

		return res.status(200).json(costumersData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = getCostumers;