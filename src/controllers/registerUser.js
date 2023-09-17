const bcrypt = require("bcrypt");
const knex = require("../database/connection/connection");

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await knex("users").where({ email }).first();

		if (existingUser) {
			return res.status(400).json({ message: "E-mail já cadastrado." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await knex("users").insert({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({ message: "Usuário cadastrado com sucesso." });
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = registerUser;
