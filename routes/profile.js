const express = require('express')
const router = express.Router()
const getProfile = require('../controllers/profile/getProfile.js')
const postProfile = require('../controllers/profile/postProfile.js')
const passport = require('passport')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), getProfile)
  .post(passport.authenticate('jwt', { session: false }), postProfile)

router.route('/test').get((req, res) => {
  res.send('profile page')
})

module.exports = router
