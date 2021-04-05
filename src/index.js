import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Particles from "particles-bg";
import MyForm from "./App";
import About from "./components/About";
import React from "react";
import Header from "./components/Header";
const rootElement = document.getElementById("root");

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              return (
                <>
                  <Header data={this.state.userData} />
                  <About data={this.state.userData} />
                </>
              );
            }}
          />
          <Route
            exact
            path="/"
            render={() => {
              return (
                <>
                  <Particles type="polygon" bg={true} />
                  <MyForm />
                </>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<MainApp />, rootElement);
