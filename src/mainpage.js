import React from "react";
import "./styles.css";
import axios from "axios";
import TodoList from "./components/toDoList";
export default class mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    //this.state = { ...props.location.state, input: "" };
  }
  handler = () => {
    this.setState({ ...this.props.location.state, input: "" });
  };
  onHandleChange = (e) => {
    this.setState({ input: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(
      { toDoList: [...this.state.toDoList, this.state.input] },
      () => {
        console.log("Mainpage ", this.state.toDoList, this.state.input);
      }
    );

    this.setState({ input: "" });
  };
  render() {
    return (
      <>
        <div className="toDo">
          <h1>To-Do List</h1>
          <br />
          <label>Anything to add?</label>
          <input
            onChange={this.onHandleChange}
            value={this.state.input}
          ></input>
          <button onClick={this.handleSubmit}>Add To-Do</button>
        </div>
        {this.state.toDoList.length > 0 ? (
          <TodoList handler={this.handler} />
        ) : null}
      </>
    );
  }
}
