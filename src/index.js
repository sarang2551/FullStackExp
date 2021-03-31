import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";
import Axios from "axios";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Register from "./App";
import ErrorComponent from "./components/error";
import Mainpage from "./mainpage";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      renderLoginMessage: false,
      errorProps: {},
      redirect: null,
      resData: {}
    };
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
      console.log("userInfo", userInfo);
      Axios.post("http://localhost:3000/login", userInfo).then((res) => {
        let loginProps = null;
        const { username, loginStatus } = res.data;
        switch (loginStatus) {
          case "success":
            this.setState({ redirect: "/mainpage", resData: res.data });
            console.log("res.data ", res.data);
            return;
          case "failed":
            loginProps = {
              type: "failed",
              content: `${username} login failed. Incorrect password!`
            };
            this.setState({
              errorProps: loginProps,
              renderLoginMessage: true
            });
            return;
          case "notFound":
            loginProps = { type: "warn", content: `User could not be found!` };
            this.setState({
              errorProps: loginProps,
              renderLoginMessage: true
            });
            return;
          default:
            return <div></div>;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{ pathname: this.state.redirect, state: this.state.resData }}
        />
      );
    }
    return (
      <>
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
            <br />
            <a className="button" href="https://5cs4z.csb.app/register">
              REGISTER
            </a>
          </div>
        </form>
        {this.state.renderLoginMessage ? (
          <>
            <ErrorComponent errorProps={this.state.errorProps} />
          </>
        ) : null}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <MyForm />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route
        exact
        path="/mainpage"
        render={(props) => {
          return <Mainpage {...props} />;
        }}
      />
    </Switch>
  </BrowserRouter>,
  rootElement
);
