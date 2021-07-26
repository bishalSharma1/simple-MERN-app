const Profile = require('../../models/Profile.js')

const getProfileByUserId = (req, res) => {
  const user_id = req.params.user_id
  const errors = {}
  Profile.findOne({ user: user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'there is no such user_id'
        res.status(404).json(errors)
      }
      res.status(200).json(profile)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
module.exports = getProfileByUserId
