import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Flow from "./components/Flow";
import ChallengePage from "./components/pages/ChallengePage";
import PresentationPage from "./components/pages/PresentationPage";
import "./styles/custom-nodes/set-variable.css";
import QRScanner from "./QRScanner";

const App = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.location.reload();
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div className="app">
      <Switch>
        <Redirect exact from="/" to="/flow" />
        <Route path="/flow" component={Flow} />
        <Route path="/challenge-page" component={ChallengePage} />
        <Route path="/presentation-page" component={PresentationPage} />
        <Route path="/qr-scanner-page" component={QRScanner} />
      </Switch>
    </div>
  );
};

export default App;
