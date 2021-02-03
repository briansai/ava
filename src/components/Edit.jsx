import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import './Edit.scss';

const Edit = ({ editInfo }) => {
  const { lastMutation } = editInfo;
  const origin = Object.values(
    lastMutation[lastMutation.length - 1].conversation.origin
  );
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
          },
        },
      ],
    },
  };

  return (
    <div className="edit-component">
      <div className="chart">
        <HorizontalBar data={data} options={options} />
      </div>
      <div className="edit-container">
        <input className="edit-input" value={editInfo.text} />
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
};

export default Edit;
