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
        state.tasks.push({ category, done: 0, id: id, tasks: [action.payload] });
      }
    },
    // this for handel tasks check or not
    doneChange: (state, action) => {
      // catIndex => for choose the category
      // taskIndex => for choose the task from category
      const { catIndex, taskIndex } = action.payload;
      state.tasks[catIndex].tasks[taskIndex].done = !state.tasks[catIndex].tasks[taskIndex].done;
    },
    doneCatIncrease: (state, action) => {
      const { catIndex } = action.payload;
      state.tasks[catIndex].done += 1;
    },
    doneCatDecrease: (state, action) => {
      const { catIndex } = action.payload;
      state.tasks[catIndex].done -= 1;
    },
    doneCatDecreaseFromDelete: (state, action) => {
      state.tasks.forEach((task) => {
        if (task.category === action.payload.cat.category) {
          task.tasks.forEach((taske) => {
            if (taske.id === action.payload.task.id) {
              if (taske.done) {
                task.done -= 1;
              }
            }
          });
        }
      });
      state.tasks = [...state.tasks];
    },
    deleteTask: (state, action) => {
      state.tasks.forEach((task) => {
        if (task.category === action.payload.category) {
          task.tasks = task.tasks.filter((taskData) => taskData.id !== action.payload.id);
        }
      });
      // يجب استخدام ال spread operator لنسخ الـ state بشكل صحيح
      state.tasks = [...state.tasks];
    },
    deleteCategory: (state, action) => {
      state.tasks.forEach((task) => {
        if (task.category === action.payload.category) {
          state.tasks = state.tasks.filter((cat) => cat.id !== action.payload.id);
        }
      });
      state.tasks = [...state.tasks];
    },
    updateDataAfterEdit: (state, action) => {
      const updatedTasks = state.tasks.map((category) => {
        if (category.category === action.payload.category) {
          return {
            ...category, // إنشاء نسخة جديدة من الكائن
            tasks: category.tasks.map((task) => {
              if (task.id === action.payload.id) {
                return action.payload; // استبدال العنصر المُطابق
              } else {
                return task; // إبقاء بقية العناصر كما هي
              }
            }),
          };
        } else {
          return category; // إبقاء بقية الفئات كما هي
        }
      });
    
      return {
        ...state,
        tasks: updatedTasks, // دمج التغييرات في ال state
      };
    },
    
  },
});

export const { deleteCategory, doneCatDecreaseFromDelete, deleteTask, addTask, doneChange, doneCatDecrease, doneCatIncrease, updateDataAfterEdit } = ToDoSlice.actions;
export default ToDoSlice.reducer;
