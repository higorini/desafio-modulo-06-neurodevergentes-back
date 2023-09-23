const knex = require("../../database/connection/connection");

const getCostumers = async (req, res) => {
	try {
		const { id } = req.user;

		const customers = await knex("costumers").where({ user_id: id });

		const usersData = customers.map(
			({
				password,
				cep,
				public_place,
				complement,
				neighborhood,
				city,
				state,
				...userData
			}) => {
				const address = {
					cep,
					public_place,
					complement,
					neighborhood,
					city,
					state,
				};
				return {
					...userData,
					address,
				};
			}
		);

		return res.status(200).json(usersData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = getCostumers;
