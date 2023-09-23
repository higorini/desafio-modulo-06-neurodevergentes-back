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
			.orWhere({ phone })
			.first();

		const response = {};

		if (existingCustomer) {
			if (existingCustomer.email === newEmail) {
				response.email = "E-mail já está cadastrado.";
			}

			if (existingCustomer.cpf === cpf) {
				response.cpf = "CPF já está cadastrado.";
			}

			if (existingCustomer.phone === phone) {
				response.phone = "Telefone já está cadastrado.";
			}

			return res
				.status(400)
				.json({ message: "Campos já estão cadastrados.", fields: response });
		}

		const newCustomer = await knex("costumers")
			.insert({
				user_id: req.user.id,
				email: newEmail,
				phone,
				status: "Em dia",
				...otherData,
			})
			.returning("*");

		return res.status(201).json(newCustomer[0]);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerCostumer;
