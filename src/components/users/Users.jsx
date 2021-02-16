import React from 'react';
import { users } from '../../utils/constants';
import './Users.scss';

const Users = ({ handleUser }) => {
  return (
    <div className="user-container">
      <div className="text">Sign in as...</div>
      <div className="user">
        {users.map((user, index) => (
          <div
            className="user-text"
            key={`${user}-${index}`}
            onClick={(e) => handleUser(e, user)}
          >
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
