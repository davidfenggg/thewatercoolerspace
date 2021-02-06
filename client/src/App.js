import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router";
import Background from './components/misc/Background';

function App() {
  return (
    <div className="App">
      <Router>
        <Background>
          <Switch>

            <Route exact path="/" component={} />

          </Switch>
        </Background>
      </Router>
    </div>
  );
}

export default App;
