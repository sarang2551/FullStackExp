import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";
import Axios from "axios";
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  mySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const userInfo = {
        username: this.state.username,
        password: this.state.password
      };
      console.log(userInfo);
      Axios.post("http://localhost:3000/login", userInfo).then((res) => {
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <form method="POST" className="App" onSubmit={this.mySubmitHandler}>
        <div>
          <label>Username</label>
          <br />
          <input name="username" onChange={this.handleChangeUsername}></input>
          <br />
          <label>Password</label>
          <br />
          <input
            name="password"
            type="password"
            onChange={this.handleChangePassword}
          ></input>
          <br />
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<MyForm />, rootElement);
