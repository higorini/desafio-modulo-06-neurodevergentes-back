const knex = require("../database/connection/connection");

const validateNewCustomer = async (newEmail, cpf, phone) => {
  const [existingEmail, existingCpf, existingPhone] = await Promise.all([
    knex("costumers").where({ email: newEmail }).first(),
    knex("costumers").where({ cpf }).first(),
    knex("costumers").where({ phone }).first(),
  ]);

  const errors = {};

  if (existingEmail) errors.email = "E-mail já está cadastrado.";
  if (existingCpf) errors.cpf = "CPF já está cadastrado.";
  if (existingPhone) errors.phone = "Telefone já está cadastrado.";

  return Object.keys(errors).length > 0
    ? { message: "Campos já estão cadastrados.", fields: errors }
    : null;
};

module.exports = validateNewCustomer;
