const { schemaValidateEdit } = require("../schemas/schemaValidateUser");
const validateEdit = async (req, res) => {
	try {
		let { name, email } = req.body;
		await schemaValidateEdit.validateAsync({ email, name });
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};
module.exports = validateEdit;
