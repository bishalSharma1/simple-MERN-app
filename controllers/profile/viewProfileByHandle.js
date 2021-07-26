const Profile = require('../../models/Profile.js')

const getProfileByHandle = (req, res) => {
  const handle = req.params.handle
  const errors = {}
  Profile.findOne({ handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'there is no such handle'
        res.status(404).json(errors)
      }
      res.status(200).json(profile)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

module.exports = getProfileByHandle
