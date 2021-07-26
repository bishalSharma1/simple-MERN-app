const Profile = require('../../models/Profile.js')

const getProfile = (req, res) => {
  errors = {}
  Profile.findOne({
    user: req.user.id,
  })
    .populate('user', ['name', 'avatar']) // 'user' is the prop you want to populate; property must have reference (as ref: 'collection_name') defined in order to get populated
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
}

module.exports = getProfile
