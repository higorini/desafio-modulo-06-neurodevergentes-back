const knex = require("../../database/connection/connection");

const getCharges = async (req, res) => {
  try {
    const chargesVencidas = await knex("charges")
    .where("charge_date", "<", knex.raw('NOW()'))
    .where("status", "!=", "paga")

    for(const charge of chargesVencidas) {
      await knex("charges").update("status", "vencida").where("id", charge.id)
    };

    return res.status(200).json(chargesVencidas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;