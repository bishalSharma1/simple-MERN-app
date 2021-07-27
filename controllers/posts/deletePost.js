const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

const deletePost = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        res.status(401).json({ error: 'profile not found' })
      }
      Post.findOne({ _id: req.params.post_id })
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            //can only remove own posts
            errors.unauthorized = 'not authorized to delete'
            return res.status(401).json(errors)
          }
          post
            .remove()
            .then(() => res.json({ message: 'post deleted' }))
            .catch((err) => res.json(err))
        })
        .catch((err) => res.json(err))
    })
    .catch((err) => res.json(err))
}

module.exports = deletePost
