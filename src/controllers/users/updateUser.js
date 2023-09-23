const knex = require("../../database/connection/connection");
const bcrypt = require("bcrypt");
const trimFields = require("../../utils/trimSpaces");
const capitalizeFullName = require("../../utils/capitalizeName");

const editUser = async (req, res) => {
	try {
		const { name, email, password, cpf, phone } = trimFields(req.body);
		const { id } = req.user;

		const existingUserWithEmail = await knex("users")
			.where({ email })
			.whereNot({ id })
			.first();

		if (existingUserWithEmail) {
			return res
				.status(400)
				.json({ message: "E-mail já cadastrado para outro usuário." });
		}

		const existingUserWithCpf = await knex("users")
			.where({ cpf })
			.whereNot({ id })
			.first();

		if (existingUserWithCpf) {
			return res
				.status(400)
				.json({ message: "CPF já cadastrado para outro usuário." });
		}

		const cpfValue = cpf !== "" ? cpf : null;
		const phoneValue = phone !== "" ? phone : null;
		const newName = capitalizeFullName(name);

		const updateData = {
			name: newName,
			email,
			cpf: cpfValue,
			phone: phoneValue,
		};

		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}

		await knex("users").where({ id }).update(updateData);

		return res.json({ message: "Dados do usuário atualizados com sucesso." });
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};

module.exports = editUser;
