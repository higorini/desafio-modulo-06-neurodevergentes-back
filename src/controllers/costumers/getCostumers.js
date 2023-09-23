const knex = require("../../database/connection/connection");

const getCostumers = async (req, res) => {
	try {
		const { id } = req.user;

		const costumersInadimplentes = await knex('costumers')
			.select(
				'costumers.id as costumer_id',
				'costumers.name as costumer_name',
				'costumers.cpf as costumer_cpf',
				'costumers.email as costumer_email',
				'costumers.phone as costumer_phone',
				'costumers.status as costumer_status',
				'charges.id as charge_id',
				'charges.status as charge_status',
				'charges.charge_date as charge_date'
			)
			.join('charges', 'costumers.id', '=', 'charges.costumer_id')
			.where('charges.charge_date', '<', knex.raw('NOW()'))
			.andWhere('charges.status', '=', 'Pendente')
			.andWhere('costumers.user_id', '=', id);

		for (const costumer of costumersInadimplentes) {
			const costumer_id = costumer.costumer_id;
			await knex('costumers').where('id', costumer_id).update('status', 'Inadimplente');
		}

		const costumersEmDia = await knex('costumers')
			.select("*")
			.whereNotIn('id', costumersInadimplentes.map(costumer => costumer.costumer_id));

		for (const costumer of costumersEmDia) {
			const costumer_id = costumer.id;
			await knex('costumers').where('id', costumer_id).update('status', 'Em dia');
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