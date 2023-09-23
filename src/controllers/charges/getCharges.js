const knex = require("../../database/connection/connection");

const getCharges = async (req, res) => {
  try {
    const defaltingCharges = await knex("charges")
    .where("charge_date", "<", knex.raw('DATE(NOW())'))
    .where("status", "<>", "paga")

    for(const charge of defaltingCharges) {
      await knex("charges").update("status", "vencida").where("id", charge.id)
    };

    const allCharges = await knex("charges").orderBy("status", "desc")

    return res.status(200).json(allCharges);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;