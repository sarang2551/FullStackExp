import "./styles.css";
import React from "react";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    try {
      this.setState({ ...this.state, [name]: value });
    } catch (e) {
      throw e;
    }
  };
  mySubmitHandler = (event) => {
    event.preventDefault();

    const userInfo = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    console.log(userInfo);
  };
  render() {
    return (
      <form method="POST" className="App" onSubmit={this.handleChange}>
        <div>
          <label>Email</label>
          <br />
          <input name="email" type="email" onChange={this.handleChange}></input>
          <br />
          <label>Username</label>
          <br />
          <input name="username" onChange={this.handleChange}></input>
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
