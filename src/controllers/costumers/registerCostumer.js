const knex = require("../../database/connection/connection");
const capitalizeFullName = require("../../utils/capitalizeName");
const validateNewCustomer = require("../../utils/checkExistingData");

const registerCustomer = async (req, res) => {
  try {
    const { email, cpf, phone, ...otherData } = req.body;
    const newEmail = email.toLowerCase();

    otherData.name = capitalizeFullName(otherData.name);

    const validationErrors = await validateNewCustomer(newEmail, cpf, phone);

    if (validationErrors) return res.status(400).json(validationErrors);

    const newCustomer = await knex("costumers")
      .insert({
        user_id: req.user.id,
        email: newEmail,
        cpf,
        phone,
        status: "Em dia",
        ...otherData,
      })
      .returning("*");

    return res.status(201).json(newCustomer[0]);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = registerCustomer;
