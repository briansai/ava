import React from 'react';
import './EditHistory.scss';

const EditHistory = ({ editInfo }) => {
  const history = editInfo.lastMutation.reduce((acc, cur) => {
    acc.unshift(cur);
    return acc;
  }, []);

  console.log(history);
  return (
    <div>
      {history.map((mutation) => {
        const { origin, data, conversationId } = mutation.conversation;
        const user = Object.keys(origin);
        const { type, index, text } = data;
        return (
          <div className="history">
            <div className="mutation">{user[0]}</div>
            <div className="mutation">{type}</div>
            <div className="mutation">{index}</div>
            <div className="mutation">{text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditHistory;
