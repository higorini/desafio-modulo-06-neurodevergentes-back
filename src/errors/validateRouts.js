const validateRouts = async (req, res) => {
  try {
    return res.status(404).json({ message: "Página não encontrada" });
    
  } catch (error) {
    console.log(error.message);
  }
  }

module.exports = validateRouts;