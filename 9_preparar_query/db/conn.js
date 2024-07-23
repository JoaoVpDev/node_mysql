const mysql = require('mysql') // Importa o módulo MySQL


const pool = mysql.createPool({ // Cria um pool de conexões com o banco de dados
    connectionLimit: 10, // Define o limite máximo de conexões no pool
    host: 'localhost', // Endereço do servidor do banco de dados
    user: 'root', // Nome de usuário para se conectar ao banco de dados
    password: '', // Senha do usuário para se conectar ao banco de dados
    database: 'nodemysql2', // Nome do banco de dados ao qual se conectar
})

module.exports = pool // Exporta o pool de conexões para ser usado em outros arquivos