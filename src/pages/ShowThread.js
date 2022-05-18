import React, { Component } from 'react';
import '../Thread.css';
import { useParams } from 'react-router-dom';
import {
  getThreadById,
  addComment,
  addLike,
  addLikeComment,
} from '../services/forumThreadService';

const ShowThread = ({ user }) => {
  let { id } = useParams();
  const [like, setLike] = React.useState(false);
  const [currentThread, setCurrentThread] = React.useState('');

  const [commentData, setCommentData] = React.useState({
    threadId: id,
    userId: user ? user.id : '',
    content: '',
  });

  const updateThread = async () => {
    const thread = await getThreadById(id);
    setCurrentThread(thread);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(commentData, user.token);
    updateThread();
    setCommentData({ ...commentData, content: '' });
  };

  React.useEffect(() => {
    const setThread = async () => {
      updateThread();
    };
    setThread();
  }, []);

  React.useEffect(() => {
    setLike(
      currentThread.likeThreads &&
        currentThread.likeThreads.filter((l) => l.user.id === user.id).length > 0
        ? true
        : false
    );
  }, [currentThread]);

  const handleChange = (e) => {
    setCommentData({ ...commentData, content: e.target.value });
  };

  const pressLike = async (e) => {
    if (user) {
      setLike(!like);
      await addLike({
        threadId: currentThread.id,
        userId: user.id,
      }, user.token);
      updateThread();
    }
  };

  const pressLikeComment = async (e) => {
    if (user) {
      await addLikeComment({
        commentId: currentThread.comments[e.target.id].id,
        userId: user.id,
      }, user.token);
      updateThread();
    }
  };

  const likedComment = (comment) => {
    return comment.likeComments.filter((l) => l.user.id === user.id).length > 0;
  };

  return (
    <div>
      {currentThread && (
        <div className='thread'>
          <h3>{currentThread.title}</h3>
          <p>{currentThread.content}</p>
          <p className='user'>
            Posted by <span>{currentThread.user.username}</span>
          </p>
          <div className='like-wrapper'>
            <button
              className={like ? 'liked' : 'like'}
              onClick={pressLike}
            ></button>{' '}
            <span className='amount-likes'>
              {currentThread.likeThreads
                ? `${currentThread.likeThreads.length}  `
                : ''}
            </span>
          </div>
        </div>
      )}
      {currentThread &&
        currentThread.comments.map((c, index) => (
          <div className='comment' key={index}>
            <p className='user'>
              <span>{c.user.username}</span>
            </p>
            <p>{c.content}</p>
            <button
              id={index}
              className={likedComment(c) ? 'liked' : 'like'}
              onClick={pressLikeComment}
            ></button>{' '}
            <span className='amount-likes'>
              {c.likeComments ? `${c.likeComments.length}  ` : ''}
            </span>
          </div>
        ))}
      <div className='new-comment'>
        {user ? (
          <form onSubmit={handleSubmit}>
            <label>Write comment</label>
            <textarea
              name='comment'
              value={commentData.content}
              onChange={handleChange}
            ></textarea>
            <button>Submit comment</button>
          </form>
        ) : (
          <div>{currentThread && 'Log in to comment'}</div>
        )}
      </div>
    </div>
  );
};

export default ShowThread;
