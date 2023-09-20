const apiViaCep = require("../../services/apiViaCep");

const getCostumerCep = async (req, res) => {
	const { cep } = req.params;

	try {
		const cepClean = cep.replace("-", "");

		const { data } = await apiViaCep.get(`${cepClean}/json/`);

		if (data.erro)
			return res.json({ message: "Cep não encontrado na base de dados" });

		const newData = {
			cep: data.cep,
			public_place: data.logradouro,
			complement: data.complemento,
			neighborhood: data.bairro,
			city: data.localidade,
			state: data.uf,
		};

		return res.json(newData);
	} catch (error) {
		return res.status(400).json({ message: "Falha na requisição da api" });
	}
};

module.exports = getCostumerCep;
