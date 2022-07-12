const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const auth = require('firebase/auth');
const analytics = require('firebase/analytics');
const databse = require('firebase/database');

const fb = firebase.initializeApp({
  apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
          authDomain: "chatmaking-cf320.firebaseapp.com",
          projectId: "chatmaking-cf320",
          storageBucket: "chatmaking-cf320.appspot.com",
          messagingSenderId: "1050099830709",
          appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
          measurementId: "G-4QF6WJQ3PD"
})

// auth = app.auth()
module.exports = {fb}

