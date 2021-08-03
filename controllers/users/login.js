const User = require('../../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const validateLogin = require('../../validation/login.js')

const login = (req, res) => {
  const { errors, isValid } = validateLogin(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'user not found'
        return res.status(404).json(errors)
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
            errors.password = 'incorrect password'
            return res.status(400).json(errors)
          }
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

module.exports = login
