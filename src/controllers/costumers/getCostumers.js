const knex = require("../../database/connection/connection");

const getCostumers = async (req, res) => {
	try {
		const { id } = req.user;

		const costumersInadimplentes = await knex('costumers')
			.select(
				'costumers.id as costumer_id',
				'costumers.user_id as costumer_user_id',
				'costumers.email as costumer_user_email',
				'costumers.status as costumer_status',
				'charges.id as charge_id',
				'charges.costumer_id as charge_costumer_id',
				'charges.costumer_name as charge_costumer_name',
				'charges.status as charge_status',
				'charges.charge_date as charge_date'
			)
			.join('charges', 'costumers.id', '=', 'charges.costumer_id')
			.where('charges.charge_date', '<', knex.raw('NOW()'))
			.andWhere('charges.status', '=', 'Pendente')
			.andWhere('costumers.user_id', '=', 34);

		for (const costumer of costumersInadimplentes) {
			const costumer_id = costumer.costumer_id;
			await knex('costumers').where('id', costumer_id).update('status', 'Inadimplente');
		}

		const allCostumers = await knex("costumers").where("user_id", id);


		// const usersData = customers.map(
		// 	({
		// 		password,
		// 		cep,
		// 		public_place,
		// 		complement,
		// 		neighborhood,
		// 		city,
		// 		state,
		// 		...userData
		// 	}) => {
		// 		const address = {
		// 			cep,
		// 			public_place,
		// 			complement,
		// 			neighborhood,
		// 			city,
		// 			state,
		// 		};
		// 		return {
		// 			...userData,
		// 			address,
		// 		};
		// 	}
		// );

		// const userData = customers.map(({ id, user_id, name, cpf, email, phone, status }) => {
		// 	return {
		// 		id,
		// 		user_id,
		// 		name,
		// 		cpf,
		// 		email,
		// 		phone,
		// 		status
		// 	}
		// })

		return res.status(200).json(allCostumers);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = getCostumers;

// SELECT *
// FROM customers
// INNER JOIN charges ON customers.id = charges.customer_id
// WHERE charges.data_vencimento < CURRENT_DATE;