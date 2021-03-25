import "./styles.css";

export default function App() {
  function authenticationCall(event) {
    event.preventDefault();
  }
  return (
    <form method="POST" className="App">
      <div>
        <label>Username</label>
        <br />
        <input></input>
        <br />
        <label>Password</label>
        <br />
        <input type="password"></input>
        <br />
        <button type="button" onClick={authenticationCall}>
          SUBMIT
        </button>
      </div>
    </form>
  );
}
