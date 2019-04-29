const assert = require('assert')
const mongoose = require('mongoose')
const Admin = require('../models/admin')
const { User } = require('../models/user')

describe('Testing nesting', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.admins.drop(function() {
      done()
    })
  })

  it('Create an admin with users', function(done) {
    const Adam = new User({
      name: 'Adam',
      email: 'adam@gmail.com'
    })

    const Jozef = new Admin({
      name: 'Jozef Maloch',
      email: 'Jozefmaloch@gmail.com',
      users: [Adam]
    })

    Jozef.save().then(function() {
      Admin.findOne({ name: 'Jozef Maloch' }).then(function(record) {
        assert(record.users.length === 1)
        done()
      })
    })
  })

  it('Adds a user to an admin', function(done) {
    const Max = new Admin({
      name: 'Maximilian Maloch',
      email: 'max.maloch@gmail.com',
      users: [{ name: 'Alfred', email: 'alfred@gmail.com' }]
    })

    Max.save().then(function() {
      Admin.findOne({ name: 'Maximilian Maloch' }).then(function(record) {
        record.users.push({ name: 'Patricia', email: 'patricia@gmail.com' })
        record.save().then(function() {
          Admin.findOne({ name: 'Maximilian Maloch' }).then(function(record) {
            assert(record.users.length === 2)
            done()
          })
        })
      })
    })
  })
})
