import React, { Fragment, useState, useEffect } from 'react';
import useRequest from './hooks/useRequest';
import Edit from './components/edit/Edit.jsx';
import Conversations from './components/conversations/Conversations';
import './App.scss';

const App = () => {
  const [edit, setEdit] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [list, setList] = useState([]);
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

  const clickConversation = (conversation) => (e) => {
    e.preventDefault();
    setEdit(true);
    setEditInfo(conversation);
  };

  return (
    <Fragment>
      <div className="edit">
        {edit && <Edit editInfo={editInfo} setEdit={setEdit} />}
      </div>
      <div className="App">
        <Conversations
          setEditInfo={setEditInfo}
          list={list}
          clickConversation={clickConversation}
        />
      </div>
    </Fragment>
  );
};

export default App;
