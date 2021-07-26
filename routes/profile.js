const express = require('express')
const router = express.Router()
const passport = require('passport')

const getProfile = require('../controllers/profile/getProfile.js')
const postProfile = require('../controllers/profile/postProfile.js')
const viewProfileByUserId = require('../controllers/profile/viewProfileByUserId')
const viewProfileByHandle = require('../controllers/profile/viewProfileByHandle')
const getAllProfiles = require('../controllers/profile/getAllProfiles')
const education = require('../controllers/profile/education.js')
const experience = require('../controllers/profile/experience.js')
const deleteEducation = require('../controllers/profile/deleteEducation.js')
const deleteExperience = require('../controllers/profile/deleteExperience.js')

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
  .route('/education/:edu_id')
  .delete(passport.authenticate('jwt', { session: false }), deleteEducation)

router
  .route('/experience')
  .post(passport.authenticate('jwt', { session: false }), experience)

router
  .route('/experience/:exp_id')
  .delete(passport.authenticate('jwt', { session: false }), deleteExperience)

//public routes
router.route('/user/:user_id').get(viewProfileByUserId)
router.route('/handle/:handle').get(viewProfileByHandle)
router.route('/all').get(getAllProfiles)

module.exports = router
