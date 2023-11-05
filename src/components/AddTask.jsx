import styles from '../styles/addtask.module.css';
import React, { useContext, useState } from 'react';
import { App } from './ToDoListApp';
import { Alert } from 'react-st-modal';

const AddTask = () => {
  const {tasks, setTasks} = useContext(App);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    const prevId = tasks.length > 0 ? tasks[tasks.length - 1].id : -1;

    if (newTask.trim() === '') {
      Alert('Enter a valid task', 'Warning', 'Ok');
    } else if (tasks.filter(t => t.description.toLowerCase() === newTask.trim().toLowerCase()).length > 0) {
      Alert('This task already exists', 'Warning', 'Ok');
    } else {
      setTasks([...tasks, {
        id: prevId + 1,
        description: newTask.trim(),
        completed: false 
      }]);

      setNewTask('');
      document.getElementById('newTask').focus();
    }
  };

  return (
    <div className={styles.inputElm}>
      <input type="text" id='newTask' placeholder='Enter your task' value={newTask} onChange={e => setNewTask(e.target.value)}/>
      <button onClick={addTask}> Add </button>
    </div>
  );
}

export default AddTask;
