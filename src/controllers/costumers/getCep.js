const api = require("../../services/apiCorreios");

const getCep = async (req, res) => {
	const { cep } = req.body;

	const cepClean = cep.split('').map((number) =>  {
		if (!isNaN(number)) return number;
	});

	try {
		const response = await api.get(`${cepClean.join('')}/json/`);

		return res
		.status(200).json({
			cep: response.data.cep,
			public_place: response.data.logradouro,
			complement: response.data.complemento,
			neighborhood: response.data.bairro,
			city: response.data.localidade,
			state: response.data.uf
		});
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

module.exports = getCep;
