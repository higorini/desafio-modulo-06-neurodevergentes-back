const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");

const registerCostumer = async (req, res) => {
	const costumerData = req.body;

	const { id } = req.user;
	try {
		const newEmail = costumerData.email.toLowerCase();

		const existingCustomer = await knex("costumers")
			.where({ email: newEmail })
			.first();
		const existingCpf = await knex("costumers")
			.where({ cpf: costumerData.cpf })
			.first();

		if (existingCustomer) {
			return res.status(400).json({ message: "Cliente já cadastrado." });
		}

		if (existingCpf) {
			return res.status(400).json({ message: "Cpf já cadastrado" });
		}

		const newName = capitalizeFullName(costumerData.name);

		const newCustomer = await knex("costumers")
			.insert({
				user_id: id,
				name: newName,
				email: newEmail,
				cpf: costumerData.cpf,
				phone: costumerData.phone,
				cep: costumerData.cep,
				public_place: costumerData.public_place,
				complement: costumerData.complement,
				neighborhood: costumerData.neighborhood,
				city: costumerData.city,
				state: costumerData.state,
				status: costumerData.status,
			})
			.returning("*");

		return res.status(201).json(newCustomer[0]);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerCostumer;
