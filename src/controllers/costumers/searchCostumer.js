const { getSearchCustomer } = require("../../utils/customersConsults");

const searchCustumer = async (req, res) => {
    try {
        const { searchCustumer } = req.body;

        const customer = await getSearchCustomer(searchCustumer);

        return res.status(200).json(customer)
    } catch (error) {
        return res.status(500).json({ mensage: "Erro interno do servidor" })
    }
}

module.exports = searchCustumer;