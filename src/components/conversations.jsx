import axios from 'axios';
import React, { useState } from 'react';
import './Conversations.scss';

const Conversations = ({ list, clickConversation }) => {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      if (text.indexOf(' ')) {
        const words = text.split(' ');

        words.forEach(async (word, idx) => {
          let insertIndex = 0;
          let targetWord = '';

          const inputWord = () => {
            if (idx === 0) {
              insertIndex = text.indexOf(word);
              targetWord = word;
            } else if (idx !== 0) {
              insertIndex = text.indexOf(` ${word}`);
              targetWord = ` ${word}`;
            }
          };

          inputWord();

          await axios.post('/mutations', {
            author: 'alice',
            conversationId: list.length,
            data: {
              index: insertIndex,
              text: targetWord,
              type: 'insert',
            },
            origin: {
              alice: idx,
              bob: 0,
            },
          });

          window.location.reload();
        });
      }

      setText('');
      e.preventDefault();
    }
  };

  return (
    <div className="conversations">
      <h1 className="conversations-header">Conversations</h1>
      <div className="conversations-list">
        {list.map((conversation) => {
          const { id, text } = conversation;
          return (
            <div
              key={id}
              className="conversation"
              onClick={clickConversation(conversation)}
            >
              <div className="text">{text}</div>
            </div>
          );
        })}
      </div>
      <textarea
        value={text}
        className="text-box"
        placeholder=" Input Text And Press Enter"
        onChange={handleInput}
        onKeyPress={keyPress}
      />
    </div>
  );
};

export default Conversations;
