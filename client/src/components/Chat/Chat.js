import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import app from '../../firebase'     // <------  import firebase
import './Chat.css';

const database = app.database();

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
      const messages_ref = database.ref('full/'+room+'/messages') //replace with API call. Shouldn't be accessing DB from UI...

      messages_ref.once('value',(data) => {if(data.val() != null){
        setMessages(data.val())}}) ;   
      
      
      const ref = database.ref('empty');
                          
      setName(name)
      console.log("from chat: ")
      console.log(name, room, interest, stance)
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
        //Call rest api endpoint to update messages
        const ref = database.ref('full');
        const {room} = queryString.parse(location.search);
        const hopperRef = ref.child(room);
        if((messages.length) != 0){
          console.log(messages)

        hopperRef.update({
          'messages': messages
    })
  };

  }, [messages]);

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
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
    );
}

export default Chat;


