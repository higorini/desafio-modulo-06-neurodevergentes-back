const getUser = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};
module.exports = getUser;
