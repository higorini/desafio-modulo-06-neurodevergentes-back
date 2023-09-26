const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");
const trimFields = require("../../utils/trimSpaces");
const validateCustomer = require("../../utils/checkExistingData");

const updateCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		const { email, phone, cpf, name, ...customerData } = trimFields(req.body);

		const newName = capitalizeFullName(name);
		const newEmail = email.toLowerCase();

		const updatedData = await knex("costumers")
			.where({ id: customerId })
			.first();

		if (!updatedData) {
			return res.status(404).json({ message: "Cliente não encontrado." });
		}

		const validationErrors = await validateCustomer(
			newEmail,
			cpf,
			phone,
			customerId
		);

		if (validationErrors) return res.status(400).json(validationErrors);

		const updateFields = {
			id: customerId,
			email: newEmail,
			name: newName,
			phone,
			cpf,
			...customerData,
		};

		await knex("costumers")
			.where({ id: customerId, user_id: req.user.id })
			.update(updateFields);

		const updatedCustomer = await knex("costumers")
			.where({ id: customerId })
			.first();

		const response = {
			id: updatedCustomer.id,
			user_id: updatedCustomer.user_id,
			name: updatedCustomer.name,
			email: updatedCustomer.email,
			cpf: updatedCustomer.cpf,
			phone: updatedCustomer.phone,
			status: updatedCustomer.status,
			address: {
				cep: updatedCustomer.cep,
				public_place: updatedCustomer.public_place,
				complement: updatedCustomer.complement,
				neighborhood: updatedCustomer.neighborhood,
				city: updatedCustomer.city,
				state: updatedCustomer.state,
			},
		};

		return res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = updateCustomer;
