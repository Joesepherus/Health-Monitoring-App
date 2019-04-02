const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const AdminSchema = new Schema({
  name: String,
  email: String,
  users: [User.UserSchema]
})

const Admin = mongoose.model('admin', AdminSchema)

module.exports = Admin
