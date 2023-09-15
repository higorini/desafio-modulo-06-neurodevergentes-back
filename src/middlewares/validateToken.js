const jwt = require("jsonwebtoken");
const senhaHash = require("../utils/senhaHash");
const schemaValidateToken = require("../schemas/schemaValidateToken");
const knex = require("../database/connection");

const verifyToken = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json("Não autorizado");
	}

	try {
		let id;
		const token = authorization.replace("Bearer ", "").trim();

		await schemaValidateToken.validateAsync({ token });
		jwt.verify(token, senhaHash, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: "Token inválido" });
			}
			({ id } = decoded);
		});

		const userExists = await knex("users").where({ id }).first();

		if (!userExists) {
			return res.status(404).json({ message: "Usuario não encontrado" });
		}

		const { senha, ...user } = userExists;

		req.user = user;

		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};

module.exports = verifyToken;
