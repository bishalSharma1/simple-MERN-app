const Profile = require('../../models/Profile.js')
const validateProfileInput = require('../../validation/profile')

const postProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  if (!isValid) {
    res.status(400).json(errors)
  }
  const profileFields = {}
  const body = req.body
  profileFields.user = req.user.id
  if (body.handle) {
    profileFields.handle = body.handle
  }
  if (body.website) {
    profileFields.website = body.website
  }
  if (body.location) {
    profileFields.location = body.location
  }
  if (body.bio) {
    profileFields.bio = body.bio
  }
  if (body.status) {
    profileFields.status = body.status
  }
  if (body.githubusername) {
    profileFields.githubusername = body.githubusername
  }

  //skills -split into array
  if (typeof body.skills !== 'undefined') {
    profileFields.skills = body.skills.split(',')
  }

  //social
  profileFields.social = {}
  if (body.youtube) {
    profileFields.social.youtube = body.youtube
  }
  if (body.linkedin) {
    profileFields.social.linkedin = body.linkedin
  }
  if (body.facebook) {
    profileFields.social.facebook = body.facebook
  }
  if (body.instagram) {
    profileFields.social.instagram = body.instagram
  }
  if (body.twitter) {
    profileFields.social.twitter = body.twitter
  }

  Profile.findOne({ user: req.user.id }).then((profile) => {
    //update
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, useFindAndModify: false }
      )
        .then((profile) => {
          res.status(200).json(profile)
        })
        .catch((err) => console.log(err))
    } else {
      //check if handle exists
      Profile.findOne({ handle: profileFields.handle })
        .then((profile) => {
          if (profile) {
            errors.handle = 'that handle already exists'
            return res.status(400).json(errors)
          }
          //create
          new Profile(profileFields)
            .save()
            .then((profile) => {
              res.status(200).json(profile)
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        })
        .catch((err) => {
          res.status(500).json(err)
        })
    }
  })
}

module.exports = postProfile
