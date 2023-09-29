const knex = require("../database/connection/connection");

const isValidCharge = async (chargeId) => {
	const charge = await knex("charges").where({ id: chargeId }).first();
	return charge;
};

const isValidCustomerForCharge = async (costumer, userId) => {
	const isValidCustomer = await knex("costumers")
		.where({ id: costumer.costumer_id, user_id: userId })
		.first();
	return isValidCustomer;
};

module.exports = {
	isValidCharge,
	isValidCustomerForCharge,
};
