const knex = require("../database/connection");

const getUsers = async (req, res) => {
  try {
    const users = await knex("users");

    const usersData = users.map((user) => {
      const { password, ...userData } = user;
      return {
        ...userData,
      };
    });

    return res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getUsers;
