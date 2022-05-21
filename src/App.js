import React from 'react';
import './css/App.css';
import './css/Main.css';
import { BrowserRouter as Router, Routes, Route, Link, useInRouterContext } from 'react-router-dom';
import Forum from './pages/Forum';
import Login from './pages/Login';
import About from './pages/About';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import CreateAccount from './pages/CreateAccount';
import ShowThread from './pages/ShowThread';
import { getAllForumThreads } from './services/forumThreadService';
import { messageContext } from './services/msgContext';

function App() {
  const [user, setUser] = React.useState('');

  const [message, setMessage] = React.useState("heeej")

  console.log(messageContext);

  return (
    <messageContext.Provider value = {{message, setMessage}}>
    <Router>
      <div className='App'>
        <header>
          <div className='inner'>
            <Link className='link' to='/'>
              <h1>The Forum</h1>
            </Link>
            <div className='nav'>
              {!user && (
                <Link className='link' to='/createaccount'>
                  Sign up
                </Link>
              )}
              {!user && (
                <Link className='link' to='/login'>
                  Login
                </Link>
              )}
              {user && (
                <Link className='link' to='/profile'>
                  My Profile
                </Link>
              )}
              {user && (
                <Link className='link' to='/logout'>
                  Logout
                </Link>
              )}
              <Link className='link' to='/'>
                Home
              </Link>
            </div>
          </div>
        </header>
        <div className='Main'>
          <Routes>
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/logout' element={<Logout setUser={setUser} />} />
            <Route path='/createaccount' element={<CreateAccount />} />
            <Route path='/profile' element={<Profile user={user} />} />
            <Route
              path='/showthread/:id'
              element={<ShowThread user={user} />}
            />
            <Route path='/' element={<Forum user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
    </messageContext.Provider>
  );
}

export default App;
