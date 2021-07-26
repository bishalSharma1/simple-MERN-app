const validator = require('validator')
const isEmpty = require('./isEmpty.js')

const validateEducation = (data) => {
  const errors = {}
  if (isEmpty(data.school)) {
    errors.school = 'school field cannot be empty'
  }
  if (isEmpty(data.degree)) {
    errors.degree = 'degree field cannot be empty'
  }
  if (isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'fieldofstudy field cannot be empty'
  }
  if (isEmpty(data.from)) {
    errors.from = 'from field cannot be empty'
  } else {
    if (!validator.isDate(data.from)) {
      errors.from = 'enter a valid date'
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

module.exports = validateEducation
