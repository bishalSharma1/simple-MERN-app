const validator = require('validator')
const isEmpty = require('./isEmpty.js')

const validateExperience = (data) => {
  const errors = {}
  if (isEmpty(data.title)) {
    errors.title = 'title field cannot be empty'
  }

  if (isEmpty(data.company)) {
    errors.company = 'company field cannot be empty'
  }

  if (isEmpty(data.from)) {
    errors.from = 'from field cannot be empty'
  } else {
    if (!validator.isDate(data.from)) {
      errors.from = 'enter a valid "from" date'
    }
  }

  if (!isEmpty(data.to)) {
    if (!validator.isDate(data.to)) {
      errors.to = 'enter a valid date'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validateExperience
