import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import '../stylesheets/TaskList.css';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Carga inicial de tareas desde el backend.
        axios.get('http://127.0.0.1:5000/get-tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks: ', error);
            });
    }, []);

    const addTask = task => {
        axios.post('http://127.0.0.1:5000/add-task', task)
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

    const completeTask = id => {
        let updatedTask = null;

        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
                updatedTask = task;
            }
            return task;
        });

        setTasks(updatedTasks);

        if (updatedTask) {
            axios.put('http://127.0.0.1:5000/update-task', updatedTask)
                .catch(error => {
                    console.error('Error updating task status: ', error);
                });
        }
    }

    const editTask = (id, newText) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newText;
            }
            return task;
        });

        setTasks(updatedTasks);

        const updatedTask = tasks.find(task => task.id === id);
        if (updatedTask) {
            axios.put('http://127.0.0.1:5000/update-task', updatedTask)
                .catch(error => {
                    console.error('Error updating task text: ', error);
                });
        }
    }

    const deleteTask = id => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);

        axios.delete('http://127.0.0.1:5000/delete-task', { data: { id } })
            .catch(error => {
                console.error('Error deleting task: ', error);
            });
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











