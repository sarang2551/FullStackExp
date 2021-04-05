import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Mainpage from "./components/mainpage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Particles from "particles-bg";
import MyForm from "./App";
import About from "./components/About";
import Axios from "axios";
import React from "react";
import Header from "./components/Header";
const rootElement = document.getElementById("root");

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null };
  }
  getData = async () => {
    var response = await Axios.get("http://localhost:3000/getData");
    this.setState({ userData: response.data.main });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
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
            path="/login"
            render={() => {
              return (
                <>
                  <Particles type="polygon" bg={true} />
                  <MyForm />
                </>
              );
            }}
          />
          <Route
            exact
            path="/mainpage"
            render={(props) => {
              return (
                <Provider store={store}>
                  <Mainpage {...props} />
                </Provider>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<MainApp />, rootElement);
