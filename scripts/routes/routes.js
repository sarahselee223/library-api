const express = require('express')
const router = express.Router()
const authorRouter = express.Router({mergeParams: true})

const bookctrl = require('../controls/book_controls.js')
const authorctrl = require('../controls/author_controls.js')

router.use('/:id/authors', authorRouter)

router.get('/', bookctrl.getAll)
router.post('/', bookctrl.create)
router.delete('/:id', bookctrl.deleteOne)
router.put('/:id', bookctrl.editOne)


authorRouter.get('/', authorctrl.getAll)
authorRouter.post('/', authorctrl.create)
authorRouter.delete('/:authorid', authorctrl.deleteOne)
authorRouter.put('/:authorid', authorctrl.editOne)

module.exports = router
