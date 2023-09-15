const getUser = async (req, res) => {
	try {
		const { password, ...userData } = req.user;

		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json({ message: "Ocorreu um erro interno." });
	}
};
module.exports = getUser;
