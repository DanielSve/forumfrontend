import axios from 'axios';

let config = {
  headers: {
    Authorization: "",
  },
};

export const getAllForumThreads = async () => {
  const forumThreads = await axios.get('http://localhost:8080/threads/all');
  return forumThreads.data;
};

export const addComment = async (commentData, token) => {
    config.headers.Authorization = `Bearer ${token}`
  const comment = await axios.post(
    'http://localhost:8080/threads/addComment',
    commentData, config
  );
};

export const getThreadById = async (id, token) => {
  const thread = await axios.get(`http://localhost:8080/threads/getById/${id}`);
  return thread.data;
};

export const addThread = async (newThread, token) => {
  config.headers.Authorization = `Bearer ${token}`
    const thread = await axios.post(
    'http://localhost:8080/threads/add',
    newThread,
    config
  );
  return thread.data;
};

export const addLike = async (likeObj, token) => {
    config.headers.Authorization = `Bearer ${token}`
  const thread = await axios.post(
    'http://localhost:8080/threads/like',
    likeObj, config
  );
  return thread.data;
};

export const addLikeComment = async (likeCommentObj, token) => {
    config.headers.Authorization = `Bearer ${token}`
  const comment = await axios.post(
    'http://localhost:8080/comment/like',
    likeCommentObj, config
  );
  return comment.data;
};

export const getThreadsByUserId = async (userId) => { 
  const forumThreads = await axios.get(
    `http://localhost:8080/threads/getByUserId/${userId}`);
  return forumThreads.data;
};
