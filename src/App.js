import React, { useState } from 'react';
import './App.css';
import freeCodeCampLogo from './images/freecodecamp-logo.png'; 
import TaskList from './components/TaskList'; 
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black'); // Nuevo estado para controlar el color del mensaje

  const handleLogin = () => {
    const credentials = { username, password }; 
    axios.post('http://127.0.0.1:5000/login', credentials)
      .then(response => {
        if (response.data.success) {
          setIsLoggedIn(true);
          setMessage('Login successful!');
          setMessageColor('black');
        } else {
          setMessage('Invalid credentials. Please try again.');
          setMessageColor('red');
        }
      })
      .catch(error => {
        console.error('Error in API call: ', error);
        setMessage('Error during login. Please try later.');
        setMessageColor('red');
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className='task-app'>
      <div className='freecodecamp-logo-container'>
        <img src={freeCodeCampLogo} className='freecodecamp-logo' alt="freeCodeCamp Logo" /> 
      </div>
      <div className='main-task-list'>
        {isLoggedIn ? (
          <>
            <h1>My Tasks</h1>
            <TaskList />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h1>Please Login</h1>
            <input 
              type='text' 
              placeholder='Username' 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            <input 
              type='password' 
              placeholder='Password' 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <p style={{ color: messageColor }}>{message}</p> {/* Usamos el estado para controlar el color */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;







