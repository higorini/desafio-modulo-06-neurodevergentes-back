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

module.exports = {
    getDefaultingCharges,
    getPendingCharges,
    getAllCharges
}