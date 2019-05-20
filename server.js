var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const io = require('socket.io')()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/fe'))
const env = process.env.NODE_ENV || 'development'
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
date = new Date()

console.log('Starting application')

// DB SETUP
MONGOLAB_URI = process.env.MONGOLAB_URI_HEALTH_MONITORING_APP
console.log('Initializing connection to MongoDB')
// mongoose.connect('mongodb://localhost:27017/health-monitoring-app', function(
mongoose.connect(MONGOLAB_URI, function(error) {
  if (error) console.error(error)
  else console.log('Successfuly connected to MongoDB')
})

// ===== USER =====

User = require('./models/user.js')

// get all users
app.get('/api/user', function(req, res) {
  User.getAllUsers(function(err, allUsers) {
    if (err) {
      throw err
    }
    console.log(allUsers)
    res.json(allUsers)
  })
})

// get a user with a certain ID
app.get('/api/admin=:adminId&user=:userId', function(req, res) {
  User.getUserById(req.params.adminId, req.params.userId, function(err, user) {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

// add a new user
app.post('/api/user', function(req, res) {
  var user = req.body.user
  let admin_id = req.body.admin_id
  console.log(user)
  console.log(admin_id)
  User.addUser(user, admin_id, function(err, user) {
    if (err) {
      res.send({
        message: 'something went wrong'
      })
      throw err
    } else {
      res.json({
        message: 'Používateľ ' + user.name + ' bol úspešne vytvorený.',
        status: 200,
        user
      })
    }
  })
})

// update a user
app.put('/api/user/:id', function(req, res) {
  var userId = req.params.id
  let adminId = req.body.adminId
  var user = req.body.user
  User.updateUser(adminId, userId, user, function(err, user) {
    if (err) {
      res.send({ message: 'Error', status: 200 })
    } else {
      res.send({
        message: 'Dáta používateľa ' + user.name + ' boli úspešne zmenené.',
        status: 200,
        user: user
      })
    }
  })
})

// remove user permanently
app.delete('/api/user/adminId=:adminId&userId=:userId', function(req, res) {
  let adminId = req.params.adminId
  let userId = req.params.userId
  console.log('userId: ', userId)
  console.log('adminId: ', adminId)
  User.deletePermanentlyUser(adminId, userId, function(err, user) {
    console.log(user)
    if (err) {
      res.send({
        message: 'something went wrong'
      })
      throw err
    } else {
      res.json({
        message: 'Používateľ kolobežky' + user.name + ' bol úspešne vymazaný.',
        status: 200
      })
    }
  })
})

// ===== ADMIN =====

Admin = require('./models/admin.js')

// get all admins
app.get('/api/admin', function(req, res) {
  Admin.getAllAdmins(function(err, allAdmins) {
    if (err) {
      throw err
    }
    console.log(allAdmins)
    res.json(allAdmins)
  })
})

// get a admin with a certain ID
app.get('/api/admin/:id', function(req, res) {
  Admin.getAdminById(req.params.id, function(err, admin) {
    if (err) {
      throw err
    }
    res.json(admin)
  })
})

// add a new admin
app.post('/api/admin', function(req, res) {
  var admin = req.body.admin
  console.log(admin)
  Admin.addAdmin(admin, function(err) {
    if (err) {
      res.send({
        message: 'Admin s emailom ' + admin.email + ' už existuje.',
        status: 404
      })
    } else {
      res.send({ message: 'Úspešne si sa zaregistroval.' })
    }
  })
})

// login admin
app.post('/api/admin/login', function(req, res) {
  var admin = req.body.admin
  console.log(admin)
  Admin.loginAdmin(admin, function(err, admin_db) {
    if (err) {
      res.send({
        message: 'Zadali ste nesprávne prihlasovacie údaje.',
        status: 404
      })
    } else {
      res.send({
        admin_id: admin_db._id,
        admin: admin_db,
        message: 'Prihlásenie prebehlo úspešne.',
        status: 200
      })
    }
  })
})

// update a admin
app.put('/api/admin/:id', function(req, res) {
  var id = req.params.id
  var admin = req.body.admin
  console.log(id)
  console.log(admin)
  Admin.updateAdmin(id, admin, { new: true }, function(err, admin) {
    console.log('admin: ', admin)
    if (err) {
      res.send({ message: 'Error', status: 200 })
    } else {
      res.send({
        message: 'Dáta admina ' + admin.name + ' boli zmenené',
        status: 200,
        admin: admin
      })
    }
  })
})

// change password of a admin
app.put('/api/admin/changePassword/:id', function(req, res) {
  var id = req.params.id
  var admin = req.body.admin
  console.log(id)
  console.log(admin)
  Admin.changePassword(id, admin, {}, function(err, db_admin) {
    console.log('admin: ', db_admin)
    if (err) {
      res.send({ message: 'Error nesprávne prihlasovacie údaje.', status: 200 })
    } else {
      res.send({
        message: 'Heslo admina ' + db_admin.name + ' bolo úspešne zmenené.',
        status: 200
      })
    }
  })
})

// remove admin permanently
app.delete('/api/admin/:id', function(req, res) {
  var id = req.params.id
  Admin.deletePermanentlyAdmin(id, function(err, admin) {
    if (err) {
      res.send({
        message: 'Nastala chyba pri vymávaní admina.'
      })
      throw err
    } else {
      res.json({
        message: 'Váš účet bol úspešne vymazaný.',
        status: 200
      })
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

// // ===== REAL TIME SOCKETS HANDLING =====
// io.on('connection', client => {
//   client.on('subscribeToHeartRate', (interval, adminId) => {
//     console.log('interval, adminId: ', interval, adminId)
//     console.log('client is subscribing to timer with interval ', interval)
//     // Admin.getAdminById(adminId, function(err, admin) {
//     //   if (err) {
//     //     throw err
//     //   }
//     //   let usersLength = admin.users.length
//     //   setInterval(() => {
//     //     let heartRates = []
//     //     for (i = 0; i < usersLength; i++) {
//     //       heartRates.push(Math.floor(Math.random() * 100 + 50))
//     //     }
//     //     User.heartRateAll(adminId, function(err, user) {})
//     //     console.log(heartRates)
//     //     client.emit('heartRate', heartRates)
//     //   }, interval)
//     // })
//   })
// })

// const port = 8000
// io.listen(port)
// console.log('listening on port ', port)
