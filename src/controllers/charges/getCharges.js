const knex = require("../../database/connection/connection");
const { getPendingCharges, getDefaultingCharges } = require("../../utils/chargesConsults");

const getCharges = async (req, res) => {
  try {
    const defaultingCharges = await getDefaultingCharges();

    for (const charge of defaultingCharges) {
      await knex("charges").update("status", "vencida").where("id", charge.id);
    };

    const pendingCharges = await getPendingCharges();

    for (const charge of pendingCharges) {
      await knex("charges").update("status", "pendente").where("id", charge.id);
    };

    const allCharges = await knex("charges").orderBy("status", "desc");

    const chargersData = allCharges.map((
      { id,
        costumer_name,
        description,
        value,
        charge_date,
        status
      }
    ) => {
      return {
        id,
        costumer_name,
        description,
        value,
        charge_date,
        status
      }
    });

    return res.status(200).json(chargersData);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;