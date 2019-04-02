const mongoose = require('mongoose')
const MONGOLAB_URI = process.env.MONGOLAB_URI_HEALTH_MONITORING_APP

mongoose.connect(MONGOLAB_URI, { useNewUrlParser: true })

mongoose.connection
  .once('open', function() {
    console.log('Connected to DB')
  })
  .on('error', function(error) {
    console.log('Error happened while connecting to the DB ', error)
  })
