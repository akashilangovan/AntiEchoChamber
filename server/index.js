const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const auth = require('firebase/auth');
const analytics = require('firebase/analytics');
const databse = require('firebase/database');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
const { Console } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(router);
if (!firebase.apps.length) {
  firebase.initializeApp({
      apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
        authDomain: "chatmaking-cf320.firebaseapp.com",
        projectId: "chatmaking-cf320",
        storageBucket: "chatmaking-cf320.appspot.com",
        messagingSenderId: "1050099830709",
        appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
        measurementId: "G-4QF6WJQ3PD"
    
    
    })
}else {
  firebase.app(); // if already initialized, use that one
}
const database = firebase.database();

io.on('connection', (socket) => { 
  socket.on('join', ({ name, room, interest, stance }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, interest, stance });

    if(error) return callback(error);

    socket.join(user.room);

    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      curr_room = user.room
    }
    
    const ref = database.ref('full');
    //ref.once('value',(data) => {loop(data)}) ;
  })
});
const  getusers= async(data) => {
  return data.val()
  
}
const remove = async(key) => {
  const ref = database.ref('full');
  ref.child(key).remove() 
  return true
}
const loop = async(data) => {
  const firebaseusers = await getusers(data)
  
  for (const key in firebaseusers) {
   

    if (JSON.stringify(firebaseusers[key].roomid.toLowerCase()) === JSON.stringify(curr_room).toLowerCase()){
     
        const removed = await remove(key);
        if(removed){
          console.log("Chat removed from queue")

        }
        
    }
}
}
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));