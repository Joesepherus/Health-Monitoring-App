var mongoose = require('mongoose')

var schema = mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  state: {
    type: String
  },
  created_by: {
    type: String
  },
  create_date: {
    type: Date
  },
  removed_date: {
    type: Date
  }
})

var User = (module.exports = mongoose.model('User', schema))

module.exports.getAllUsers = function(callback, limit) {
  User.find(callback).limit(limit)
}

module.exports.getUserById = function(userId, callback) {
  User.findById(userId, callback)
}

module.exports.addUser = function(user, callback) {
  var json = {
    id: user.id,
    name: user.title,
    create_date: user.description,
    state: 'inprogress'
  }
  User.create(json, callback)
}

module.exports.updateUser = function(id, user, options, callback) {
  var query = { _id: id }
  var update = {
    name: user.name,
    create_date: user.create_date,
    state: user.state
  }
  User.findOneAndUpdate(query, update, options, callback)
}

module.exports.removeUser = function(id, user, options, callback) {
  var query = { _id: id }
  var update = {
    state: 'removed'
  }
  User.findOneAndUpdate(query, update, options, callback)
}

module.exports.deletePermanentlyUser = function(id, callback) {
  var query = { _id: id }
  User.deleteOne(query, callback)
}
