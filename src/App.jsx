import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import Flow from "./components/Flow";
import ChallengePage from "./components/pages/ChallengePage";
import PresentationPage from "./components/pages/PresentationPage";
import "./styles/custom-nodes/set-variable.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/flow" />
          <Route path="/flow" component={Flow} />
          <Route path="/challenge-page" component={ChallengePage} />
          <Route path="/presentation-page" component={PresentationPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
