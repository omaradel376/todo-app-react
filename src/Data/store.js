import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "./slices/ToDoSlice";
import IdSlice from "./slices/IdSlice";
import TaskToEdit from "./slices/TaskToEdit";

export const sotre = configureStore({
  reducer: {
    ADDTASK: ToDoSlice,
    ID: IdSlice,
    EDITTASK: TaskToEdit,
  },
});
