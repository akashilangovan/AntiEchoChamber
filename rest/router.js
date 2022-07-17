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

// function uuidv4() {
//   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//   );
// }
 
server.post("/addtoqueue", (req, res) =>{
  const empty_ref = db.ref('empty')
  const user = req['body']['username']; 
  const interest = req['body']['interest']
  const stance = req['body']['stance']
  // var done = False; 
  let first = true; 
  empty_ref.once('value',(data) => {
    if(data.val() != null && (!done)){
    let push = true
      const empty_queue = data.val()
      for (const key in empty_queue) {
        if (empty_queue[key].interest === interest && empty_queue[key].user != user && empty_queue[key].stance != stance){
           
            // setRoom(empty_queue[key].roomid)
            db.ref('full').update ({[empty_queue[key].roomid]: {
              user1: user,
              user2: empty_queue[key].user,
              interest:interest,
              roomid: empty_queue[key].roomid,
              messages: []
            }})
            // setMove(true)
            empty_ref.child(key).remove() 

            // return false
          
            push = false; 
            res.send("The user has been processed").status(200)
            
        }
      
    }

      if(push){
        console.log(user + "if statment")

        const newref = empty_ref.push() 
        first = false; 

        newref.set ({
              user: user,
              interest:interest,
              roomid:makeid(10),
              stance:stance
                    
              })
        res.send("The user has been processed").status(200)

      }

      var done = true;
    }
});

  })
  
  server.get("/checkloading/:user", (req, res) => {
    
    const user = req.params.user; 
    const full_ref = db.ref('full')
    // full_ref.once('value',(data) => {
    //   const full_rooms = data.val()
    //   var done = false; 
      
    //     for(const room in full_rooms){
    //       console.log(full_rooms[room]['user1'], full_rooms[room]['user2'] )
    //       if((full_rooms[room]['user1'] == user) || (full_rooms[room]['user2'] == user)){
    //         res.send("The user is in a room ").status(200)
    //         done = true

    //       }
    //     }
      

    // })
    full_ref.on('value',(data) => {
      console.log("on value here")
      const full_rooms = data.val()
      var done = false; 
        for(const room in full_rooms){
          console.log("loop")
          if((full_rooms[room]['user1'] == user) || (full_rooms[room]['user2'] == user)){
            res.send("The user has been processed").status(200)
            done = true

          }
        }
      

    })


  }
  )
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
        console.log("idc man")
      }
      
  }}) ;

    
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


//UNDERSTAND ASYNC AWAIT IN FULL DETAIL 
//PROMISES TOO
//FULL Firebase dealings