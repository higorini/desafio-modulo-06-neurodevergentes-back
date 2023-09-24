const updateStatusCostumer = require("../../utils/updateStatusCostumer");
const { getAllCustomers } = require("../../utils/customersConsults");

const getCustomers = async (req, res) => {
	try {
		const { id } = req.user;

		await updateStatusCostumer(id);

		const allCustomers = await getAllCustomers(id);

		return res.status(200).json(allCustomers);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = getCustomers; 