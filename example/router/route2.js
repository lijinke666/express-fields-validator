const express = require('express')
const router = express.Router()

router.post('/route2', (req, res, next) => {
    const {
        id,
        name,
        sex
    } = req.body

    res.resRawData = { id, name, sex }
    next()
})

module.exports = router