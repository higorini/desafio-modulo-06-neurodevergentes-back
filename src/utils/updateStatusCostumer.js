const knex = require("../database/connection/connection");
const { getCustomersDefaulting, getCustomersUpToDate } = require("./customersConsults");

const updateStatusCostumer = async (id) => {
    const customersDefaulting = await getCustomersDefaulting(id);

    for (const customer of customersDefaulting) {
        await knex("costumers").where("id", customer.id).update("status", "Inadimplente");
    }

    const customersUpToDate = await getCustomersUpToDate(id, customersDefaulting);

    for (const customer of customersUpToDate) {
        await knex("costumers").where("id", customer.id).update("status", "Em dia");
    }
}

module.exports = updateStatusCostumer;