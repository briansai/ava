import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import './conversations.scss';

const Conversations = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [queue, addToQueue] = useState([]);

  const { doRequest: getConversations, errors: convoErrors } = useRequest({
    url: `/conversations`,
    method: 'get',
    body: {},
    onSuccess: (data) => setList(data.conversations),
  });

  const { doRequest: postMutation, errors: mutationErrors } = useRequest({
    url: `/mutations`,
    method: 'post',
    body: { text },
    onSuccess: (res) => {
      const queueList = queue;
      queueList.shift();
      addToQueue(queueList);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await getConversations();
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const q = queue;
      q.push(text);
      addToQueue(q);
      await postMutation();
      setText('');
    }
  };

  return (
    <div className="conversations">
      <h1 className="conversations-header">Conversations</h1>
      <div className="conversations-list">
        {list.map((conversation) => {
          const { id, text } = conversation;
          return (
            <div className="conversation">
              <div key={id} className="text">
                {text}
              </div>
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
