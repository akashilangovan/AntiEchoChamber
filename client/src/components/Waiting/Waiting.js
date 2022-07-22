import React, { useState, useEffect, Comp } from "react";
import { Link } from "react-router-dom";

import queryString from 'query-string';
import io from "socket.io-client";


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/database";
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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

const database = firebase.database();
const ENDPOINT = 'localhost:5000';
let socket;
const Waiting = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [firebaseusers, setFirebaseusers] = useState({})
    const [move, setMove ] = useState(false)
    const [latestuser, setLatestuser] = useState('')
    const [push, setPush] = useState(true)
    const [roomid, setRoomid] = useState('')
    const [stance, setStance] = useState('')
    const [interest, setInterest] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const { name, room, stance, interest } = queryString.parse(location.search);
     
      socket = io('localhost:5000');
      
      
      const ref = database.ref('empty');
        setInterest(room)
        setStance(stance)
        setName(name)
        setRoom(room)
        console.log(room)

        setLatestuser(name)
      //   const postbody  = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({user: name,
      //       interest: interest, 
      //       stance: stance })
      // };
      //  const response = await fetch('http://localhost:8080/addtoqueue', postbody);
      //  const data = await response.json();
      //  console.log(data)
      //  const load_url = 'http://localhost:8080/checkloading/' + name
      //  const loading_done = await fetch(load_url)
      //  const load_status = await response.json();
      //  console.log(load_status)

        //Make AddtoQueue post call 
        //Make and wait for CheckLoading Status(display loading)
        //Show join chat button when loading is done!!
        // ref.once('value',(data) => {setFirebaseusers(data.val())}) ;
        console.log(interest)
        const handle_user = async () =>{
          console.log("fasdss")
              const postbody  = {
                method: 'POST',
                headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify({username: name,
                  interest: room, 
                  stance: stance })
            };
            // const postbody1 = {
            //      user: name,
            //       interest: interest, x
            //       stance: stance }
            
            // axios.post(`http://localhost:8080/addtoqueue`, { postbody1 })
            // .then(res => {
            //   console.log("hre")

            //   console.log(res);
            //   console.log(res.data);
            // })

            const response = await fetch('http://localhost:8080/addtoqueue', postbody);

            const data = await response.text();
            console.log(data)
              
               const load_url = 'http://localhost:8080/checkloading/' + name
               const loading_done = await fetch(load_url)
               const load_status = await loading_done.text();
               setLoading(false)
               console.log(load_status)

  
      }
      
      handle_user().catch(console.error);;

    }, []);

   
       


    // useEffect(() => {     //All of this component should be in the API. This component should just call the AddtoQueue method and wait till response, and show loading screen meanwhile. 
    //                       //AddtoQueue will only return when a chat mate has been found. 
        
    //     const { name, room } = queryString.parse(location.search)
       
    //     const ref = database.ref('empty');
    //     var changed = false
    //     const roomid = makeid(10)
    //     const  loop= async() => {
    //       if(firebaseusers === null){
    //         return true
    //       }
    //       if(Object.keys(firebaseusers).length === 0){
    //         return false
    //       }
    //         for (const key in firebaseusers) {
    //           if (firebaseusers[key].interest === room && firebaseusers[key].user != name && firebaseusers[key].stance != stance){
                
    //               setRoom(firebaseusers[key].roomid)
    //               var roomid_ = firebaseusers[key].roomid
    //                 changed = true
    //               database.ref('full').update ({[firebaseusers[key].roomid]: {
    //                 user1: name,
    //                 user2: firebaseusers[key].user,
    //                 interest:room,
    //                 roomid: firebaseusers[key].roomid,
    //                 messages: []
    //               }})
    //               setMove(true)
    //               ref.child(key).remove() 
    //               console.log("here")
    //               return false
    //           }
            
    //       }
    //       return true
    //     }


    //     const should_push = async() => {
    //       var finalpush = await loop();
          
    //       if(finalpush === undefined){
    //         finalpush = false
    //       }
    //       console.log(push, finalpush)
    //       if(push && finalpush)
    //           {
                  
    //               const newref = ref.push() 
    //               newref.set ({
    //               user: name,
    //               interest:room,
    //               roomid:roomid,
    //               stance:stance
                  
    //               })
    //               setPush(false)
    //           }
    //     }
    
    //     should_push()
   
    //     if(!changed){
    //     setRoom(roomid)
    //  } }, [firebaseusers]);
        
      const showButton  = (<div >
        <Link to={`/chat?name=${name}&room=${room}&interest=${interest}&stance=${stance}`}>
        <button className={'button mt-20'} type="submit">Enter Chat Room</button>
        </Link>
        </div>);
      const waiting = (
        <div>
          waiting
        </div>
      );
      return(
        <div className="App">
        {/* <Link to={`/chat?name=${name}&room=${room}&interest=${interest}&stance=${stance}`}> */}
          {loading ? waiting : showButton}
        {/* <button className={'button mt-20'} type="submit">Enter Chat Room</button> */}
        {/* </Link> */}
        </div>
      );
      
      
      }
  


export default Waiting;