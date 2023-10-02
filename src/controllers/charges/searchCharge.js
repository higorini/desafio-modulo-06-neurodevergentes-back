const { getSearchCharge } = require("../../utils/chargesConsults")

const searchCharge = async (req, res) => {
    try {
        const { searchCharge } = req.body;

        if (!searchCharge) {
            return res.status(400).json({ mensage: "Passse o Nome do cliente ou ID da cobrança na busca" })
        }

        const charge = await getSearchCharge(searchCharge);

        return res.status(200).json(charge)
    } catch (error) {
        return res.status(500).json({ mensage: "Erro interno do servidor" })
    }
}

module.exports = searchCharge;