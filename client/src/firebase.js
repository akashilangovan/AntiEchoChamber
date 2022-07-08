import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';
import 'firebase/analytics';
import "firebase/database";


const app = firebase.initializeApp({
  apiKey: "AIzaSyD21Li7w8Sy3yLyzW4NQ0bw3-hyf9f23pk",
          authDomain: "chatmaking-cf320.firebaseapp.com",
          projectId: "chatmaking-cf320",
          storageBucket: "chatmaking-cf320.appspot.com",
          messagingSenderId: "1050099830709",
          appId: "1:1050099830709:web:be3c28cbed1af15b0553fc",
          measurementId: "G-4QF6WJQ3PD"
})

export const auth = app.auth()
export default app

