const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../../database/connection/connection");
const senhaHash = require("../../utils/senhaHash");

const loginUser = async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.toLowerCase();

		const user = await knex("users").where({ email }).first();

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Email ou senha incorretos." });
		}

		const token = jwt.sign({ id: user.id }, senhaHash, {
			expiresIn: "8h",
		});

		const { password: _, ...userData } = user;

		res.json({ userData, token });
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = loginUser;
