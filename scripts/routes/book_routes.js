const express = require('express')
const router = express.Router()
const ctrl = require('../controls/book_controls.js')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.delete('/delete/:id', ctrl.deleteOne)
//router.put('/update/:id/books/')

module.exports = router