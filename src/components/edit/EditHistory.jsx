import React from 'react';
import EditHistoryList from './EditHistoryList';
import './EditHistory.scss';

const EditHistory = ({ editInfo }) => {
  const history = editInfo.lastMutation.reduce((acc, cur) => {
    acc.unshift(cur);
    return acc;
  }, []);

  return (
    <div className="history-list">
      {history.map((mutation, idx) => {
        const { author, origin, data } = mutation.conversation;
        const mutations = editInfo.lastMutation;
        const prevMutation = mutations[idx].conversation.origin;
        const originList = Object.entries(origin);
        let userName = '';
        let currentManipulation = 1;

        if (idx !== history.length - 1) {
          for (let item of originList) {
            const name = item[0];
            const prevChange = prevMutation[name];
            const currentChange = item[1];

            if (prevChange !== currentChange) {
              userName = name;
              currentManipulation = currentChange;
              break;
            }
          }
        } else {
          userName = author;
        }

        return (
          <EditHistoryList
            userName={userName}
            currentManipulation={currentManipulation}
            data={data}
            mutation={mutation}
          />
        );
      })}
    </div>
  );
};

export default EditHistory;
