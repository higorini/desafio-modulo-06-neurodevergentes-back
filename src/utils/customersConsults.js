const knex = require("../database/connection/connection");

const getCustomersDefaulting = async (id) => {
    return await knex("costumers")
        .select("costumers.id as customer_id")
        .join("charges", "costumers.id", "=", "charges.costumer_id")
        .where("charges.status", "=", "vencida")
        .andWhere("costumers.user_id", "=", id);
}

const getCustomersUpToDate = async (customersDefalting) => {
    return await knex("costumers")
        .select("costumers.id as customer_id")
        .whereNotIn("id", customersDefalting.map(customer => customer.customer_id))
}

module.exports = {
    getCustomersDefaulting,
    getCustomersUpToDate
}