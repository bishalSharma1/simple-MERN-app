const Post = require('../../models/Post')

const getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 }) //mongo sort method; -1 represents descending order
    .populate('user', ['name', 'avatar'])
    .then((posts) => {
      if (!posts) {
        const errors = { posts: 'there are no posts to show' }
        return res.status(404).json(errors)
      }
      res.status(200).json(posts)
    })
    .catch((err) => res.json(err))
}

module.exports = getPosts
