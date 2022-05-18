import React from 'react';
import '../Home.css';
import "../App.css"
import "../Main.css"
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { messageContext } from '../services/msgContext';

const Login = ({setUser}) => {
  let navigate = useNavigate();

  const msg = React.useContext(messageContext);
  console.log(msg);

  // msg.setMessage("context test")
  
  const [login, setLogin] = React.useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = React.useState('Login');

  const handleChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const loginU = async () => {
      const reply = await loginUser(login);
      console.log(reply);
      if (reply === 'Unauthorized') {
        setMessage('Incorrect username or password, please try again');
      } else {
        setMessage('Success');
        console.log(reply);
        setUser({
          id: reply.id,
          token: reply.token
        });
        navigate("/")
      }
    };
    loginU();
  };

  return (
    <div className='Home'>
      <h2>Welcome to The Forum</h2>
      <h3>{msg.message}</h3>
      <p>{message}</p>
      <form>
        <label>Username</label>
        <input
          type='text'
          name='username'
          value={login.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type='text'
          name='password'
          value={login.password}
          onChange={handleChange}
        />
        <button onClick={submit}>Submit</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={() => {navigate("/createAccount");}}>Create Account</button>
    </div>
  );
};

export default Login;
