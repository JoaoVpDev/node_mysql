const express = require("express") //impora o módulo express
const exphbs = require("express-handlebars") //importa o módulo express-handlebars para teamplates
const pool = require('./db/conn') //importa a conexão com o banco de dados

const app = express() // cria uma instância do express

app.engine("handlebars", exphbs.engine()) //configura o motor de teamplates Handlebars
app.set('view engine', 'handlebars') //define Handlebars como o motor de visualização

app.use(
    express.urlencoded({
        extended: true //permite codificação de URL estendida
    })
)

app.use(express.json()) //permite receber dados JSON nas requisições

app.use(express.static('public')) //define o diretório 'public' para servir arquivos estáticos

//Rota da página inicial
app.get('/', (req, res) => {
    res.render('home') //renderiza o teamplate home
})

//Rota para inserir um novo livro
app.post('/books/insertbook', (req, res) => {
    const title = req.body.title //Obtém o título do livro
    const pageqty = req.body.pageqty //Obtém a quantidade de páginas do livro do corpo da requisição

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)` //SQL para inserir um novo livro no banco
    const data = ['title', 'pageqty', title, pageqty] //dados da consula


    pool.query(sql, data, function (err) { //exeuta a consulta SQL
        if (err) {
            console.log(err) //Impreme um erro caso ocorra
        }
        res.redirect('/') //redireciona para a página inicial
    })
})

//Rota para listar todos os livros
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books' //SQL para selecionar todos os livros da table

    pool.query(sql, function (err, data) { // executa consulta SQL
        if (err) {
            console.log(err) //Impreme um erro caso ocorra
            return
        }

        const books = data //armazena os dados dos livros


        res.render('books', { books }) // Renderiza o template 'books' com os dados dos livros
    })
})

//Rota para exibir detalhes de um livro específico
app.get('/books/:id', (req, res) => {
    const id = req.params.id //Obtém o ID do livro dos parâmetros da requisição

    const sql = `SELECT * FROM books WHERE ?? = ?` // SQL para selecionar um livro pelo ID
    const data = ['id', id] //dados da consulta

    pool.query(sql, data, function (err, data) { //executa a consulta SQL
        if (err) {
            console.log(err)//Impreme um erro caso ocorra
            return
        }

        const book = data[0] //armazena dados do livro

        res.render('book', { book }) //Renderiza o teamplate book coms os dados do livro
    })

})


// Rota para editar um livros específico
app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id  // Obtém o ID do livro dos parâmetros da requisição

    const sql = `SELECT * FROM books WHERE ?? = ?` // SQL para selecionar um livro pelo ID
    const data = ['id', id] // Dados para a consulta

    pool.query(sql, data, function (err, data) { // Executa a consulta SQL
        if (err) {
            console.log(err) //Impreme um erro caso ocorra
            return
        }

        const book = data[0] // Armazena os dados do livro

        res.render('editbook', { book }) // Renderiza o template 'editbook' com os dados do livro
    })
})


// Rota para atualizar um livro
app.post('/books/updatebook', (req, res) => {

    const id = req.body.id // Obtém o ID do livro do corpo da requisição
    const title = req.body.title // Obtém o título do livro do corpo da requisição
    const pageqty = req.body.pageqty // Obtém a quantidade de páginas do livro do corpo da requisição

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?` // SQL para atualizar um livro

    const data = ['title', title, 'pageqty', pageqty, 'id', id] // Dados para a consulta

    pool.query(sql, data, function (err) { // Executa a consulta SQL
        if (err) {
            console.log(err) //Impreme um erro caso ocorra
            return
        }

        res.redirect(`/books`) // Redireciona para a lista de livros após editado
    })
})


// Rota para remover um livro
app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id // Obtém o ID do livro dos parâmetros da requisição

    const sql = `DELETE FROM books WHERE ?? = ?` // SQL para deletar um livro
    const data = ['id', id] // Dados para a consulta

    pool.query(sql, data, function (err) { // Executa a consulta SQL
        if (err) {
            console.log(err) // Loga o erro, se houver
            return
        }

        res.redirect('/books') // Redireciona para a lista de livros
    })
})

app.listen(3000) // Inicia o servidor na porta 3000