const bcrypt = require("bcrypt");
const knex = require("../../database/connection/connection");

const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await knex("users").where({ email }).first();

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "E-mail já cadastrado para outro usuário." });
    }
    res.status(200).json({ message: "E-mail disponível para cadastro." });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await knex("users").where({ email }).first();

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "E-mail já cadastrado para outro usuário." });
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

module.exports = { registerUser, validateEmail };
