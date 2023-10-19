import './App.css';
import freeCodeCampLogo from './images/freecodecamp-logo.png'; 
import TaskList from './components/TaskList'; 

function App() {
  return (
    <div className='task-app'>
      <div className='freecodecamp-logo-container'>
        <img 
          src={freeCodeCampLogo} 
          className='freecodecamp-logo' 
          alt="freeCodeCamp Logo" /> 
      </div>
      <div className='main-task-list'>
        <h1>My Tasks</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default App;

