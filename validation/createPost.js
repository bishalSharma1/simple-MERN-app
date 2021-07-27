const validator = require('validator')
const isEmpty = require('./isEmpty.js')

const validatePostInput = (data) => {
  const errors = {}
  if (isEmpty(data.text)) {
    errors.text = 'text field cannot be empty'
  } else {
    if (!validator.isLength(data.text, { max: 300, min: 2 })) {
      errors.text = 'post must be between 2 and 300 characters'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validatePostInput
