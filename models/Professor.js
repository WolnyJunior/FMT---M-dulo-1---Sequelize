//Model é escrito com a primeira letra MAIÚSCULA por se tratar de uma CLASSE.

const { DataTypes } = require('sequelize') //variavel do sequelize para traduzir os dados coletados para o banco de dados
const { connection } = require("../database/connection"); //importar variavel para conectar ao Banco de Dados

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING
    },
    nivel: {
        type: DataTypes.STRING
    },
    aniversario: {
        type: DataTypes.STRING
    }
})

module.exports = Professor