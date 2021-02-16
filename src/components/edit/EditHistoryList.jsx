import React from 'react';

const EditHistoryList = ({ userName, currentManipulation, data, mutation }) => {
  const { type, index, text } = data;
  return (
    <div key={mutation.id} className="history">
      <div className="mutation">{userName}</div>
      <div className="mutation">{currentManipulation}</div>
      <div className="mutation">{type}</div>
      <div className="mutation">{index}</div>
      <div className="mutation">'{text}'</div>
    </div>
  );
};

export default EditHistoryList;
