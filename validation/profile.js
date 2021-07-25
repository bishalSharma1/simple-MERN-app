const Validator = require('validator')
const isEmpty = require('./isEmpty.js')

module.exports = function validateProfileInput(data) {
  let errors = {}

  if (isEmpty(data.handle)) {
    errors.handle = 'Handle field cannot be empty'
  } else {
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = 'Handle must be between 2 and 40  characters long!'
    }
  }

  if (isEmpty(data.skills)) {
    errors.skills = 'skills field cannot be empty'
  }

  if (isEmpty(data.status)) {
    errors.status = 'status field cannot be empty'
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
