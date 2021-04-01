import { configureStore } from "@reduxjs/toolkit";
import toDoListReducer from "./slice";
export default configureStore({
  reducer: {
    toDoList: toDoListReducer
  },
  preloadedState: { toDoList: [] }
});
