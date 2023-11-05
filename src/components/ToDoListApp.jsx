import React, { createContext, useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import TaskListOverview from './TaskListOverview';

export const App = createContext();

const ToDoListApp = () => {
  let tasksList = JSON.parse(localStorage.getItem('tasks')) || [
    {
      id: 1,
      description: 'Revise HTML/CSS',
      completed: true
    },
    {
      id: 2,
      description: 'Go to the gym',
      completed: false
    },
    {
      id: 3,
      description: 'Revise Javascript',
      completed: false
    }
  ];

  const [tasks, setTasks] = useState(tasksList);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  const [showAll, setShowAll] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  
  return (
    <div className='container'>
      <h3>To Do List 📝</h3>
      <App.Provider value={{tasks, setTasks, setShowAll, setShowCompleted}}>
        <AddTask />
        <TaskListOverview />
        <div className='tasks'>
          { 
            showAll ?
            tasks.map(task => <Task task={task} />) :
            showCompleted ?
            tasks.filter(task => task.completed).map(task => <Task task={task} />) :
            tasks.filter(task => !task.completed).map(task => <Task task={task} />)
          }
        </div>
      </App.Provider>
    </div>
  );
}

export default ToDoListApp;
