import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import EditHistory from './EditHistory';
import EditText from './EditText';
import { mutationTitles } from '../../utils/constants';
import './Edit.scss';

const Edit = ({ editInfo, setEdit, user }) => {
  const [text, setText] = useState(editInfo.text);
  const { lastMutation } = editInfo;
  const lastConversation = lastMutation[lastMutation.length - 1].conversation;
  const origin = Object.values(lastConversation.origin);
  const data = {
    labels: ['alice', 'bob'],
    datasets: [{ label: 'Mutation History', data: origin, minBarLength: 5 }],
  };
  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
            max: lastMutation.length + 3,
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (editInfo.text !== text) {
      setText(editInfo.text);
    }
  }, [editInfo]);

  return (
    <div className="edit-component">
      <div className="chart">
        <HorizontalBar data={data} options={options} />
      </div>
      <div>
        <EditText
          lastConversation={lastConversation}
          text={text}
          origin={origin}
          setEdit={setEdit}
          user={user}
        />
      </div>
      <div className="edit-history">
        <div className="text">Mutation History</div>
        <div className="edit-history-list">
          {mutationTitles.map((title) => (
            <div key={title} className="title">
              {title}
            </div>
          ))}
        </div>
        <EditHistory user={user} editInfo={editInfo} />
      </div>
    </div>
  );
};

export default Edit;
