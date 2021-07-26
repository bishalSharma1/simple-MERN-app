const Profile = require('../../models/Profile.js')

const deleteExp = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'profile not found'
        res.status(404).json(errors)
      }
      const expIdArray = profile.experience.map((element) => element.id)
      const index = expIdArray.indexOf(req.params.exp_id)
      profile.experience.splice(index, 1)

      profile.save().then((profile) => res.status(200).json(profile))
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
module.exports = deleteExp
