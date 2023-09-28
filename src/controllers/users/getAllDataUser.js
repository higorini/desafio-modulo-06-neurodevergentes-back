const { getAllCharges } = require("../../utils/chargesConsults");
const { getAllCustomers } = require("../../utils/customersConsults");

const getAllDataUser = async (req, res) => {
    try {
        const { id } = req.user;

        const allDatas = await Promise.all([getAllCustomers(id), getAllCharges(id)]);

        const allDataUser = {
            customers:{
                defaulting: allDatas[0].filter(customer => customer.status === "Inadimplente"),
                upToDate: allDatas[0].filter(customer => customer.status === "Em dia")
            },
            charges: {
                defaulting: allDatas[1].filter(charge => charge.status === "vencida"),
                payed: allDatas[1].filter(charge => charge.status === "paga"),
                pending: allDatas[1].filter(charge => charge.status === "pendente")
            }
        }

        return res.status(200).json(allDataUser)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Erro interno do servidor!" })
    }
}

module.exports = getAllDataUser;