import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form classname = "form">
    <input 
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => {
        setMessage(value)}}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className={message ? "sendButton1" : "sendButton"} onClick={e => sendMessage(e)}>send</button>
  </form>
)

export default Input;