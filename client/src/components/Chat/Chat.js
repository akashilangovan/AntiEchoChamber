import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/database";


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

const ENDPOINT = 'localhost:5000';

let socket;


const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [push, setPush] = useState(false)
  const [stance, setStance] = useState('');
  const [interest, setInterest] = useState('');
  
  
  useEffect(() => {
    const { name, room, stance, interest } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room)
    setInterest(interest)
    setStance(stance)
    console.log(room)
    const messages_ref = database.ref('full/'+room+'/messages')

    messages_ref.once('value',(data) => {if(data.val() != null){
      setMessages(data.val())}}) ;   
    
    
  const ref = database.ref('empty');

    setName(name)
  
    socket.emit('join', { name,room, interest, stance }, (error) => {
      if(error) {
        alert(error);
      }
    });
  
   
   
 
    
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);
useEffect(() => {
      const ref = database.ref('full');
      const {room} = queryString.parse(location.search);
      const hopperRef = ref.child(room);
      if((messages.length) != 0){
      hopperRef.update({
        'messages': messages
})};

  
  
}, [message]);


    
  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setPush(!push)
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
         <InfoBar room={room } />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
