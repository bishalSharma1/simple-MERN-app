const Profile = require('../../models/Profile.js')
const User = require('../../models/User.js')

const getProfile = (req, res) => {
  errors = {}
  Profile.findOne({
    user: req.user.id,
  })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!'
        return res.status(404).json(errors)
      }
    })
    .catch((err) => {
      res.status(404).json(err)
    })
}

module.exports = getProfile
