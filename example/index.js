const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiHandler = require('./apiHandler')
const errorHandler = require('./errorHandler')
const { validator, transFetchBody } = require('../lib')

app.use(bodyParser.json())
// app.use(transFetchBody)
app.use(validator(1,2,3))

app.use('/api', require('./route'))

app.use(apiHandler)
app.use(errorHandler)


const PORT = 8080
app.set('port', process.env.PORT || PORT);
const port = app.get('port')

const serverRuningInfo = `express-fields-validator is running at port:${port}`
app.listen(port, () => {
    console.log(serverRuningInfo);
})