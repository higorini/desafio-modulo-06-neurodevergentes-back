const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../database/connection");
const senhaHash = require("../utils/senhaHash");

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await knex("funcionarios").where({ email }).first();

		if (!user) {
			return res.status(401).json({ message: "Email ou senha incorretos." });
		}

		const passwordMatch = await bcrypt.compare(password, user.senha);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Email ou senha incorretos." });
		}
		console.log(user.id);
		const token = jwt.sign({ id: user.id }, senhaHash, {
			expiresIn: "8h",
		});

		res.status(200).json({ message: "Login bem-sucedido.", token });
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = loginUser;
