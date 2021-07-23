const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const register = require('../controllers/users/register.js')
const login = require('../controllers/users/login.js')

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'works' })
})
router.route('/register').post(register)
router.route('/login').post(login)

router
  .route('/current')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ name: req.user.name })
  })

module.exports = router
