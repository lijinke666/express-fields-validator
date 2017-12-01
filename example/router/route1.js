const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check');


router.get('/route1', (req, res, next) => {
    const { route1Id="111" } = req.query
    res.resRawData = route1Id
    next()
})

router.post('/route2',[
    check('name')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail()

    .custom(value => {
      return findUserByEmail(value).then(user => {
        throw new Error('this email is already in use');
      })
    }),
], (req, res, next) => {
    const {
        id,
        name,
        sex
    } = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
  
    // matchedData returns only the subset of data validated by the middleware
    const user = matchedData(req);
    createUser(user).then(user => res.json(user));
    res.resRawData = { id, name, sex }
    next()
})

module.exports = router