const updateStatusCharge = require("../../utils/updateStatusCharge");
const { getAllCharges } = require("../../utils/chargesConsults");

const getCharges = async (req, res) => {
  try {
    const { id } = req.user;

    await updateStatusCharge(id);

    const allCharges = await getAllCharges(id);

    return res.status(200).json(allCharges);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = getCharges;
