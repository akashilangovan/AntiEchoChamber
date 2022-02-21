import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


    const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
          authDomain: "chatmaking-cf320.firebaseapp.com",
          projectId: "chatmaking-cf320",
          storageBucket: "chatmaking-cf320.appspot.com",
          messagingSenderId: "1050099830709",
          appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
          measurementId: "G-4QF6WJQ3PD"
      
      
      })
  
      const Login = ( ) => {
      const {
        user,
        signOut,
        signInWithGoogle,
      } = this.props;
  
      return (
        <div className="App">
          <header className="App-header">
            
            {
              user
                ? <Link to={`/join?name=${user.displayname}`}>
                <button className={'button mt-20'} type="submit">Sign In</button>
              </Link>
                : <p>Please sign in.</p>
            }
  
            {
              user
                ? <button onClick={signOut}>Sign out</button>
                : <button onClick={signInWithGoogle}>Sign in with Google</button>
            }
          </header>
        </div>
      );
    }
  
  
  const firebaseAppAuth = firebaseApp.auth();
  
  const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };
  
  export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(Login);
