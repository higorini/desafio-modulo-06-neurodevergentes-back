const knex = require("../database/connection/connection");

const getDefaultingCharges = (id) => {
    return knex("charges")
        .select("charges.id")
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .where("charge_date", "<", knex.raw("DATE(NOW())"))
        .andWhere("charges.status", "=", "pendente")
        .andWhere("costumers.user_id", "=", id);
}

const getPendingCharges = (id) => {
    return knex("charges")
        .select("charges.id")
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .where("charge_date", ">=", knex.raw("DATE(NOW())"))
        .andWhere("charges.status", "=", "vencida")
        .andWhere("costumers.user_id", "=", id);
}

const getAllCharges = (id) => {
    return knex("charges")
        .select(
            "charges.id", 
            "charges.costumer_name", 
            "charges.description", 
            "charges.value",
            "charges.charge_date",
            "charges.status")
        .join("costumers", "costumers.id", "=", "charges.costumer_id")
        .andWhere("costumers.user_id", "=", id)
        .orderBy("status", "desc");
}

module.exports = {
    getDefaultingCharges,
    getPendingCharges,
    getAllCharges
}