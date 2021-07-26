const Profile = require('../../models/Profile.js')
const User = require('../../models/User.js')

const deleteProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.status(200).json('Profile and User deleted')
        })
        .catch((err) => {
          res.json(err)
        })
    })
    .catch((err) => {
      res.json(err)
    })
}
module.exports = deleteProfile
