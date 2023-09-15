const getUser = async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};
module.exports = getUser;
