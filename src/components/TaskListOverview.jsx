import styles from '../styles/tasklistoverview.module.css';
import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { modifyTasksState, selectAllTasks, setFilter } from '../features/tasks/tasksSlice';

const TaskListOverview = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const [checked, setChecked] = useState(false);

  const stats = [
    tasks.length, 
    tasks.filter(task => task.completed).length,
    tasks.filter(task => !task.completed).length
  ]

  const checkAll = () => {
    setChecked(true);
    dispatch(modifyTasksState(true));
  };

  const uncheckAll = () => {
    setChecked(false);
    dispatch(modifyTasksState(false));
  };

  return (
    <div className={styles.nav}>
      <ul className={styles.stats}>
        <li onClick={() => dispatch(setFilter('all'))}> All ({stats[0]}) </li>
        <li onClick={() => dispatch(setFilter('completed'))}> Completed ({stats[1]}) </li>
        <li onClick={() => dispatch(setFilter('pending'))}> Pending ({stats[2]}) </li>
      </ul>
      { !checked ?
        <button onClick={checkAll}> Check All <AiOutlineCheck /> </button> :
        <button onClick={uncheckAll}> Uncheck All <MdClose /> </button>
      }
    </div>
  );
}

export default TaskListOverview;
