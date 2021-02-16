import React, { Fragment, useState, useEffect } from 'react';
import useRequest from './hooks/useRequest';
import Edit from './components/edit/Edit.jsx';
import Conversations from './components/conversations/Conversations';
import Users from './components/users/Users';
import './App.scss';

const App = () => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState('');
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

  const handleUser = (e, person) => {
    e.preventDefault();
    setUser(person);
  };

  const clickConversation = (conversation) => (e) => {
    e.preventDefault();
    setEdit(true);
    setEditInfo(conversation);
  };

  return (
    <Fragment>
      {user ? (
        <Fragment>
          <div className="edit">
            {edit && <Edit editInfo={editInfo} setEdit={setEdit} user={user} />}
          </div>
          <div className="App">
            <Conversations
              setEditInfo={setEditInfo}
              list={list}
              clickConversation={clickConversation}
              user={user}
            />
          </div>
        </Fragment>
      ) : (
        <div className="users">
          <Users handleUser={handleUser} />
        </div>
      )}
    </Fragment>
  );
};

export default App;
