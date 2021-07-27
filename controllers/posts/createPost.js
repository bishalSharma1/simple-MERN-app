const Post = require('../../models/Post')
const validatePostInput = require('../../validation/createPost.js')

const createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const userId = req.user.id
  const { text, name, avatar } = req.body
  const newPost = new Post({
    text,
    name,
    avatar,
    user: userId,
  })
  newPost
    .save()
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports = createPost
