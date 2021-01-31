import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import './conversations.scss';

const Conversations = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [queue, addToQueue] = useState([]);

  const { doRequest } = useRequest({
    url: `/conversations`,
    method: 'get',
    body: {},
    onSuccess: (data) => setList(data.conversations),
  });

  useEffect(() => {
    const fetchData = async () => {
      await doRequest();
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      const q = queue;

      if (text.indexOf(' ')) {
        const words = text.split(' ');
        // put each of the words into the queue

        words.forEach(async (word, idx) => {
          q.push({ author: 'alice', conversationId: idx, text: word });
          axios
            .post('/mutations', {
              author: 'alice',
              conversationId: idx,
              data: {
                index: 0,
                length: undefined,
                text: word,
                type: 'insert',
              },
              origin: {
                alice: idx,
                bob: 0,
              },
            })
            .then((res) => {
              const { conversationId } = JSON.parse(res.config.data);
              const queueList = queue;
              const itemIndex = queueList.findIndex(
                (item) => item.conversationId === conversationId
              );
              queueList.splice(itemIndex, 1);
              addToQueue(queueList);
            });
        });
        addToQueue(q);
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
            <div key={id} className="conversation">
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
