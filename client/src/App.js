import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Background from "./components/misc/Background";
import Login from "./components/login/Login";
import WaitingRoom from "./components/waitingroom/WaitingRoom";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Router style={{ width: "100vw", height: "100vh", margin: 0 }}>
        <Background>
          <Switch>
            <Route path="/company/:companyId" component={WaitingRoom} />

            <Route exact path="/" component={Login} />
          </Switch>
        </Background>
      </Router>
    </div>
  );
}

function randomColor() {
  return (
    "#" + ("000000" + ((Math.random() * 0xffffff) << 0).toString(16)).slice(-6)
  );
}

function setColor() {
  document.getElementById("myDiv").style.backgroundColor = randomColor();
  setTimeout(setColor, 2000);
}

export default App;
