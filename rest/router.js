const express = require("express");
const server = express();
// const onValue = require("firebase/onValue")
var firebase = require('firebase')

const firebaseConfig  = firebase.initializeApp({ 
  apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
          authDomain: "chatmaking-cf320.firebaseapp.com",
          projectId: "chatmaking-cf320",
          storageBucket: "chatmaking-cf320.appspot.com",
          messagingSenderId: "1050099830709",
          appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
          measurementId: "G-4QF6WJQ3PD"
})

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.database()
server.get("/", (req, res) => {
  res.send({ response: "Rest Api for chat server is running. This server only serves the rest element of the application. " }).status(200);
});

server.post("/addtoqueue", (req, res) =>{
  empty_ref = db.ref('empty')
  const user = req['body']['username']; 
  
})
 

server.get("/rooms", (req, res) => {
  // console.log(db)
  // onValue(db, (snapshot)=>{
  //   const data = snapshot.val();
  //   console.log(data)

  // })
  const full_ref = db.ref('full')
  full_ref.on('value',(data) => {if(data.val() != null){
    const output = data.val() 
    if(output){
      // res.send({full_rooms:data}).status(200)
      // console.log(output['jl845gKICW'])
      for(let i in output){
        console.log(output[i])
        if(output[i]['interest'] == 'Vaccines'){
            console.log("here")
            res.send({full_rooms:data}).status(200)// res.send({full_rooms:data}).status(200)

        }
      }
    }
    else{
      // res.send().status(404)
      console.log("idc man ")
    }}}) ;

    
  // res.send().status(200)
})

//ADd to qeuue, pass in username 
//CHeck if username in full list, if so return 
//Otherwise hold? <--- Loading screen logic




//Get messages from certain chat room 
//Get users in a chat room
//Get current users in queue 
//Put new user in queue(returns only when the user is put in a queue, or when timeout. Returns chatroom they were put in)
//Remove user from queue 
//Remove user from chat room 
//Delete chat room 
module.exports = server;
