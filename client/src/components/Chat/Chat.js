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

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
    authDomain: "chatmaking-cf320.firebaseapp.com",
    projectId: "chatmaking-cf320",
    storageBucket: "chatmaking-cf320.appspot.com",
    messagingSenderId: "1050099830709",
    appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
    measurementId: "G-4QF6WJQ3PD"


})
const database = firebase.database();

const ENDPOINT = 'localhost:5000';

let socket;


const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user_socket, setUser_socket] = useState({})
  useEffect(() => {
    const { name, room, socket1 } = queryString.parse(location.search);
    setUser_socket(socket1)
    socket = io(ENDPOINT);
       
    
    
  const ref = database.ref('empty');

    setName(name)
    setRoom(room)
  
    socket.emit('join', { name,room }, (error) => {
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

    
  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
         <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
