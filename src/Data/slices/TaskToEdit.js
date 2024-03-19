import { createSlice } from "@reduxjs/toolkit";

export const TaskToEdit = createSlice({
  initialState: [],
  name: "TaskToEdit",
  reducers: {
    edit: (state, action) => {
      return (state = action.payload);
    },
    
  },
});

export const { edit} = TaskToEdit.actions;
export default TaskToEdit.reducer;
