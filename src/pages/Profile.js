import React from 'react';
import { getThreadsByUserId } from '../services/forumThreadService';
import '../Profile.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/userService';


const Profile = ({ user }) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState();
  const [usersThreads, setUsersThreads] = React.useState('');
  console.log(user);
  console.log(userInfo);

  
  

  //   console.log(usersThreads[0].title);

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
        <div className="profile-card">
        {userInfo && 
        <div>
            <p>{userInfo.userName}</p> 
            <p>{userInfo.email}</p>
            </div>}
          
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
            <p id = {t.id}>{t.title}</p>
          </div>
        ))}
    </div>
  );
};

export default Profile;
