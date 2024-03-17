import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "./slices/ToDoSlice";
import IdSlice from "./slices/IdSlice";
import IdScliceForCategory from "./slices/IdScliceForCategory";

export const sotre = configureStore({
  reducer: {
    ADDTASK: ToDoSlice,
    ID: IdSlice,
    IDCATEGORY: IdScliceForCategory,
  },
});
