const knex = require("../../database/connection/connection");

const getAllDataUser = async (req, res) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor!"})
    }
}

module.exports = getAllDataUser;