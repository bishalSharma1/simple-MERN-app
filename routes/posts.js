const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const createPost = require('../controllers/posts/createPost.js')
const getPosts = require('../controllers/posts/getPosts.js')
const getSinglePost = require('../controllers/posts/getSinglePost.js')
const deletePost = require('../controllers/posts/deletePost')
const likePost = require('../controllers/posts/likePost')
const commentPost = require('../controllers/posts/commentPost')
const deleteComment = require('../controllers/posts/deleteComment')

router.route('/test').get((req, res) => {
  res.send('posts page')
})

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createPost)
  .get(getPosts)

router
  .route('/like/:post_id')
  .post(passport.authenticate('jwt', { session: false }), likePost)

router
  .route('/comment/:post_id')
  .post(passport.authenticate('jwt', { session: false }), commentPost)
router
  .route('/comment/:post_id/:comment_id')
  .delete(passport.authenticate('jwt', { session: false }), deleteComment)

router
  .route('/:post_id')
  .get(getSinglePost)
  .delete(passport.authenticate('jwt', { session: false }), deletePost)

module.exports = router
