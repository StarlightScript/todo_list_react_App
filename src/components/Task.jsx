import styles from '../styles/task.module.css';
import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdClose, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from './Dropdown';
import { Alert, Confirm } from 'react-st-modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, modifyTaskDescription, modifyTaskState, selectAllTasks } from '../features/tasks/tasksSlice';

const Task = ({task}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks)

  const [showDropdown, setShowDropdown] = useState(false);
  const [modifyTask, setModifyTask] = useState(false);
  const [modifiedTask, setModifiedTask] = useState(task.description);

  const modify = () => {
    if (modifiedTask.trim() === '') {
      Alert('The field cannot be epmty', 'Warning', 'Ok');
    } else if (tasks.filter(t => t.description.toLowerCase() === modifiedTask.trim().toLowerCase() && t.id !== task.id).length > 0) {
      Alert('This task already exists', 'Warning', 'Ok');
    } else {
      dispatch(modifyTaskDescription({
        id: task.id,
        description: modifiedTask.trim()
      }));

      setModifyTask(false);
    }
  };

  const changeState = () => {
    dispatch(modifyTaskState({
      id: task.id,
      completed: !task.completed
    }))
  };

  const removeTask = async () => {
    const handleRemove = await Confirm('Are you sure to delete this task ?', 'Confirmation', 'Delete', 'Cancel');
    handleRemove && dispatch(deleteTask({id: task.id}));
  };


  return (
    <div className={styles.task}>
      <p>
        { modifyTask ?
          <input type="text" value={modifiedTask} onChange={e => setModifiedTask(e.target.value)} /> :
          task.description }
      </p>
      { modifyTask ?
        <div className={styles.icons}>
          <MdOutlinePublishedWithChanges onClick={modify} style={{color: 'rgb(0, 128, 255)'}} />
        </div> :
        <div className={styles.icons}>
          {
            task.completed ? 
            <AiOutlineCheck onClick={changeState} style={{color: 'green'}} /> : 
            <MdClose onClick={changeState} style={{color: 'red'}} />
          }
          <BsThreeDotsVertical onClick={() => setShowDropdown(!showDropdown)} />
          {
            showDropdown && <Dropdown modify={setModifyTask} remove={removeTask}/>
          }
        </div> }
    </div>
  );
}

export default Task;
