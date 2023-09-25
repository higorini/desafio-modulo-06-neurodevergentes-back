const validateRouts = async (req, res) => {
  try {
    return res.status(404).json({ message: "Página não encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

module.exports = validateRouts;
