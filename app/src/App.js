import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LeaderBoard from "./pages/LeaderBoard/index";
import ChooseACharacter from "./pages/ChooseACharacter/index";
import LogInPage from "./pages/LogInPage";
import Game from "./pages/Game/game"
import Account from "./pages/Account/index";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact component={SignUpPage} path="/"/>
        <Route exact component={ChooseACharacter} path="/choose-a-character"/>
        <Route exact component={LogInPage} path="/login"/>
        <Route exact component={Game} path="/game"/>
        <Route exact component={Account} path="/account"/>
        <Route exact component={LeaderBoard} path="/leaderboard"/>
      </Switch>
    </Router>
  );
}

export default App;
