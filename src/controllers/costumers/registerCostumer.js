const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");
const trimFields = require("../../utils/trimSpaces");

const registerCostumer = async (req, res) => {
	try {
		const { email, cpf, phone, ...otherData } = req.body;
		const newEmail = email.toLowerCase();

		otherData.name = capitalizeFullName(otherData.name);
		const existingCustomer = await knex("costumers")
			.where({ email: newEmail })
			.orWhere({ cpf })
			.first();

		const existingPhone = await knex("costumers").where({ phone }).first();

		if (existingCustomer) {
			return res.status(400).json({ message: "Email ou cpf ja cadastrados." });
		}

		if (existingPhone) {
			return res.status(400).json({ message: "Telefone já cadastrado." });
		}

		const newCustomer = await knex("costumers")
			.insert({
				user_id: req.user.id,
				email: newEmail,
				cpf,
				phone,
				...otherData,
			})
			.returning("*");

		return res.status(201).json(newCustomer[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerCostumer;
