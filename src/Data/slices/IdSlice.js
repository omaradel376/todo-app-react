import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
  initialState: 1,
  name: "idSlice",
  reducers: {
    increaseId: (state, action) => {
      return state+= 1;
    },
  },
});
export const { increaseId } = idSlice.actions;
export default idSlice.reducer;
