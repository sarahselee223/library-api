const model = require('../models/book_models.js')

function getAll (req, res, next){
    res.status(200).json({ data: model.getAll()})
}

function getOne (req, res, next){
    const result = model.getOne(req.params.id)
    if(result.errors){
        return next({ status: 400, message: `Could not get a book`, errors: result.errors })
    }
    res.status(200).json({ data: result }) 
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
    const result = model.deleteOne(req.params.id)
    if(result.errors){
        return next({ status: 400, message: `Could not delete a book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

function editOne (req, res, next){
    const result = model.editOne(
        req.params.id,
        req.body.name,
        req.body.authors,
        req.body.description,
        req.body.borrowed
    )

    if(result.errors){
        return next({ status: 400, message: `Could not update a book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

module.exports = { getAll, getOne, create, deleteOne, editOne }