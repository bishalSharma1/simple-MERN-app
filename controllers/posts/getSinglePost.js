const Post = require('../../models/Post')

const getSinglePost = (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .populate('user', ['name', 'avatar'])
    .then((post) => {
      if (!post) {
        const errors = { post: 'there is no post with that id' }
        return res.status(404).json(errors)
      }
      res.status(200).json(post)
    })
    .catch((err) => res.json({ nopost: 'there is no post with that ID' }))
}

module.exports = getSinglePost
