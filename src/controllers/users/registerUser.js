const bcrypt = require("bcrypt");
const knex = require("../../database/connection/connection");
const trimFields = require("../../utils/trimSpaces");
const capitalizeFullName = require("../../utils/capitalizeName");

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = trimFields(req.body);
    const newEmail = email.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newName = capitalizeFullName(name);

    await knex("users").insert({
      name: newName,
      email: newEmail,
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
