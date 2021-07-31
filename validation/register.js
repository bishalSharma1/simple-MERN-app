const Validator = require('validator')
const isEmpty = require('./isEmpty.js')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  if (isEmpty(data.name)) {
    errors.name = 'Name field cannot be empty'
  } else {
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters long!'
    }
  }

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

  if (isEmpty(data.confirm)) {
    errors.confirm = 'Field cannot be empty'
  } else {
    if (!Validator.equals(data.password, data.confirm)) {
      errors.confirm = 'Password mismatch!'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
