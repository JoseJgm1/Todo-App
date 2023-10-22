import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import '../stylesheets/TaskList.css';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const authConfig = {
        auth: {
            username: 'admin',
            password: '1234'
        }
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get-tasks', authConfig)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks: ', error);
            });
    }, []);

    const addTask = task => {
        axios.post('http://127.0.0.1:5000/add-task', task, authConfig)
            .then(response => {
                if (response.data.success) {
                    setTasks(prevTasks => [response.data.task, ...prevTasks]);
                } else {
                    console.error('Error al agregar tarea.');
                }
            })
            .catch(error => {
                console.error('Error en la llamada API: ', error);
            });
    }

    const deleteTask = id => {
        axios.delete(`http://127.0.0.1:5000/delete-task/${id}`, authConfig)
            .then(response => {
                if (response.data.success) {
                    const updatedTasks = tasks.filter(task => task.id !== id);
                    setTasks(updatedTasks);
                } else {
                    console.error('Error al eliminar tarea.');
                }
            })
            .catch(error => {
                console.error('Error en la llamada API: ', error);
            });
    }

    const completeTask = id => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const editTask = (id, newText) => {
        // Aquí deberías agregar una llamada a la API para editar la tarea en el backend.
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newText;
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    return (
        <>
            <TaskForm onSubmit={addTask} />
            <div className='tasks-list-container'>
                {
                    tasks.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            completed={task.completed}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default TaskList;










