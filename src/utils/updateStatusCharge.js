const knex = require("../database/connection/connection");
const { getDefaultingCharges, getPendingCharges } = require("./chargesConsults");

const updateStatusCharge = async (id) => {
    const defaultingCharges = await getDefaultingCharges(id);

    for (const charge of defaultingCharges) {
        await knex("charges").update("status", "vencida").where("id", charge.id);
    };

    const pendingCharges = await getPendingCharges(id);
    for (const charge of pendingCharges) {
        await knex("charges").update("status", "pendente").where("id", charge.id);
    };

}

module.exports = updateStatusCharge;