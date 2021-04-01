import React from "react";
import "./styles.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import reducer, { selectList } from "./redux/slice";
import { addToList, deleteFromList } from "./redux/slice";
export default function MainPage(props) {
  const initialState = { toDoList: props.location.state.toDoList };
  //const dispatch = useDispatch();
  var [list, dispatch] = React.useReducer(reducer, initialState);
  //const list = useSelector(selectList);

  const [input, setInput] = React.useState("");
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addToList(input));
    setInput("");
  }
  function handleDelete(index) {
    list = dispatch(deleteFromList(index));
  }
  return (
    <>
      <div className="toDo">
        <h1>To-Do List</h1>
        <br />
        <label>Anything to add?</label>
        <input onChange={handleChange} value={input}></input>
        <button onClick={handleSubmit}>Add To-Do</button>
      </div>
      {list.toDoList.length > 0
        ? list.toDoList.map((content, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  onClick={() => {
                    handleDelete(index);
                  }}
                ></input>
                {content}
              </li>
            );
          })
        : null}
    </>
  );
}
