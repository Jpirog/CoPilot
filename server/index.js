require('dotenv').config();
const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const socket = require('socket.io')
const {blue,green}  = require("chalk")

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    const server =app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    const io = socket(server);
    io.on('connection', (socket) => {
      console.log(blue('a user connected'));
      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
      socket.on('disconnect', () => {
        console.log(green('user disconnected'));
      });
    });
  } catch (ex) {
    console.log(ex)
  }
}

init()
