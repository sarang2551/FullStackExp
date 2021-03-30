import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";
import Axios from "axios";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./App";
import ErrorComponent from "./components/error";
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      renderLoginMessage: false,
      errorProps: {}
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
        console.log(res.data);
        switch (loginStatus) {
          case "success":
            loginProps = {
              type: "success",
              content: `${username} logged in successfully!`
            };
            this.setState({
              errorProps: loginProps,
              renderLoginMessage: true
            });
            return;
          case "failed":
            loginProps = {
              type: "failed",
              content: `User login failed. Incorrect password!`
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

const FormWrapper = (props) => {
  const [title, setTitle] = React.useState(props.title || "Empty");

  React.useEffect(() => {
    console.log("Effect", props.title);
    setTitle(props.title);
  }, [props.title]);

  return (
    <>
      <h1>{title}</h1>
      {props.children}
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/x"
        component={() => (
          <FormWrapper title="Hello">
            <MyForm />
          </FormWrapper>
        )}
      />

      <Route exact path="/" component={() => <MyForm />} />
      <Route exact path="/register" component={() => <Register />} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
