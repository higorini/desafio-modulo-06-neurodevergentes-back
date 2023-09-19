const bcrypt = require("bcrypt");
const knex = require("../../database/connection/connection");
const {
	schemaValidateEmail,
	schemaValidateName,
} = require("../../schemas/schemaValidateUser");

const validateEmail = async (req, res) => {
	try {
		let { email, name } = req.body;

		email = email.toLowerCase();

		await schemaValidateEmail.validateAsync({ email });

		const existingUser = await knex("users").where({ email }).first();

		if (existingUser) {
			return res
				.status(400)
				.json({ message: "E-mail já cadastrado para outro usuário." });
		}

		res.json({ message: "E-mail disponível para cadastro." });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const registerUser = async (req, res) => {
	try {
		let { email, name, password } = req.body;
		if (!email || !name || !password)
			return res
				.status(400)
				.json({ message: "Todos os campos são obrigatórios" });

		email = email.toLowerCase();

		const hashedPassword = await bcrypt.hash(password, 10);

		await knex("users").insert({ name, email, password: hashedPassword });

		res.status(201).json({ message: "Usuário cadastrado com sucesso." });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ocorreu um erro interno ao cadastrar usuário." });
	}
};

module.exports = { registerUser, validateEmail };
