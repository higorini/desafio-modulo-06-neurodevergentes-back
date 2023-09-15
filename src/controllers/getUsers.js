const knex = require("../database/connection");

const getUsers = async (req, res) => {
    try {
        const users = await knex("users")

        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro interno." });
    }
}

module.exports = getUsers;