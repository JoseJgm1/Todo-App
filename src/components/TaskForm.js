import React, { useState } from 'react';
import '../stylesheets/TaskForm.css';
import { v4 as uuidv4 } from 'uuid';

function TaskForm(props) {
  const [input, setInput] = useState('');

  const handleInputChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false
    }

    props.onSubmit(newTask);
    setInput('');  // Reset the input after submitting
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input 
        className='task-input'
        type='text'
        placeholder='Write a Task'
        name='text'
        value={input}
        onChange={handleInputChange}
      />
      <button className='task-button'>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;













