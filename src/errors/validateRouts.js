const validateRouts = async (req, res) => {
    res.status(404).json({ message: "Página não encontrada" });
  }

  module.exports = validateRouts;