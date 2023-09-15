const jwt = require("jsonwebtoken");
const senhaHash = require("../utils/senhaHash");
const schemaValidateToken = require("../schemas/schemaValidateToken");
const knex = require("../database/connection");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const token = authorization.split(" ")[1];

    await schemaValidateToken.validateAsync({ token });

    jwt.verify(token, senhaHash, async (erro, decoded) => {
      if (erro) {
        return res.status(401).json({ message: "Token inválido" });
      }

      const userExists = await knex("users").where({ id: decoded.id }).first();

      if (!userExists) {
        return res.status(404).json({ message: "Usuario não encontrado" });
      }

      const { password, ...user } = userExists;

      req.user = user;

      next();
    });
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
};

module.exports = verifyToken;
