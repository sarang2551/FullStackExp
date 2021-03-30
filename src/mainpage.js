import React from "react";
import "./styles.css";
import axios from "axios";
export default class mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.location.state, input: "" };
  }
  onHandleChange = (e) => {
    this.setState({ input: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ toDoList: this.state.toDoList });
    console.log(this.state);
    this.setState({ input: "" });
  };
  render() {
    return (
      <>
        <div className="toDo">
          <h1>To-Do List</h1>
          <br />
          <label>Anything to add?</label>
          <input onChange={this.onHandleChange}></input>
          <button onClick={this.handleSubmit}>Add To-Do</button>
        </div>
        {this.state.toDoList.length > 0
          ? this.state.toDoList.map((item) => {
              return (
                <div className="toDo">
                  <li>{item}</li>
                </div>
              );
            })
          : null}
      </>
    );
  }
}
