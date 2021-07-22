const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(epxress.urlencoded())
const passport = require('passport')

require('dotenv').config()
const port = process.env.PORT || 5000

const users = require('./routes/users.js')
const posts = require('./routes/posts.js')
const profile = require('./routes/profile.js')
const { urlencoded } = require('express')

mongoose
  .connect(process.env.DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to Database')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

//passport middleware
app.use(passport.initialize())

//passport config

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.get('/', (req, res) => {
  res.send('welcome home')
})
