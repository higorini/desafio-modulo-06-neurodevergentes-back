const knex = require("../../database/connection/connection");
const bcrypt = require("bcrypt");
const capitalizeFullName = require("../../utils/capitalizeName");

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
		const newName = capitalizeFullName(name);

		const updateData = { name: newName, email, cpf, phone };

		password && (updateData.password = await bcrypt.hash(password, 10));

		await knex("users").where({ id }).update(updateData);

		return res.json({ message: "Dados do usuário atualizados com sucesso." });
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = editUser;
