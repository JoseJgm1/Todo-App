import React from 'react';
import axios from 'axios';

function Navbar({ isLoggedIn, handleLogin, handleLogout, username, setUsername, password, setPassword }) {
  
  const submitLogin = () => {
    axios.post('http://127.0.0.1:5000/login', { username, password })
      .then(response => {
        if (response.data.success) {
          handleLogin();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during login: ', error);
      });
  }

  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button onClick={submitLogin}>Login</button>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;


