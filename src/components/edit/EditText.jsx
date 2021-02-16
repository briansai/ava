import React, { useState, Fragment } from 'react';
import { postMutation } from '../../api/mutation';
import { deleteText, insertText } from '../../utils/methods';
import { getPosition } from '../../utils/functions';
import { actions } from '../../utils/constants';
import './EditText.scss';

const EditText = ({ user, lastConversation, text, setEdit }) => {
  const [sentence, setSentence] = useState(text);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [selectedWord, setSelectedWord] = useState({
    word: '',
    key: '',
  });
  const [editedText, setEditedText] = useState(selectedWord.word);
  const [changes, setChanges] = useState([]);
  const [clickedAction, setClickedAction] = useState('');
  const splitText = sentence.split(' ');
  const { author, conversationId } = lastConversation;
  const editData = ` ${selectedWord.word}`;

  const duplicates = splitText.reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : (acc[cur] = 1);
    return acc;
  }, {});

  const arrowClick = (e, word, key) => {
    e.preventDefault();
    setArrowClicked(true);
    setSelectedWord({ word, key });
  };

  const handleInput = (e) => {
    setEditedText(e.target.value);
  };

  const editClick = () => {
    let editOrigin = lastConversation.origin;
    let textPosition = 0;

    if (duplicates[selectedWord.word] > 1) {
      const duplicateSelected = splitText.reduce((acc, cur, idx) => {
        cur === selectedWord.word &&
          acc.push({
            key: `${cur}-${idx}`,
          });
        return acc;
      }, []);

      const targetIndex = duplicateSelected.findIndex((selected) => {
        return selectedWord.key === selected.key;
      });

      textPosition = getPosition(text, editData, targetIndex);
    } else {
      textPosition = text.indexOf(editData);
    }

    if (!text.includes(editedText)) {
      editOrigin[user]++;
      const deleteRequest = {
        author,
        conversationId,
        data: {
          index: textPosition,
          text: editData,
          type: 'delete',
          length: editData.length,
        },
        origin: editOrigin,
      };

      editOrigin[user]++;
      const editRequest = {
        author,
        conversationId,
        data: {
          index: textPosition,
          text: textPosition ? ` ${editedText}` : `${editedText} `,
          type: 'insert',
        },
        origin: editOrigin,
      };
      const startString = sentence.substring(
        0,
        textPosition === 0 ? textPosition : textPosition + 1
      );
      const endString =
        textPosition !== 0
          ? sentence.substring(textPosition + editData.length)
          : sentence.substring(textPosition + editData.length - 1);

      setChanges(changes.concat([deleteRequest, editRequest]));
      setSentence(startString + editedText + endString);
      setClickedAction('');
    }
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const promises = changes.map((change) => {
      if (change.data.type === 'insert') {
        return postMutation(insertText(change));
      }

      return postMutation(deleteText(change));
    });

    Promise.all(promises);

    setEdit(false);
  };

  const handleAction = (e) => {
    e.preventDefault();
    setClickedAction(e.target.innerText);
  };

  return (
    <Fragment>
      <div className="edit-container">
        {splitText.map((word, index) => {
          const key = `${word}-${index}`;
          return (
            <Fragment>
              {selectedWord.key === key && clickedAction === 'Edit' ? (
                <div className="input-container">
                  <input
                    value={editedText}
                    placeholder={selectedWord.word}
                    onChange={handleInput}
                    className="input"
                  />
                  <button className="edit-button" onClick={editClick}>
                    Edit
                  </button>
                </div>
              ) : (
                <div key={key} className="word-container">
                  <div className="word">{word}</div>
                  <div
                    className="arrow"
                    onClick={(e) => arrowClick(e, word, key)}
                  />
                  {selectedWord.key === key && arrowClicked && (
                    <div
                      className={
                        word === selectedWord.word ? 'selected' : 'none'
                      }
                      onClick={handleAction}
                    >
                      {actions.map((action, index) => (
                        <div
                          value={action}
                          key={`${action}-${index}`}
                          className="action"
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button onClick={(e) => saveChanges(e)}>SAVE CHANGES</button>
      </div>
    </Fragment>
  );
};

export default EditText;
