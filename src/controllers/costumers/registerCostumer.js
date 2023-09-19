const knex = require("../../database/connection/connection");

const registerCostumer = async (req, res) => {
	const {
		name,
		email,
		cpf,
		phone,
		cep,
		public_place,
		complement,
		neighborhood,
		city,
		state,
		status,
	} = req.body;

	const { id } = req.user;
	try {
		const costumer = await knex("costumers").where({ email }).first();

		if (costumer)
			return res.status(400).json({ message: "Cliente já cadastrado." });

		const newCostumer = await knex("costumers")
			.insert({
				user_id: id,
				name,
				email,
				cpf,
				phone,
				cep,
				public_place,
				complement,
				neighborhood,
				city,
				state,
				status,
			})
			.returning("*");

		return res.status(201).json(newCostumer[0]);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerCostumer;
