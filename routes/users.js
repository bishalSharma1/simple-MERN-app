const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const gr = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const passport = require('passport')

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'works' })
})
router.route('/register').post((req, res) => {
  const { name, email, password } = req.body
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'email already exists' })
    } else {
      const avatar = gr.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //default
      })

      const newUser = new User({
        name,
        email,
        password,
        avatar,
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err
          }
          newUser.password = hash
          newUser
            .save()
            .then((user) => {
              res.status(200).json(user)
              console.log('new user created')
            })
            .catch((error) => console.log(error))
        })
      })
    }
  })
})

router.route('/login').post((req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: 'email not found' })
      }
      //proceed to check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const { _id, name, avatar } = user
            const payload = { id: _id, name, avatar }
            jwt.sign(
              payload,
              process.env.KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  console.log(err)
                }
                res.json({ success: true, token: 'Bearer ' + token })
              }
            )
          } else {
            return res.status(400).json({ password: 'incorrect password' })
          }
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

router
  .route('/current')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ name: req.user.name })
  })

module.exports = router
