const express = require('express')
const router = express.Router()
const getProfile = require('../controllers/profile/getProfile.js')
const postProfile = require('../controllers/profile/postProfile.js')
const viewProfileByUserId = require('../controllers/profile/viewProfileByUserId')
const viewProfileByHandle = require('../controllers/profile/viewProfileByHandle')
const getAllProfiles = require('../controllers/profile/getAllProfiles')
const education = require('../controllers/profile/education.js')
const experience = require('../controllers/profile/experience.js')
const passport = require('passport')

const Profile = require('../models/Profile.js')

//private routes
router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), getProfile)
  .post(passport.authenticate('jwt', { session: false }), postProfile)
router
  .route('/education')
  .post(passport.authenticate('jwt', { session: false }), education)
router
  .route('/experience')
  .post(passport.authenticate('jwt', { session: false }), experience)

//public routes
router.route('/user/:user_id').get(viewProfileByUserId)
router.route('/handle/:handle').get(viewProfileByHandle)
router.route('/all').get(getAllProfiles)

router.route('/test').get((req, res) => {
  const errors = {}
  Profile.findOne({ education: [{ school: 'someschool' }] })
    .then((profiles) => {
      if (!profiles) {
        return res.status(404).json('there are no profiles to show')
      }
      res.status(200).json(profiles)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

module.exports = router
