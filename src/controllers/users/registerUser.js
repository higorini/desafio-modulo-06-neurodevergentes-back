const bcrypt = require("bcrypt");
const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");

const registerUser = async (req, res) => {
	try {
		const { email, name, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newName = capitalizeFullName(name);

		await knex("users").insert({
			name: newName,
			email,
			password: hashedPassword,
		});

		res.status(201).json({ message: "Usuário cadastrado com sucesso." });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ocorreu um erro interno ao cadastrar usuário." });
	}
};

module.exports = registerUser;
