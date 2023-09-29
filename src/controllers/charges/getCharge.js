const { getOnlyCharge } = require("../../utils/chargesConsults");


const getCharge = async (req, res) => {
    try {
        const { idCharge } = req.params;

        const charge = await getOnlyCharge(idCharge);

        return res.status(200).json(charge);
    } catch (error) {
        return res.status(500).json({ mensage: "Erro interno do servidor" });
    }
}

module.exports = getCharge;