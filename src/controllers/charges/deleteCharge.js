const {
	isValidCharge,
	isValidCustomerForCharge,
} = require("../../utils/commonFunctionsCharges");
const knex = require("../../database/connection/connection");

const deleteCharge = async (req, res) => {
	try {
		const { chargeId } = req.params;

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

		await knex("charges").where({ id: chargeId }).del();

		return res.status(204).json();
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = deleteCharge;
