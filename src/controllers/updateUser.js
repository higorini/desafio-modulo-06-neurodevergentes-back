const editUser = async (req, res) => {
	try {
		let { name, email, password, cpf, telephone } = req.body;
		const { id } = req.user;

		const existingUser = await knex("funcionarios").where({ email }).first();

		if (existingUser && existingUser.id !== id) {
			return res
				.status(400)
				.json({ message: "E-mail já cadastrado para outro usuário." });
		}
		if (password) {
			password = await bcrypt.hash(password, 10);
		}

		await knex("funcionarios").where({ id }).update({
			nome: name,
			email,
			senha: password,
			cpf,
			telefone: telephone,
		});

		res
			.status(200)
			.json({ message: "Dados do usuário atualizados com sucesso." });
	} catch (erro) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = editUser;
