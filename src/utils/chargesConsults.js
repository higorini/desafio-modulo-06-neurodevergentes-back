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
            "charges.costumer_name",
            "charges.description",
            "charges.value",
            "charges.charge_date",
            "charges.status"
        )
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .andWhere("costumers.user_id", "=", id);
}

module.exports = {
    getDefaultingCharges,
    getPendingCharges,
    getAllCharges
}