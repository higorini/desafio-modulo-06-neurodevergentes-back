const { getSearchCharge } = require("../../utils/chargesConsults")

const searchCharge = async (req, res) => {
    try {
        const { searchCharge } = req.body;

        const charge = await getSearchCharge(searchCharge);

        return res.status(200).json(charge)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = searchCharge;