const Profile = require('../../models/Profile.js')
const validateEducation = require('../../validation/education.js')

const education = (req, res) => {
  const { errors, isValid } = validateEducation(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (!profile) {
      errors.noprofile = 'profile not found'
      return res.status(404).json(errors)
    }
    const { school, degree, fieldofstudy, from, to, description } = req.body
    const newEdu = {
      school,
      fieldofstudy,
      degree,
      from,
      to,
      description,
    }
    const degreeArr = profile.education.map((element) => element.degree)
    const schoolArr = profile.education.map((element) => element.school)
    const degCheck = degreeArr.find((deg) => deg === degree)
    const schCheck = schoolArr.find((sch) => sch === school)
    if (degCheck) {
      if (schCheck) {
        errors.duplicate = 'duplicate entry'
        return res.status(400).json(errors)
      }
    }
    profile.education.unshift(newEdu)

    profile.save().then((profile) => {
      res.status(200).json(profile)
    })
  })
}

module.exports = education
