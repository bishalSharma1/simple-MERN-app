const Validator = require('validator')
const isEmpty = require('./isEmpty.js')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  if (isEmpty(data.email)) {
    errors.email = 'Email field cannot be empty'
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email!'
    }
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field cannot be empty'
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be between 6 and 30 characters long!'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
