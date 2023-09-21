const knex = require("../../database/connection/connection");
const validateCharge = require("../../schemas/schemaValidateCharge");

const postCharges = async (req, res) => {
    const { idCostumer } = req.params;

    const {
        description,
        value,
        status,
        maturity } = req.body;

    try {

        await validateCharge.validateAsync(req.body);

        const costumer = await knex('costumers').where('id', idCostumer).first();

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