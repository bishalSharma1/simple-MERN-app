const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/createPost.js')

const commentPost = (req, res) => {
  const { text, name, avatar } = req.body
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.message = 'profile not found'
        res.status(401).json(errors)
      }
      Post.findOne({ _id: req.params.post_id })
        .then((post) => {
          if (!post) {
            errors.notfound = 'post with that id not found'
            return res.json(errors)
          }
          const newComment = {
            text,
            name,
            avatar,
            user: req.user.id,
          }

          post.comments.unshift(newComment)

          post
            .save()
            .then((post) => res.status(200).json(post))
            .catch((err) => res.json({ message: 'error while saving comment' }))
        })
        .catch((err) => res.json({ message: 'error while finding that post' }))
    })
    .catch((err) => res.json({ message: 'error while verifying profile' }))
}

module.exports = commentPost

// const userIdEqualArr = post.likes.filter(
//   (elem) => elem.user.toString() === req.user.id
// )
// userIdArr = post.likes.map((elem) => elem.user)
// const len = userIdEqualArr.length
// const index = userIdArr.indexOf(req.user.id)
// if (len > 0) {
//   post.likes.splice(index, 1)
//   console.log('unliked post')
// } else {
//   post.likes.unshift({ user: req.user.id })
//   console.log('liked post')
// }
