const {
  searchByCPF,
  searchByEmail,
  searchByName,
} = require("../../utils/customersConsults");

const searchCustomer = async (req, res) => {
  try {
    const { input } = req.body;
    const tipoDeBusca = identifyInput(input);
    const result = await executeSearch(input, tipoDeBusca);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const identifyInput = (input) => {
  if (/^\d{3,}$/.test(input)) return "cpf";
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) return "email";
  return "nome";
};

const executeSearch = async (input, tipoDeBusca) => {
  switch (tipoDeBusca) {
    case "cpf":
      return await searchByCPF(input);
    case "email":
      return await searchByEmail(input);
    default:
      return await searchByName(input);
  }
};

module.exports = searchCustomer;
