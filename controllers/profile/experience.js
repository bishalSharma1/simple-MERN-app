const Profile = require('../../models/Profile.js')
const validateExperience = require('../../validation/experience.js')

const experience = (req, res) => {
  const { errors, isValid } = validateExperience(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (!profile) {
      errors.noprofile = 'profile not found'
      return res.status(404).json(errors)
    }
    const { title, company, from, to, current, description, location } =
      req.body
    const newExp = {
      title,
      company,
      from,
      to,
      location,
      current,
      description,
    }

    profile.experience.unshift(newExp)

    profile.save().then((profile) => {
      res.status(200).json(profile)
    })
  })
}

module.exports = experience
