const knex = require("../database/connection");

const getCostumers = async (req, res) =>{
    try {
        const costumers = await knex("costumers")

        const usersData = costumers.map((user)=>{
            const { password, ...userData } = user;

            return userData;
        });

        return res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro interno." });
    }
}

module.exports = getCostumers;