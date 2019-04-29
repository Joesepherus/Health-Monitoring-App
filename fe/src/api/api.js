import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8000')

function subscribeToHeartRate(cb, adminId) {
  socket.on('heartRate', heartRate => cb(null, heartRate))
  socket.emit('subscribeToHeartRate', 5000, adminId)
}

export { subscribeToHeartRate }
