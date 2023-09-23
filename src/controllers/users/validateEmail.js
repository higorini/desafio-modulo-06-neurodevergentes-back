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

        res.json({ message: "E-mail disponível para cadastro." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = validateEmail;