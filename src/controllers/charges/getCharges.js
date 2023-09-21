const knex = require("../../database/connection/connection");

const getCharges = async (req, res) => {
  try {
    const charges = await knex("charges").orderBy("id", "asc");

    return res.status(200).json(charges);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;