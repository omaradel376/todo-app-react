import { createSlice } from "@reduxjs/toolkit";
let id = 0;
const ToDoSlice = createSlice({
  initialState: { tasks: [] },
  name: "ToDoSlice",
  reducers: {
    addTask: (state, action) => {
      // chat gpt helped me in this
      const { category } = action.payload; // from inputs in AddTask.js
      const existingCategory = state.tasks.find((item) => item.category === category); // check if data sented category is equal category in state
      if (existingCategory) {
        // if true push is the same array
        existingCategory.tasks.push(action.payload);
      } else {
        // if false push in the other array
        id++;
        state.tasks.push({ category, done:0, id: id, tasks: [action.payload] });
      }
    },
    // this for handel tasks check or not
    doneChange: (state, action) => {
      // catIndex => for choose the category 
      // taskIndex => for choose the task from category
      const {catIndex, taskIndex} = action.payload
      state.tasks[catIndex].tasks[taskIndex].done = !state.tasks[catIndex].tasks[taskIndex].done
    },
    doneCatIncrease: (state, action) => { 
      const {catIndex} = action.payload
      state.tasks[catIndex].done +=1 
    },
    doneCatDecrease: (state, action) => {
      const {catIndex} = action.payload
      state.tasks[catIndex].done -=1
    },
  },
});

export const { addTask, doneChange,doneCatDecrease,doneCatIncrease } = ToDoSlice.actions;
export default ToDoSlice.reducer;
