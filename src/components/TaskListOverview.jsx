import styles from '../styles/tasklistoverview.module.css';
import React, { useContext, useState } from 'react';
import { App } from './ToDoListApp';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

const TaskListOverview = () => {
  const {tasks, setTasks, setShowAll, setShowCompleted} = useContext(App);
  const [checked, setChecked] = useState(false);

  const stats = [
    tasks.length, 
    tasks.filter(task => task.completed).length,
    tasks.filter(task => !task.completed).length
  ]

  const checkAll = () => {
    setChecked(true);
    setTasks(tasks => tasks.map(task => ({...task, completed: true})));
  };

  const uncheckAll = () => {
    setChecked(false);
    setTasks(tasks => tasks.map(task => ({...task, completed: false})));
  };

  return (
    <div className={styles.nav}>
      <ul className={styles.stats}>
        <li onClick={() => {setShowAll(true)}}> All ({stats[0]}) </li>
        <li onClick={() => {
          setShowAll(false); 
          setShowCompleted(true)}}
        > Completed ({stats[1]}) </li>
        <li onClick={() => {
          setShowAll(false); 
          setShowCompleted(false)}}> 
          Pending ({stats[2]}) </li>
      </ul>
      { !checked ?
        <button onClick={checkAll}> Check All <AiOutlineCheck /> </button> :
        <button onClick={uncheckAll}> Uncheck All <MdClose /> </button>
      }
    </div>
  );
}

export default TaskListOverview;
