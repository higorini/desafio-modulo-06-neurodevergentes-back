const knex = require("../../database/connection/connection")

const searchCharge = async (req, res) => {
    try {
        const { searchCharge } = req.body;

        const charge = await getSearchCharge(searchCharge);

        return res.status(200).json(charge)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = searchCharge;

const getSearchCharge = async (charge) => {
    if (isNaN(charge)) {
        return await knex("charges")
            .select(
                "charges.costumer_name",
                "charges.id as charge_id",
                "charges.value",
                "charges.charge_date",
                "charges.status",
                "charges.description"
            )
            .where({ costumer_name: charge })
    }

    return knex("charges")
        .select(
            "charges.costumer_name",
            "charges.id as charge_id",
            "charges.value",
            "charges.charge_date",
            "charges.status",
            "charges.description"
        )
        .where({ id: charge })
        .first()
}