const knex = require("../database/connection/connection");

const getDefaultingCharges = async (id) => {
    return knex("charges")
        .select("charges.id")
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .where("charge_date", "<", knex.raw("DATE(NOW())"))
        .where("charges.status", "=", "pendente")
        .andWhere("costumers.user_id", "=", id);
}

const getPendingCharges = async (id) => {
    return knex("charges")
        .select("charges.id")
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .where("charge_date", ">=", knex.raw("DATE(NOW())"))
        .where("charges.status", "=", "vencida")
        .andWhere("costumers.user_id", "=", id);
}

const getAllCharges = async (id) => {
    return knex("charges")
        .select(
            "charges.id",
            "costumers.id as costumer_id",
            "charges.costumer_name",
            "charges.value",
            "charges.charge_date",
            "charges.status",
            "charges.description"
        )
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .andWhere("costumers.user_id", "=", id)
        .orderBy("status", "desc");
}

const getOnlyCharge = async (idCharge) => {
    return knex("charges")
    .select(
        "id as charge_id",
        "costumer_name",
        "description",
        "status",
        "value",
        "charge_date"
        )
    .where({id: idCharge})
}

const getSearchCharge = async (searchCharge, id) => {
    if (isNaN(searchCharge)) {
        return await knex("charges")
            .select(
                "charges.id",
                "charges.costumer_name",
                "charges.value",
                "charges.charge_date",
                "charges.status",
                "charges.description"
            )
            .join("costumers", "costumers.id", "=", "charges.costumer_id")
            .where("costumer_name", "like", `%${searchCharge}%`)
            .andWhere("costumers.user_id", "=", id);
    }

    return knex("charges")
        .select(
            "charges.id",
            "charges.costumer_name",
            "charges.value",
            "charges.charge_date",
            "charges.status",
            "charges.description"
        )
        .where({ id: searchCharge })
}

module.exports = {
    getDefaultingCharges,
    getPendingCharges,
    getAllCharges,
    getOnlyCharge,
    getSearchCharge
}