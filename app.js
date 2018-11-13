const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.disable('x-powered-by')

const bookRoutes = require('./scripts/routes/routes.js')
app.use('/books', bookRoutes)


app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500
    res.status(status).json({ error: err })
})
  
app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not found' }})
})

app.listen(port, () => {
      console.log(`Library API listening on port ${port}!`)
})

module.exports = app
