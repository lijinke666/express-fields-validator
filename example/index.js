const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiHandler = require('./middleware/apiHandler')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')
const { validator, transFetchBody } = require('../lib')

app.use(bodyParser.json())
// app.use(transFetchBody)
app.use(validator({
    entry:path.resolve(__dirname,'../example'),
    prefix:"/api"
}))

app.use('/api', [
    require('./router/route1'),
    require('./router/route2')
])

app.use(apiHandler)
app.use(errorHandler)


const PORT = 8080
app.set('port', process.env.PORT || PORT);
const port = app.get('port')

const serverRunningInfo = `express-fields-validator is running at port:${port}`
app.listen(port, () => {
    console.log(serverRunningInfo);
})