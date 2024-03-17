import { createSlice } from "@reduxjs/toolkit";

const idSliceForCategory = createSlice({
  initialState: 1,
  name: "idSliceForCategory",
  reducers: {
    increaseIdCategory: (state, action) => {
      return state+= 1;
    },
  },
});
export const { increaseId } = idSliceForCategory.actions;
export default idSliceForCategory.reducer;
