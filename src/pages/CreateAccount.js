import '../Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { saveUser } from '../services/userService';

const CreateAccount = () => {
  let navigate = useNavigate();
  
  const [user, setUser] = React.useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    tryagain: false,
  });

  const [message, setMessage] = React.useState('Input name and email');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const save = async () => {
      await saveUser({
        email: user.email,
        username: user.username,
        password: user.password,
      });
    };
    if (user.password !== user.repeatPassword) {
      setMessage('Passwords not matching, please try again');
    } else if (!user.username || !user.email || !user.password) {
      setMessage('You must fill in all fields');
    } else {
      save();
      setMessage('Account succesfully created');
      navigate("/login")
    }
  };

  return (
    <div className='CreateAccount'>
      <h1>Create account</h1>
      <h4>{message}</h4>
      <form>
        <label>Email</label>
        <input
          onChange={handleChange}
          type='email'
          name='email'
          value={user.email}
        ></input>
        <label>Username</label>
        <input
          onChange={handleChange}
          type='text'
          name='username'
          value={user.username}
        ></input>
        <label>Password</label>
        <input
          onChange={handleChange}
          type='text'
          name='password'
          value={user.password}
        ></input>
        <label>Repeat password</label>
        <input
          onChange={handleChange}
          type='text'
          name='repeatPassword'
          value={user.repeatpassword}
        ></input>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
