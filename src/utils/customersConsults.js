const knex = require("../database/connection/connection");

const getCostumersDefaulting = (id) =>
  knex("costumers")
    .select("costumers.id")
    .join("charges", "costumers.id", "=", "charges.customer_id")
    .where("charges.status", "=", "vencida")
    .andWhere("costumers.user_id", "=", id);

const getCostumersUpToDate = (id, costumersDefaulting) =>
  knex("costumers")
    .select("costumers.id")
    .whereNotIn(
      "id",
      costumersDefaulting.map((customer) => customer.id)
    )
    .where("costumers.user_id", "=", id);

const getAllCostumers = (id) =>
  knex("costumers")
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

const searchBy = async (column, value) =>
  knex("costumers")
    .select(
      "costumers.id",
      "costumers.name",
      "costumers.cpf",
      "costumers.email",
      "costumers.phone",
      "costumers.status"
    )
    .where(column, "like", `%${value}%`);

const searchByCPF = (cpf) => searchBy("cpf", cpf);

const searchByEmail = (email) => searchBy("email", email);

const searchByName = (name) => searchBy("name", name);

module.exports = {
  getCostumersDefaulting,
  getCostumersUpToDate,
  getAllCostumers,
  searchByCPF,
  searchByEmail,
  searchByName,
};
