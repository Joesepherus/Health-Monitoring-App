const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  heartRate: Array
})

const User = mongoose.model('user', UserSchema)

module.exports = {
  UserSchema: UserSchema,
  User: User
}

// module.exports.User = mongoose.model('user', UserSchema)

module.exports.getAllUsers = function(callback, limit) {
  User.find(callback).limit(limit)
}

module.exports.getUserById = function(adminId, userId, callback) {
  Admin.findById(adminId).then(function(db_admin) {
    let foundUser = db_admin.users.find(function(user) {
      return user._id == userId
    })
    callback(null, foundUser)
  })
}

module.exports.addUser = function(user, admin_id, callback) {
  Admin.findById(admin_id).then(function(db_admin) {
    const newUser = new User(user)
    db_admin.users.push(newUser)
    db_admin.save().then(function() {
      callback(null, newUser)
    })
  })
}

module.exports.updateUser = function(adminId, userId, user, callback) {
  Admin.findById(adminId).then(function(db_admin) {
    let foundUserIndex = db_admin.users.findIndex(function(user) {
      return user._id == userId
    })
    db_admin.users[foundUserIndex].email = user.email
    db_admin.users[foundUserIndex].name = user.name
    db_admin.save().then(function() {
      callback(null, db_admin.users[foundUserIndex])
    })
  })
}

module.exports.updateHeartRate = function(
  adminId,
  userId,
  user,
  hearRate,
  callback
) {
  Admin.findById(adminId).then(function(db_admin) {
    let foundUserIndex = db_admin.users.findIndex(function(user) {
      return user._id == userId
    })
    db_admin.users[foundUserIndex].heartRate = heartRate
    db_admin.save().then(function() {
      callback(null, db_admin.users[foundUserIndex])
    })
  })
}

module.exports.removeUser = function(id, user, options, callback) {
  var query = { _id: id }
  var update = {
    state: 'removed'
  }
  User.findOneAndUpdate(query, update, options, callback)
}

module.exports.deletePermanentlyUser = function(adminId, userId, callback) {
  Admin.findById(adminId).then(function(db_admin) {
    let foundUserIndex = db_admin.users.findIndex(function(user) {
      return user._id == userId
    })

    db_admin.users.splice(foundUserIndex, 1)
    db_admin.save().then(function() {
      callback(null, db_admin.users[foundUserIndex])
    })
  })
}

module.exports.heartRateAll = function(adminId, callback) {
  Admin.findById(adminId).then(function(db_admin) {
    for (i = 0; i < db_admin.users.length; i++) {
      db_admin.users[i].heartRate.push({
        heartRate: Math.floor(Math.random() * 100 + 50),
        date: new Date()
      })
    }
    db_admin.save().then(function() {})
    callback(null)
  })
}
