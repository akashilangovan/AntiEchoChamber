const express = require("express");
const server = express();
const { v4: uuidv4 } = require('uuid');
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
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


server.post("/addtoqueue", (req, res) =>{
  const empty_ref = db.ref('empty')
  const user = req['body']['username']; 
  const interest = req['body']['interest']
  const stance = req['body']['stance']

  let first = true; 
  empty_ref.once('value',(data) => {
    if(data.val() != null && (!done)){
    let push = true
      const empty_queue = data.val()
      for (const key in empty_queue) {
        if (empty_queue[key].interest === interest && empty_queue[key].user != user && empty_queue[key].stance != stance){
           
            db.ref('full').update ({[empty_queue[key].roomid]: {
              user1: user,
              user2: empty_queue[key].user,
              interest:interest,
              roomid: empty_queue[key].roomid,
              messages: []
            }})
            empty_ref.child(key).remove() 

          
            push = false; 
            console.log(user + " has been added to the queue")
            res.send(user + " has been added to the queue").status(200)
            
        }
      
    }

      if(push){

        const newref = empty_ref.push() 
        first = false; 

        newref.set ({
              user: user,
              interest:interest,
              roomid:makeid(10),
              stance:stance
                    
              })
        console.log(user + " has been added to the queue")
        res.send(user + " has been added to the queue").status(200)

      }

      var done = true;
    }
});

  })
  
  server.get("/checkloading/:user", (req, res) => {
    
    const user = req.params.user; 
    const full_ref = db.ref('full')
   
    full_ref.on('value',(data) => {
      const full_rooms = data.val()
      var done = false; 
        for(const room in full_rooms){
          if((full_rooms[room]['user1'] == user) || (full_rooms[room]['user2'] == user)){
            console.log(user + " has been put in a room")
            res.send(user + " has been put in a room").status(200)
            full_ref.off()
            done = true
            return 

          }
        }
      

    })



  }
  )
  server.get("/rooms", (req, res) => {
   
    const full_ref = db.ref('full')
    full_ref.on('value',(data) => {if(data.val() != null){
      const output = data.val() 
      if(output){
       
        for(let i in output){
          console.log(output[i])
          if(output[i]['interest'] == 'Vaccines'){
              console.log("here")
              res.send({full_rooms:data}).status(200)

          }
        }
      }
      else{
        console.log("idc man")
      }
      
  }}) ;

    
  
})

module.exports = server;

