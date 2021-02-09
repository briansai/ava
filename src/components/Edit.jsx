import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import EditHistory from './EditHistory';
import './Edit.scss';
import axios from 'axios';

const Edit = ({ editInfo }) => {
  const [text, setText] = useState(editInfo.text);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [changes, setChanges] = useState([]);
  const { lastMutation } = editInfo;
  const mutationTitles = ['User', 'Change', 'Type', 'Index', 'Text'];
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
            precision: 0,
            max: lastMutation.length + 3,
          },
        },
      ],
    },
  };

  const handleInput = (e) => {
    const index = e.target.selectionStart;
    setText(e.target.value);
    setCursorPosition(index);
  };

  const handleDelete = (e) => {
    const index = e.target.selectionStart;
    if (e.keyCode === 8 && cursorPosition !== index) {
      let startIndex = 0;
      let endIndex = 0;
      let sentence = '';
      let change = changes;

      for (let x = index; x >= 0; x--) {
        // if the character is a space and is not where it started
        if (index !== x && text[x] === ' ') {
          startIndex = x;
          break;
        }

        startIndex = x;
      }

      for (let x = index; x <= text.length; x++) {
        if (text[x] === ' ') {
          endIndex = x;
          break;
        }

        endIndex = x + 1;
      }

      const deletedText = text.substring(startIndex, endIndex + 1);
      const deletedIndex = text.indexOf(deletedText);
      sentence = text.substring(0, startIndex) + text.substring(endIndex);
      setText(sentence);
      setCursorPosition(startIndex);
      change.push({
        length: deletedText.length,
        index: deletedIndex,
        type: 'delete',
        origin: 'alice',
        editedText: deletedText,
      });
      setChanges(change);
    }
  };

  const keyUp = (e) => {
    if (e.keyCode === 8) {
      e.target.selectionStart = cursorPosition;
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let promises = [];

    changes.length &&
      changes.forEach(async (change) => {
        const { index, editedText, type, origin, length } = change;
        const conversation =
          editInfo.lastMutation[lastMutation.length - 1].conversation;
        conversation.origin[origin]++;
        const request = await axios.post('/mutations', {
          author: 'alice',
          conversationId: conversation.conversationId,
          data: {
            index,
            text: editedText,
            type,
            length: length - 1,
          },
          origin: {
            alice: conversation.origin[origin],
            bob: 0,
          },
        });

        promises.push(request);
      });

    await Promise.all(promises);
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
      <div className="edit-container">
        <input
          autoFocus
          className="edit-input"
          value={text}
          onChange={handleInput}
          onKeyDown={handleDelete}
          onKeyUp={keyUp}
        />
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
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
        <EditHistory editInfo={editInfo} />
      </div>
    </div>
  );
};

export default Edit;
