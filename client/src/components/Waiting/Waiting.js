import React, { useState, useEffect, Comp } from "react";
import gif from "../../assets/waiting.gif"
import { Link } from "react-router-dom";
import queryString from 'query-string';
import io from "socket.io-client";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/database";

const database = firebase.database();
const ENDPOINT = 'localhost:5000';
let socket;
const Waiting = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
   
    const [latestuser, setLatestuser] = useState('')
  
    const [stance, setStance] = useState('')
    const [interest, setInterest] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const { name, room, stance, interest } = queryString.parse(location.search);
     
      socket = io(ENDPOINT);
      
      
      const ref = database.ref('empty');
        setInterest(room)
        setStance(stance)
        setName(name)
        setRoom(room)
        console.log(room)

        setLatestuser(name)
     
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
             const showButton  = (<div >
        <Link to={`/chat?name=${name}&room=${room}&interest=${interest}&stance=${stance}`}>
        <button className={'button mt-20'} type="submit">Enter Chat Room</button>
        </Link>
        </div>);
      const waiting = (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
          <img src={gif} alt="searching..." />
        </div>
      );
      return(
        <div className="App">
          {loading ? waiting : showButton}
        </div>
      );
      
      
      }
  


export default Waiting;