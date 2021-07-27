const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const register = require('../controllers/users/register.js')
const login = require('../controllers/users/login.js')
const User = require('../models/User')

router.route('/all').get((req, res) => {
  const errors = {}
  User.find()
    .then((users) => {
      if (!users) {
        errors.nousers = 'no users found'
        return res.status(404).json(errors)
      }
      res.status(200).json(users)
    })
    .catch((err) => {
      res.json(err)
    })
})

//public routes
router.route('/register').post(register)
router.route('/login').post(login)

//private route
router
  .route('/current')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ name: req.user.name })
  })

module.exports = router
