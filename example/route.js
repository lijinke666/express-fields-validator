const express = require('express')
const router = express.Router()

router.post('/test', (req, res, next) => {
    const {
        id,
        name,
        sex
    } = req.body

    res.resRawData = { id, name, sex }
    next()
})

module.exports = router