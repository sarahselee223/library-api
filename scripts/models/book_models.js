const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const booksFilePath = path.join(__dirname, './db/books.json')

function getAll(){
    const { books } = readData()
    return books
}

function create (name, authors, description, borrowed){
    const { books } = readData() 

    if (!name) {
        return error('name is required')
     
    } else if (name.length > 30){
        return error('name cannot be longer than 30 letters')
   
    } else if (borrowed === undefined || typeof borrowed !== 'boolean'){
        return error('true/false value is required')
    
    } else if (typeof authors !== "array"){
        return error('author has to be array')
    }

    const book = {id: shortid.generate(), name, borrowed, description, authors}
    books.push(book)

    writeData(books)
    return book
}

function deleteOne (id){
    const { books } = readData() 

    const bookIndex = books.findIndex(book => {return book.id === id})
    
    if (bookIndex === -1) {
        return error('no matching id found')
    }

    books.splice(bookIndex, 1)
    
    writeData(books)
    return books
}

function editOne (id, name, authors, description, borrowed){
    const { books } = readData() 
   
    const book = books.find(book => {return book.id === id})
    
    if (!book) {
        return error('no matching id found')
    } 
    if (name) {
        book.name = name
    } 
    if (authors) {
        book.authors = authors
    } 
    if (description) {
        book.description = description
    } 
    if (borrowed === true || borrowed === false){
        book.borrowed = borrowed
    } 
    
    writeData(books)
    return book
}

function error(msg) {
    return { errors: msg }
}

function readData(){
    return {books: JSON.parse(fs.readFileSync(booksFilePath))}
}
function writeData(books){
    return fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
}

module.exports = { getAll, create, deleteOne, editOne }