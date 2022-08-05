import React from "react"
import Signup from './components/Signup/Signup'
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Waiting from './components/Waiting/Waiting';
import { Container } from "react-bootstrap"
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard.js"
import Login from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'

function App() {
  return (
   
      
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Login} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/Join" exact component={Join} />
              <Route path="/chat" component={Chat} />
              <Route path= "/waiting" component={Waiting} />
              <Route path= "/Dashboard" component={Dashboard} />
            </Switch>
          </AuthProvider>
        </Router>
   
   
  )
}

export default App
