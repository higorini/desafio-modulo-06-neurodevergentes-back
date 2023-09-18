const knex = require("../../database/connection/connection");

const getUsers = async (req, res) => {
  try {
    const users = await knex("users").orderBy("id", "asc");

    const usersData = users.map(({ password, ...userData }) => {
      return userData;
    });

    return res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getUsers;
