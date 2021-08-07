import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>ANTI ECHO CHAMBER! <span role="img" aria-label="emoji"></span></h1>
      
      
      <h2>Created with React, Express, Node, firebase and Socket.IO <span role="img"></span></h2>
      
    </div>
    {
      users
        ? (
          <div>
            <h1>Currently in Room:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name, stance, interest}) => (
                  <div key={stance} className="activeItem">
                    {'-'+name + " "+stance+" "+interest }
                    
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;