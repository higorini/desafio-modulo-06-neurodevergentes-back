const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");
const trimFields = require("../../utils/trimSpaces");
const validateCustomer = require("../../utils/checkExistingData");

const getUpdatedCustomer = async (customerId) => {
	return await knex("costumers").where({ id: customerId }).first();
};

const updateCustomerData = async (customerId, updateFields, userId) => {
	return await knex("costumers")
		.where({ id: customerId, user_id: userId })
		.update(updateFields);
};

const getAddressData = (data) => {
	const fields = [
		"cep",
		"public_place",
		"complement",
		"neighborhood",
		"city",
		"state",
	];
	const address = {};

	fields.forEach((field) => {
		address[field] = data[field] ? data[field].trim() : null;
	});

	return address;
};

const buildResponse = (customer) => {
	return {
		id: customer.id,
		user_id: customer.user_id,
		name: customer.name,
		email: customer.email,
		cpf: customer.cpf,
		phone: customer.phone,
		status: customer.status,
		address: getAddressData(customer),
	};
};

const updateCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		const { email, phone, cpf, name, ...customerData } = trimFields(req.body);

		const newName = capitalizeFullName(name);
		const newEmail = email.toLowerCase();

		const updatedData = await getUpdatedCustomer(customerId);

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
			...getAddressData(req.body),
		};

		await updateCustomerData(customerId, updateFields, req.user.id);

		const updatedCustomer = await getUpdatedCustomer(customerId);
		const response = buildResponse(updatedCustomer);

		return res.json(response);
	} catch (error) {
		res.status(500).json({ message: error.message});
	}
};

module.exports = updateCustomer;
