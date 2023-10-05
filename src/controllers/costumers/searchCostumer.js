const { getSearchCustomer } = require("../../utils/customersConsults");

const searchCustumer = async (req, res) => {
    try {
        const { id } = req.user;
        const { searchCustumer } = req.body;

        console.log(id);

        if (!searchCustumer) {
            return res.status(400).json({ mensage: "Passse o Nome / CPF / Email do cliente na busca" })
        }

        const customers = await getSearchCustomer(searchCustumer, id);

        console.log(customers);

        return res.status(200).json(customers)
    } catch (error) {
        return res.status(500).json({ mensage: "Erro interno do servidor" })
    }
}

module.exports = searchCustumer;