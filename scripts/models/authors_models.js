const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const authorsFilePath = path.join(__dirname, './db/authors.json')
const booksFilePath = path.join(__dirname, './db/books.json')

function getAll(id) {
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const authors = JSON.parse(fs.readFileSync(authorsFilePath))
    const errors = []
    let response = []
    const bookIndex = books.findIndex(book => { return book.id === id })
    if (bookIndex === -1) {
        errors.push('no matching id found')
        response = { errors }
    } else {
        const book = books[bookIndex]
        const authorsInBook = book.authors
        for (let i = 0; i < authorsInBook.length; i++) {
            const author = authors.find(author => { return author.id === authorsInBook[i] })
            response.push(author)
        }
    }
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 4))
    return response
}

function create (bookid, firstname, lastname){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const authors = JSON.parse(fs.readFileSync(authorsFilePath))
    const errors = []
    let response
    const bookIndex = books.findIndex(book => { return book.id === bookid })
    if (bookIndex === -1) {
        errors.push('no matching id found')
        response = { errors }
    } else {
        const book = books[bookIndex]    
        const newAuthor = {id: shortid.generate(), firstname, lastname}
        book.authors.push(newAuthor.id)
        authors.push(newAuthor)
        response = book
    }
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 4))
    return response
}

function deleteOne(bookid, authorid){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const authors = JSON.parse(fs.readFileSync(authorsFilePath))
    const errors = []
    let response
    const bookIndex = books.findIndex(book => { return book.id === bookid })
    if (bookIndex === -1) {
        errors.push('no matching book id found')
        response = { errors }
    } else {
        
        const authorsinbook = books[bookIndex].authors
        const authorinbookIndex =authorsinbook.findIndex( author => { return author === authorid })
            if(authorinbookIndex === -1) {
            errors.push('no matching author id found')
            response = { errors }
            } else {
                authorsinbook.splice(authorinbookIndex, 1)
                response = books[bookIndex]
                const authorinAuthors = authors.findIndex( author => { return author.id === authorid})
                authors.splice(authorinAuthors,1)
            }
    }
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 4))
    return response
}

function editOne(bookid, authorid, firstname, lastname){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const authors = JSON.parse(fs.readFileSync(authorsFilePath))
    const errors = []
    let response
    const bookIndex = books.findIndex(book => { return book.id === bookid })
    if (bookIndex === -1) {
        errors.push('no matching book id found')
        response = { errors }
    } else {
        const authorinbookIndex =authors.findIndex( author => { return author.id === authorid })
        const author = authors[authorinbookIndex]
        if(authorinbookIndex === -1) {
            errors.push('no matching author id found')
            response = { errors }
            } else {
            author.firstname = firstname
            author.lastname = lastname
            response = author
            }
    }
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 4))
    return response
}



module.exports = { getAll, create, deleteOne, editOne }