const knex = require("../database/connection");

const editUser = async (req, res) => {
	try {
		let { name, email, password, cpf, phone } = req.body;
		const { id } = req.user;

		const existingUser = await knex("users").where({ email }).first();

		if (existingUser && existingUser.id !== id) {
			return res
				.status(400)
				.json({ message: "E-mail já cadastrado para outro usuário." });
		}
		if (password) {
			password = await bcrypt.hash(password, 10);
		}

		await knex("users").where({ id }).update({
			name,
			email,
			password,
			cpf,
			phone,
		});

		return res
			.status(200)
			.json({ message: "Dados do usuário atualizados com sucesso." });
	} catch (erro) {
		console.log(erro);
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = editUser;
