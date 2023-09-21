const knex = require("../../database/connection/connection");

const postCharges = async (req, res) => {
    const { idCostumer } = req.params;

    const {
        costumer_name,
        description,
        status,
        value,
        charge_date } = req.body;

    try {

        const costumer = await knex("costumers").where("id", idCostumer).first();

        if (!costumer) return res.status(404).json({ message: "Cliente não econtrado!" });

        const newCharge = await knex("charges").insert({
            costumer_id: idCostumer,
            costumer_name,
            description,
            status,
            value,
            charge_date
        }).returning("*");

        return res.status(200).json(newCharge);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Ocorreu um erro interno." });
    }
};

module.exports = postCharges;