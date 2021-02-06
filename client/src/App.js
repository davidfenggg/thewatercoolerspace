import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Background from './components/misc/Background';
import Login from './components/login/Login';
import WaitingRoom from './components/waitingroom/WaitingRoom'

function App() {
  return (
    <div className="App">
      <Router>
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

export default App;
