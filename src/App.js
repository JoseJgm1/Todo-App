import React, { useState } from 'react';
import './App.css';
import Logo from './images/logo.jpeg'; 
import TaskList from './components/TaskList'; 
import Navbar from './components/Navbar'; 
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
      <Navbar 
        isLoggedIn={isLoggedIn} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />                            
      <div className='logo-container'>
        <img src={Logo} className='logo' alt="todo-list Logo" /> 
      </div>
      <div className='main-task-list'>
        {isLoggedIn ? (
          <>
            <h1>Checklist</h1>
            <TaskList />
          </>
        ) : (
          <>
            <h1>Log in to Todo List</h1>  {/* Mensaje cuando el usuario no está logueado */}
            <p style={{ color: messageColor }}>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;





