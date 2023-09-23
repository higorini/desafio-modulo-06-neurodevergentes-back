const knex = require("../../database/connection/connection");
const trimFields = require("../../utils/trimSpaces");
const capitalizeFullName = require("../../utils/capitalizeName");

const postCharges = async (req, res) => {
	const { idCostumer } = req.params;
	const { costumer_name, description, status, charge_date, value } = req.body;
	const newObject = trimFields({
		costumer_name,
		description,
		status,
		charge_date,
	});
	const { id: userId } = req.user;

	try {
		const costumer = await knex("costumers")
			.where({ id: idCostumer, user_id: userId })
			.first();

		if (!costumer) {
			return res.status(404).json({
				message: "Cliente não encontrado ou não pertence ao usuário logado!",
			});
		}
		const newName = capitalizeFullName(costumer_name);

		const newCharge = await knex("charges")
			.insert({
				costumer_id: idCostumer,
				costumer_name: newName,
				...newObject,
				value,
			})
			.returning("*");

		return res.status(200).json(newCharge[0]);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = postCharges;
