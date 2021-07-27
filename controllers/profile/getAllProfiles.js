const Profile = require('../../models/Profile.js')

const getAllProfiles = (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar', 'email'])
    .then((profiles) => {
      if (!profiles) {
        return res.status(404).json('there are no profiles to show')
      }
      res.status(200).json(profiles)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

module.exports = getAllProfiles
