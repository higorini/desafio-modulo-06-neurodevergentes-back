const knex = require("../../database/connection/connection");

const postCharges = async (req, res) => {
    const { idCostumer } = req.params;

    const {
        description,
        value,
        status,
        maturity } = req.body;

    if (!description || !value || !status || !maturity)
        return res.status(400).json({ message: "Preencha todos os campos!" });

    try {

        const costumer = await knex('costumers').where('id', idCostumer);

        console.log(costumer);

        if (!costumer) return res.status(404).json({ message: "Cliente não econtrado!" });

        const newCharge = await knex('charges').insert({
            costumer_id: idCostumer,
            description,
            status,
            value,
            maturity
        }).returning("*");

        return res.status(200).json(newCharge);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Ocorreu um erro interno." });
    }
};

module.exports = postCharges;