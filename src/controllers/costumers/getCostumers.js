const knex = require("../../database/connection/connection");

const getCostumers = async (req, res) => {
  try {
    const costumers = await knex("costumers");

    const usersData = costumers.map(({ password, ...userData }) => {
      return userData;
    });

    return res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCostumers;
