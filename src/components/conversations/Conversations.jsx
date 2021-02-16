import axios from 'axios';
import React, { useState } from 'react';
import './Conversations.scss';

const Conversations = ({ user, list, clickConversation }) => {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      if (text.indexOf(' ')) {
        const words = text.split(' ');
        let count = {};
        let originData = {
          alice: 0,
          bob: 0,
        };
        let sentence = '';

        words.forEach(async (word, idx) => {
          let insertIndex = 0;
          let targetWord = '';

          const inputWord = () => {
            if (idx === 0) {
              targetWord = word;
              sentence = word;
              count[word] = 1;
            } else if (idx !== 0) {
              count[word] ? count[word]++ : (count[word] = 1);
              insertIndex = sentence.length;
              sentence += ` ${word}`;
              targetWord = ` ${word}`;
            }
          };

          originData[user]++;

          inputWord();

          await axios.post('/mutations', {
            author: user,
            conversationId: list.length,
            data: {
              index: insertIndex,
              text: targetWord,
              type: 'insert',
            },
            origin: originData,
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
          const { id, text, lastMutation } = conversation;
          const author =
            lastMutation[lastMutation.length - 1].conversation.author;
          const conversationClass =
            author === user ? 'conversation-right' : 'conversation-left';
          return (
            <div
              key={id}
              className={`${conversationClass}`}
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
