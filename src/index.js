import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";
import Axios from "axios";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./App";

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
          <br />
          <a className="button" href="https://5cs4z.csb.app/register">
            REGISTER
          </a>
        </div>
      </form>
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
