const api = require("../../services/apiCorreios");

const getCep = async (req, res) => {
	const { cep } = req.body;
	try {
		const response = await api.get(`${cep}/json/`);
		return res.json(response.data);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

module.exports = getCep;
