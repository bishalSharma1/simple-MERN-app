const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

const likePost = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.message = 'profile not found'
        res.status(401).json(errors)
      }
      Post.findOne({ _id: req.params.post_id })
        .then((post) => {
          if (!post) {
            errors.err2 = 'post with that id not found'
            return res.json(errors)
          }
          const userIdEqualArr = post.likes.filter(
            (elem) => elem.user.toString() === req.user.id
          )
          userIdArr = post.likes.map((elem) => elem.user)
          const len = userIdEqualArr.length
          const index = userIdArr.indexOf(req.user.id)
          if (len > 0) {
            post.likes.splice(index, 1)
            console.log('unliked post')
          } else {
            post.likes.unshift({ user: req.user.id })
            console.log('liked post')
          }
          post
            .save()
            .then((post) => res.status(200).json(post))
            .catch((err) => res.json({ message: 'err3' }))
        })
        .catch((err) => res.json({ message: 'err2' }))
    })
    .catch((err) => res.json({ message: 'err1' }))
}

module.exports = likePost
