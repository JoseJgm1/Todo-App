import React, { useState } from 'react';
import '../stylesheets/Task.css';
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";

function Task({ id, text, completed, completeTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  }

  const handleInputBlur = () => {
    editTask(id, editedText);
    setIsEditing(false);
  }

  const handleInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      editTask(id, editedText);
      setIsEditing(false);
    }
  }

  return (
    <div className={completed ? 'task-container completed' : 'task-container'}>
      {isEditing ? (
        <input
          value={editedText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyUp={handleInputKeyUp}
          autoFocus
        />
      ) : (
        <div className='task-text' onClick={() => completeTask(id)}>
          {text}
        </div>
      )}
      <div className='task-icon-container'>
        <AiOutlineEdit className='task-icon' onClick={handleEditClick} />
        <AiOutlineCloseCircle className='task-icon' onClick={() => deleteTask(id)} />
      </div>
    </div>
  );
}

export default Task;






