const model = require('../models/authors_models.js')

function getAll (req, res, next){
    const result = model.getAll(req.params.id)
    if(result.errors){
        return next({ status: 400, message: `Could not delete a book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

function create (req, res, next){
    const result = model.create(
        req.params.id,
        req.body.firstname,
        req.body.lastname
    )
    if(result.errors){
        return next({ status: 400, message: `Could not create new author`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

function deleteOne (req, res, next){
    const result = model.deleteOne(
        req.params.id, 
        req.params.authorid
    )
    if(result.errors){
        return next({ status: 400, message: `Could not delete author`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

function editOne (req, res, next){
    const result = model.editOne(
        req.params.id,
        req.params.authorid,
        req.body.firstname,
        req.body.lastname
    )

    if(result.errors){
        return next({ status: 400, message: `Could not update a book`, errors: result.errors })
    }
    res.status(201).json({ data: result })
}

module.exports = { getAll, create, deleteOne, editOne}