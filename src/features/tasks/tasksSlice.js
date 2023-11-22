import { createSlice } from "@reduxjs/toolkit";

const list = [
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list,
    filter: 'all'
  },
  reducers: {
    addTask: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    modifyTaskDescription: (state, action) => {
      const {id, description} = action.payload;
      state.list = state.list.map(t => t.id === id ? ({...t, description}) : t);
    },
    modifyTaskState: (state, action) => {
      const {id, completed} = action.payload;
      state.list = state.list.map(t => t.id === id ? ({...t, completed}) : t);
    },
    deleteTask: (state, action) => {
      const {id} = action.payload;
      state.list = state.list.filter(t => t.id !== id);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    modifyTasksState: (state, action) => {
      state.list = state.list.map(t => ({...t, completed: action.payload}))
    }
  }
});

export const {addTask, setFilter, modifyTasksState, modifyTaskDescription, modifyTaskState, deleteTask} = tasksSlice.actions;

export const selectAllTasks = state => state.tasks.list;
export const selectTasks = state => {
  switch (state.tasks.filter) {
    case 'all':
      return state.tasks.list;
    case 'completed':
      return state.tasks.list.filter(t => t.completed);
    case 'pending':
      return state.tasks.list.filter(t => !t.completed);
  }
};

export default tasksSlice.reducer;