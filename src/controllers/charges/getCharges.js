const knex = require("../../database/connection/connection");
const { getPendingCharges, getDefaultingCharges, getAllCharges } = require("../../utils/chargesConsults");

const getCharges = async (req, res) => {
  try {

    const { id } = req.user;

    const defaultingCharges = await getDefaultingCharges(id);

    for (const charge of defaultingCharges) {
      await knex("charges").update("status", "vencida").where("id", charge.id);
    };

    const pendingCharges = await getPendingCharges(id);
    for (const charge of pendingCharges) {
      await knex("charges").update("status", "pendente").where("id", charge.id);
    };

    const allCharges = await getAllCharges(id);

    return res.status(200).json(allCharges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;