const knex = require("../database/connection");

const registerCostumer = async (req, res) => {
    const { nome, cpf, email, telefone, status } = req.body;
    const { id } = req.user;
    
    try {
        if (!nome || !cpf || !email || !telefone || !status)
            return res
            .status(400)
            .json({ message: "Todos os campos são obrigatórios" });

        const costumer = await knex('clientes').where({ email }).first();

        console.log(costumer);

        if (costumer) return res.status(400).json({ message: "Cliente já cadastrado." });

        const newCostumer = await knex('clientes').insert({
            funcionario_id:id,
            nome,
            cpf,
            email,
            telefone,
            status
        }).returning('*');

        return res.status(201).json(newCostumer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno." });
    }
}

module.exports = registerCostumer;