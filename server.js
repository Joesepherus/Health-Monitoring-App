var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'))
const env = process.env.NODE_ENV || 'development'

date = new Date()

console.log('Starting application')

// DB SETUP
MONGOLAB_URI = process.env.MONGOLAB_URI_HEALTH_MONITORING_APP
console.log('MONGOLAB_URI: ', MONGOLAB_URI)
console.log('Initializing connection to MongoDB')
mongoose.connect(MONGOLAB_URI, function(error) {
  if (error) console.error(error)
  else console.log('Successfuly connected to MongoDB')
})

// ===== USER =====

User = require('./models/user.js')

// display all users
app.get('/api/user', function(req, res) {
  User.getAllUsers(function(err, allUsers) {
    if (err) {
      throw err
    }
    console.log(allUsers)
    res.json(allUsers)
  })
})

// display a user with a certain ID
app.get('/api/user/:id', function(req, res) {
  User.getUserById(req.params.id, function(err, user) {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

// add a new user
app.post('/api/user', function(req, res) {
  var user = req.body.user
  console.log(user)
  User.addUser(user, function(err, user) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(user)
    }
  })
})

// update a user
app.put('/api/user/:id', function(req, res) {
  var id = req.params.id
  var user = req.body.user
  console.log(id)
  console.log(user)
  User.updateUser(id, user, {}, function(err, user) {
    if (err) {
      res.send({ message: 'Error', status: 200 })
    } else {
      res.send({ message: 'Dáta boli zmenené', status: 200 })
    }
  })
})

// change users state to removed user
app.put('/api/user/removed/:id', function(req, res) {
  var id = req.params.id
  var user = req.body
  console.log(id)

  console.log(user)
  User.removeUser(id, user, {}, function(err, user) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(user)
    }
  })
})

// remove user permanently
app.delete('/api/user/deleted/:id', function(req, res) {
  var id = req.params.id
  User.deletePermanentlyUser(id, function(err, user) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(user)
    }
  })
})

// calling server to listen on port
var server = app.listen(process.env.PORT || 3001, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
// --------------------------------------------------------------------------------------------
