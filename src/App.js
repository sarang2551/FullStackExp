import "./styles.css";
import React from "react";
import Axios from "axios";
import ErrorComponent from "./components/error";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      errorProps: {},
      isShowErrorComponent: false
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
    Axios.post("http://localhost:3000/register", userInfo).then((res) => {
      console.log("res.data", res.data);
      const { username, success } = res.data;
      let errorProps = null;

      if (success === "registered") {
        errorProps = {
          type: "success",
          content: `${username} is successfully registered!`
        };
      }

      if (success === "failed") {
        errorProps = {
          type: "error",
          content: `Failed to registered ${username}`
        };
      }

      if (success === "duplicate") {
        errorProps = {
          type: "warn",
          content: `${username} already exists`
        };
      }

      this.setState({ errorProps: errorProps, isShowErrorComponent: true });
    });
  };

  render() {
    return (
      <>
        <form method="POST" className="App" onSubmit={this.mySubmitHandler}>
          <div>
            <label>Email</label>
            <br />
            <input
              required
              name="email"
              type="email"
              onChange={this.handleChange}
            ></input>
            <br />
            <label>Username</label>
            <br />
            <input
              required
              name="username"
              onChange={this.handleChange}
            ></input>
            <br />
            <label>Password</label>
            <br />
            <input
              required
              name="password"
              type="password"
              onChange={this.handleChange}
            ></input>
            <br />
            <button type="submit">REGISTER</button>
            <br />
            <a className="button" href="https://5cs4z.csb.app/">
              LOGIN
            </a>
          </div>
        </form>

        {this.state.isShowErrorComponent ? (
          <>
            <ErrorComponent errorProps={this.state.errorProps} />
          </>
        ) : null}
      </>
    );
  }
}
