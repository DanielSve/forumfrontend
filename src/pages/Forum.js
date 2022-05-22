import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Forum.css';
import { getAllForumThreads, addThread } from '../services/forumThreadService';
import { formatDate } from "./ShowThread.js"

const Forum = ({ user }) => {
  const [threads, setThreads] = React.useState();
  let navigate = useNavigate();

  const [newThread, setNewThread] = React.useState({
    title: '',
    content: '',
    userId: user.id ? user.id : '',
    date: '',
  });
  console.log(newThread);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const threadRes = await addThread(newThread, user.token);
    const threadsRes = await getAllForumThreads(user.token);
    setThreads(threadsRes);
    setNewThread({ ...newThread, title: '', content: '' });
  };

  const handleChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value, date:new Date().toISOString() });
  };

  React.useEffect(() => {
    const getThreads = async () => {
      const threadsRes = await getAllForumThreads();
      setThreads(threadsRes);
    };
    getThreads();
  }, []);

  const showThread = async (e) => {
    navigate(`/showthread/${e.target.id}`);
  };

  return (
    <div>
      <br></br>
      <h2>Latest threads</h2>
      {threads &&
        threads.map((t, index) => (
          <div
            key={index}
            id={t.id}
            className='thread-preview'
            onClick={showThread}
          >
            <h3 id={t.id} onClick={showThread}>
              {t.title}
            </h3>
            <p className='user2' id={t.id} onClick={showThread}>
              By <span>{t.user.username}</span> {formatDate(t.date)}
            </p>
          </div>
        ))}
      {threads && (
        <h3> {user ? 'Create new thread' : 'Login to create new thread'}</h3>
      )}
      {user && (
        <div className='new-thread'>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type='text'
              name='title'
              value={newThread.title}
              onChange={handleChange}
            ></input>
            <label>Content</label>
            <textarea
              name='content'
              value={newThread.content}
              onChange={handleChange}
            ></textarea>
            <button>Submit thread</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Forum;
