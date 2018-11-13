const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const authorsFilePath = path.join(__dirname, './db/authors.json')
const booksFilePath = path.join(__dirname, './db/books.json')


function getAll(bookid) {
    const { books, authors } = readData()

    const book = books.find(book => book.id === bookid)
    if(!book){
        return error('no matching book id found')
    }
    return authors.filter(author => book.authors.includes(author.id))  
}

function create (bookid, firstname, lastname){
    const { books, authors} = readData () 

    const book = books.find(book => book.id === bookid)
    if(!book){
        return error('no matching book id found')
    }
       
    const newAuthor = {id: shortid.generate(), firstname, lastname}
    if(!firstname || !lastname){
        return error('firstname and lastname needed')
    }
    book.authors.push(newAuthor.id)
    authors.push(newAuthor)
    
    writeData(books, authors)
    return newAuthor
}

function deleteOne(bookid, authorid){
    const { books, authors } = readData()
    
    const bookIndex = books.findIndex(book => { return book.id === bookid })
    if (bookIndex === -1) {
        return error('no matching book id found')
    } 
        
    const authorsinbook = books[bookIndex].authors
    const authorinbookIndex =authorsinbook.findIndex( author => { return author === authorid })
    if(authorinbookIndex === -1) {
        return error('no matching author id found')
    }

    authorsinbook.splice(authorinbookIndex, 1)
    const authorinAuthors = authors.findIndex( author => { return author.id === authorid})
    const [author] = authors.splice(authorinAuthors,1)
        
    writeData(books, authors)

    return author
}

function editOne(bookid, authorid, firstname, lastname){
    const { books, authors } = readData()
    
    const bookIndex = books.findIndex(book => { return book.id === bookid })
    if (bookIndex === -1) {
        return error('no matching book id found')
    }

    const authorinbookIndex =authors.findIndex( author => { return author.id === authorid })
    const author = authors[authorinbookIndex]
    if (authorinbookIndex === -1) {
        return error('no matching author id found')
    }

    author.firstname = firstname
    author.lastname = lastname

    writeData(books, authors)

    return author
}

function readData() {
    return {
        books: JSON.parse(fs.readFileSync(booksFilePath)),
        authors: JSON.parse(fs.readFileSync(authorsFilePath))
    }
}

function writeData(books, authors) {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4))
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 4))
}

function error(msg) {
    return { errors: msg }
}

module.exports = { getAll, create, deleteOne, editOne }