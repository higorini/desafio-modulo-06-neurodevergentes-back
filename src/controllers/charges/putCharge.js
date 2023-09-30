const trimFields = require("../../utils/trimSpaces");
const knex = require("../../database/connection/connection");
const {
	isValidCustomerForCharge,
	isValidCharge,
} = require("../../utils/commonFunctionsCharges");

const updateCharge = async (req, res) => {
	try {
		const { chargeId } = req.params;
		const formattedFields = trimFields(req.body);

		const isValid = await isValidCharge(chargeId);

		if (!isValid) {
			return res.status(404).json({ message: "Cobrança não encontrada." });
		}

		const isValidCustomer = await isValidCustomerForCharge(
			isValid,
			req.user.id
		);

		if (!isValidCustomer) {
			return res.status(400).json({ message: "Cliente inválido." });
		}

		const updatedCharge = await knex("charges")
			.where({ id: chargeId })
			.update({ ...formattedFields })
			.returning("*");

		return res.json(updatedCharge[0]);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = updateCharge;
