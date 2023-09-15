const {
  schemaValidateEmailPassword,
  schemaValidateName,
} = require("../schemas/schemaValidateUser");

const validate = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name & !email & !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }
    await schemaValidateEmailPassword.validateAsync(req.body);
    await schemaValidateName.validateAsync(req.body);
    next();
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
};

module.exports = validate;
