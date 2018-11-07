const books = require('./db/books.json')
const shortid = require('shortid')

function getAll(){
    return books
}

function create (name, authors, description, borrowed){
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
        response = book
    } 
    return response
}
function deleteOne (id){
    const errors = []
    let response
    const bookIndex = books.findIndex((book) => {
       console.log(book.id)
       console.log(id)
        return book.id === id
    })
    if (bookIndex === -1) {
        errors.push('no matching id found')
        response = { errors }
    } else {
        books.splice(bookIndex, 1)
        response = books
    }
    return response
}

module.exports = { getAll, create, deleteOne }