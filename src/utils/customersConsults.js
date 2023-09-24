const knex = require("../database/connection/connection");

const getCustomersDefaulting = async (id) => {
    return await knex("costumers")
        .select("costumers.id")
        .join("charges", "costumers.id", "=", "charges.costumer_id")
        .where("charges.status", "=", "vencida")
        .andWhere("costumers.user_id", "=", id);
}

const getCustomersUpToDate = async (id, customersDefalting) => {
    return await knex("costumers")
        .select("costumers.id")
        .whereNotIn("id", customersDefalting.map(customer => customer.id))
        .where("costumers.user_id", "=", id)
}

const getAllCustomers = async (id) => {
    return await knex("costumers")
        .select(
            "costumers.id",
            "costumers.name",
            "costumers.cpf",
            "costumers.email",
            "costumers.phone",
            "costumers.status"
            )
        .where("costumers.user_id", "=", id)
        .orderBy("status", "desc");
}

module.exports = {
    getCustomersDefaulting,
    getCustomersUpToDate,
    getAllCustomers
} 