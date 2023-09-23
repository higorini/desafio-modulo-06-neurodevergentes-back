const registerCostumer = async (req, res) => {
	try {
		const { email, cpf, phone, ...otherData } = req.body;
		const newEmail = email.toLowerCase();

		otherData.name = capitalizeFullName(otherData.name);

		const existingCustomerByEmail = await knex("costumers")
			.where({ email: newEmail })
			.first();

		const existingCustomerByCPF = await knex("costumers")
			.where({ cpf })
			.first();

		const existingPhone = await knex("costumers").where({ phone }).first();

		if (existingCustomerByEmail) {
			return res.status(400).json({ message: "E-mail já cadastrado." });
		}

		if (existingCustomerByCPF) {
			return res.status(400).json({ message: "CPF já cadastrado." });
		}

		if (existingPhone) {
			return res.status(400).json({ message: "Telefone já cadastrado." });
		}

		const newCustomer = await knex("costumers")
			.insert({
				user_id: req.user.id,
				email: newEmail,
				cpf,
				phone,
				status: "Em dia",
				...otherData,
			})
			.returning("*");

		return res.status(201).json(newCustomer[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerCostumer;
