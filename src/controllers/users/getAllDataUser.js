const { getAllCharges } = require("../../utils/chargesConsults");
const { getAllCustomers } = require("../../utils/customersConsults");

const getAllDataUser = async (req, res) => {
    try {
        const { id } = req.user;

        const allDatas = await Promise.all([getAllCustomers(id), getAllCharges(id)]);

        const allDataUser = {
            Customers_Data: allDatas[0],
            Charges_Data: allDatas[1]
        }

        return res.status(200).json(allDataUser)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Erro interno do servidor!" })
    }
}

module.exports = getAllDataUser;