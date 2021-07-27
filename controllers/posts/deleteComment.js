const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

const deleteComment = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.message = 'profile not found'
        res.status(401).json(errors)
      }
      Post.findById(req.params.post_id)
        .then((post) => {
          if (!post) {
            errors.notfound = 'post with that id not found'
            return res.json(errors)
          }
          const filterArr = post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          )
          if (filterArr.length > 0) {
            const commentIdArr = post.comments.map((comment) => comment.id)
            const index = commentIdArr.indexOf(req.params.comment_id)
            post.comments.splice(index, 1)
          } else {
            errors.nocomment = 'comment with that id not found'
            return res.status(404).json(errors)
          }

          post
            .save()
            .then((post) => res.status(200).json(post))
            .catch((err) => {
              res.json({ message: 'error while saving comment' })
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
          res.json({ message: 'error while finding post' })
        })
    })
    .catch((err) => {
      res.json({ message: 'error while verifying profile' })
      console.log(err)
    })
}

module.exports = deleteComment
