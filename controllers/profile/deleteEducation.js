const Profile = require('../../models/Profile.js')

const deleteEducation = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'profile not found'
        res.status(404).json(errors)
      }
      const eduIdArray = profile.education.map((element) => element.id)
      const index = eduIdArray.indexOf(req.params.edu_id)
      profile.education.splice(index, 1)

      profile.save().then((profile) => res.status(200).json(profile))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
module.exports = deleteEducation
