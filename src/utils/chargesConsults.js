const knex = require("../database/connection/connection");

const getDefaultingCharges = () => {
    return knex("charges")
        .where("charge_date", "<", knex.raw("DATE(NOW())"))
        .where("status", "=", "pendente");
}

const getPendingCharges = () => {
    return knex("charges")
        .where("charge_date", ">", knex.raw("DATE(NOW())"))
        .orWhere("charge_date", "=", knex.raw("DATE(NOW())"))
        .where("status", "=", "vencida");
}

module.exports = {
    getDefaultingCharges,
    getPendingCharges
}