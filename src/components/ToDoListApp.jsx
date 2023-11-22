import React from 'react';
import Task from './Task';
import AddTask from './AddTask';
import TaskListOverview from './TaskListOverview';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';

const ToDoListApp = () => {
  const tasks = useSelector(selectTasks);
  
  return (
    <div className='container'>
      <h3>To Do List 📝</h3>
      <AddTask />
      <TaskListOverview />
      <div className='tasks'>
        { tasks.map(task => <Task key={task.id} task={task} />) }
      </div>
    </div>
  );
}

export default ToDoListApp;
