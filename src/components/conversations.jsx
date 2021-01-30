import React, { useState } from 'react';
import './conversations.scss';

const Conversations = () => {
  const [input, setInput] = useState('');
  const [queue, addToQueue] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      // put input data along with user information to queue
      // post input to backend
      // wait for response from before removing queue
      e.preventDefault();
      setInput('');
    }
  };

  return (
    <div className="conversations">
      <h1 className="conversations-header">Conversations</h1>
      <div className="conversations-list">potato</div>
      <textarea
        className="text-box"
        placeholder=" Input Text And Press Enter"
        onChange={handleInput}
        onKeyPress={keyPress}
      ></textarea>
    </div>
  );
};

export default Conversations;
