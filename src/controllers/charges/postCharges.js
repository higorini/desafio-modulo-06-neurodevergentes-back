const knex = require("../../database/connection/connection");
const trimFields = require("../../utils/trimSpaces");
const capitalizeFullName = require("../../utils/capitalizeName");
const updateStatusCostumer  = require("../../utils/updateStatusCostumer");
const updateStatusCharge = require("../../utils/updateStatusCharge");

const postCharges = async (req, res) => {
	const { idCostumer } = req.params;
	const { id: userId } = req.user;
	const formattedFiels = trimFields(req.body);

	try {
		const costumer = await knex("costumers")
			.where({ id: idCostumer, user_id: userId })
			.first();

		if (!costumer) {
			return res.status(404).json({
				message: "Cliente não encontrado ou não pertence ao usuário logado!",
			});
		}

		formattedFiels.costumer_name = capitalizeFullName(
			formattedFiels.costumer_name
		);

		const newCharge = await knex("charges")
			.insert({
				costumer_id: idCostumer,
				...formattedFiels,
			})
			.returning("*");
		
		await updateStatusCharge(userId);
		await updateStatusCostumer(userId);

		return res.status(200).json(newCharge[0]);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = postCharges;
