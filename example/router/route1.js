const express = require('express')
const router = express.Router()


router.get('/route1', (req, res, next) => {
    const { route1Id } = req.query
    res.resRawData = route1Id 
    next()
})

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