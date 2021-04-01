import { createSlice } from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
  name: "toDoList",
  initialState: { toDoList: Array([]) },
  reducers: {
    addToList: (state, action) => {
      return { toDoList: [...state.toDoList, action.payload] };
    },
    deleteFromList: (state, action) => {
      return (state = {
        toDoList: state.toDoList.filter(
          (item, index) => index !== action.payload
        )
      });
    },
    updateToDoList: (state, action) => {
      return (state = { toDoList: action.payload });
    }
  }
});
export const selectList = (state) => state.toDoList;
export const { addToList, deleteFromList, updateToDoList } = reduxSlice.actions;
export default reduxSlice.reducer;
