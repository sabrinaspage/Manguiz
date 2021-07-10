import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Game from "./game"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact component={SignUpPage} path="/"/>
        <Route exact component={Game} path="/game"/>
        <Route exact component={LeaderBoard} path="/leaderboard"/>
      </Switch>
    </Router>
  );
}

export default App;
