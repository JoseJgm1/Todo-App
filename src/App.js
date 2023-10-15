import './App.css';
import freeCodeCampLogo from './images/freecodecamp-logo.png'; // Assuming you might want to translate the folder name as well
import TaskList from './components/TaskList'; // Assuming you've translated the component name

function App() {
  return (
    <div className='task-app'>
      <div className='freecodecamp-logo-container'>
        <img 
          src={freeCodeCampLogo} 
          className='freecodecamp-logo' 
          alt="freeCodeCamp Logo" />  // Added an alt attribute for accessibility
      </div>
      <div className='main-task-list'>
        <h1>My Tasks</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default App;


