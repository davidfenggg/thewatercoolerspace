import Logo from "./assets/logo.png";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Background from "./components/misc/Background";
import Login from "./components/login/Login";
import WaitingRoom from "./components/waitingroom/WaitingRoom";

import styled from 'styled-components';

const LogoImg = styled.img`
position: absolute;
width: 25rem;
margin: auto;
left: 0; right: 0;
top: 10px;
`


function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>

    <LogoImg src={Logo}/>

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

export default App;
