// Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Views
import Exercise1 from "./views/exercise1";
import Exercise2 from "./views/exercise2";

function MangoRangeApp() {
  return (
    <div
      id="mango-range-app"
      data-testid="mango-range-app"
      className="mango-range-app"
    >
      <Router>
        <Switch>
          <Route exact path={["/", "/exercise1"]}>
            <Exercise1 />
          </Route>
          <Route exact path="/exercise2">
            <Exercise2 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MangoRangeApp;
