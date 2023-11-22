import styles from '../styles/addtask.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-st-modal';
import { addTask, selectAllTasks } from '../features/tasks/tasksSlice';
import uuid from 'react-uuid';

const AddTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  
  const [newTask, setNewTask] = useState('');

  const add = () => {
    if (newTask.trim() === '') {
      Alert('Enter a valid task', 'Warning', 'Ok');
    } else if (tasks.filter(t => t.description.toLowerCase() === newTask.trim().toLowerCase()).length > 0) {
      Alert('This task already exists', 'Warning', 'Ok');
    } else {
      dispatch(addTask({
        id: uuid(),
        description: newTask.trim(),
        completed: false 
      }));

      setNewTask('');
      document.getElementById('newTask').focus();
    }
  };

  return (
    <div className={styles.inputElm}>
      <input 
        type="text" 
        id='newTask'
        placeholder='Enter your task' 
        value={newTask} 
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={add}> Add </button>
    </div>
  );
}

export default AddTask;
