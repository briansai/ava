import React, { Fragment } from 'react';
import './EditHistoryList.scss';

const EditHistoryList = ({ userName, currentManipulation, data }) => {
  const { type, index, text } = data;
  return (
    <Fragment>
      <div className="mutation">{userName}</div>
      <div className="mutation">{currentManipulation}</div>
      <div className="mutation">{type}</div>
      <div className="mutation">{index}</div>
      <div className="mutation">'{text}'</div>
    </Fragment>
  );
};

export default EditHistoryList;
