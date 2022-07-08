import React, { useState, useEffect, Comp } from "react";
import { Link } from "react-router-dom";

import queryString from 'query-string';
import io from "socket.io-client";


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/database";

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

    useEffect(() => {
      const { name, room, stance, interest } = queryString.parse(location.search);
     
      socket = io('localhost:5000');
      
      
      const ref = database.ref('empty');
        setInterest(room)
        setStance(stance)
        setName(name)
        setRoom(room)
        setLatestuser(name)
        ref.once('value',(data) => {setFirebaseusers(data.val())}) ;
     
      
    }, []);
    useEffect(() => {
        
        const { name, room } = queryString.parse(location.search)
       
        const ref = database.ref('empty');
        var changed = false
        const roomid = makeid(10)
        const  loop= async() => {
          if(firebaseusers === null){
            return true
          }
          if(Object.keys(firebaseusers).length === 0){
            return false
          }
            for (const key in firebaseusers) {
              if (firebaseusers[key].interest === room && firebaseusers[key].user != name && firebaseusers[key].stance != stance){
                
                  setRoom(firebaseusers[key].roomid)
                  var roomid_ = firebaseusers[key].roomid
                    changed = true
                  database.ref('full').update ({[firebaseusers[key].roomid]: {
                    user1: name,
                    user2: firebaseusers[key].user,
                    interest:room,
                    roomid: firebaseusers[key].roomid,
                    messages: []
                  }})
                  setMove(true)
                  ref.child(key).remove() 
                  console.log("here")
                  return false
              }
            
          }
          return true
        }
        const should_push = async() => {
          var finalpush = await loop();
          
          if(finalpush === undefined){
            finalpush = false
          }
          console.log(push, finalpush)
          if(push && finalpush)
        {
            
            const newref = ref.push() 
            newref.set ({
            user: name,
            interest:room,
            roomid:roomid,
            stance:stance
            
            })
            setPush(false)
        }
        }
    
        should_push()
   
        if(!changed){
        setRoom(roomid)
     } }, [firebaseusers]);
        
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
          {move ? showButton: waiting}
        </div>
      );
      
      
      }
  


export default Waiting;