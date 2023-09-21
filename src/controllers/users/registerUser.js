const bcrypt = require("bcrypt");
const knex = require("../../database/connection/connection");

const registerUser = async (req, res) => {
	try {
		const { email, name, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		await knex("users").insert({ name, email, password: hashedPassword });

		res.status(201).json({ message: "Usuário cadastrado com sucesso." });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ocorreu um erro interno ao cadastrar usuário." });
	}
};

module.exports = registerUser ;
