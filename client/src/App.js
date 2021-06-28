import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Waiting from './components/Waiting/Waiting';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path= "/waiting" component={Waiting} />
    </Router>
  );
}

export default App;
