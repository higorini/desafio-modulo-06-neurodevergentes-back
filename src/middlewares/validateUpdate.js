const { schemaValidateEdit } = require("../schemas/schemaValidateUser");
const validateEdit = async (req, res, next) => {
	try {
		let { name, email } = req.body;
		await schemaValidateEdit.validateAsync({ email, name });
		next();
	} catch (erro) {
		res.status(400).json({ message: erro.message });
	}
};
module.exports = validateEdit;
