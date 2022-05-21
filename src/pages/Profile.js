import React from 'react';
import { getThreadsByUserId } from '../services/forumThreadService';
import '../css/Profile.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/userService';

const Profile = ({ user }) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState();
  const [usersThreads, setUsersThreads] = React.useState('');

  React.useEffect(() => {
    const setThreads = async () => {
      const threads = await getThreadsByUserId(user.id);
      setUsersThreads(threads);
    };
    user && setThreads();
  }, []);

  React.useEffect(() => {
    const setUsersInfo = async () => {
      const info = await getUserInfo(user.id, user.token);
      setUserInfo(info);
    };
    user && setUsersInfo();
  }, []);

  const showThread = async (e) => {
    console.log(e.target.id);
    navigate(`/showthread/${e.target.id}`);
  };

  return (
    <div className='profile'>
      <div className='profile-card'>
        {userInfo && (
          <div>
            <p><strong>Username:</strong> {userInfo.userName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        )}
      </div>
      {usersThreads && <h2>Your threads</h2>}
      {usersThreads &&
        usersThreads.map((t, index) => (
          <div
            key={index}
            id={t.id}
            className='thread-preview'
            onClick={showThread}
          >
            <h3 id={t.id}>{t.title}</h3>
            <p id={t.id}>{t.date.substring(0,10)}</p>
          </div>
        ))}
    </div>
  );
};

export default Profile;
