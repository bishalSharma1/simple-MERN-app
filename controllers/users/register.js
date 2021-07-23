const User = require('../../models/User.js')
const gr = require('gravatar')
const bcrypt = require('bcryptjs')
const validateRegister = require('../../validation/register.js')

const register = (req, res) => {
  const { errors, isValid } = validateRegister(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { name, email, password } = req.body
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      errors.email = 'email already exists'
      return res.status(400).json(errors)
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
}

module.exports = register
