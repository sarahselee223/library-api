const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const booksFilePath = path.join(__dirname, './db/books.json')

function getAll(){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    return books
}

function create (name, authors, description, borrowed){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const errors = []
    let response

    if (!name) {
        errors.push('name is required')
        response = {errors}
    } else if (name.length > 30){
        errors.push('name cannot be longer than 30 letters')
        response = {errors}
    } else if (borrowed === undefined){
        errors.push('true/false value is required')
        response = {errors}
    } else if (typeof borrowed !== 'boolean'){
        errors.push('true/false value is required')
        response = {errors}
    } else {
        const book = {id: shortid.generate(), name, borrowed, description, authors}
        books.push(book)
        response = books
    } 
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    return response
}
function deleteOne (id){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const errors = []
    let response
    const bookIndex = books.findIndex(book => {return book.id === id})
    if (bookIndex === -1) {
        errors.push('no matching id found')
        response = { errors }
    } else {
        books.splice(bookIndex, 1)
        response = books
    }
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    return response
}
function editOne (id, name, authors, description, borrowed){
    const books = JSON.parse(fs.readFileSync(booksFilePath))
    const errors = []
    let response
    const bookIndex = books.findIndex(book => {return book.id === id})
    const book = books[bookIndex]
    if (bookIndex === -1) {
        errors.push('no matching id found')
        response = { errors }
    } else {
        if (name && book.name) {
            book.name = name
            response = book
        } else if (authors && book.authors) {
            book.authors = authors
            response = book
        } else if (description && book.description) {
            book.description = description
            response = book
        } else if (borrowed === true || borrowed === false){
            book.borrowed = borrowed
            response = book
        } else {
            errors.push('no matching key found')
            response = { errors }
        }
    }
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    return response
}

module.exports = { getAll, create, deleteOne, editOne }