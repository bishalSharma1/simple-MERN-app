const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const gr = require('gravatar')
const bcrypt = require('bcryptjs')

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'working' })
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

module.exports = router
