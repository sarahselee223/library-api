const model = require('../models/book_models.js')

function getAll (req, res, next){
    res.status(200).json({ data: model.getAll()})
}

function create (req, res, next){
    const result = model.create(
        req.body.name,
        req.body.authors,
        req.body.description,
        req.body.borrowed
    )

    if(result.errors){
        return next({ status: 400, message: `Could not create new book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

function deleteOne (req, res, next){
    const result = model.deleteOne(
        req.params.id
    )
    if(result.errors){
        return next({ status: 400, message: `Could not delete a book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

module.exports = { getAll, create, deleteOne }