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
        await schemaValidateName.validateAsync({ name });

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