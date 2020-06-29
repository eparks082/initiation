import React, { FunctionComponent, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../sign-in";
import Dashboard from "../dashboard";
import "./index.scss";

const App: FunctionComponent = () => {
  const [token, setToken] = useState<string>("");

  const updateToken = (token: string) => {
    setToken(token);
  };

  return (
    <div className="app">
      <div className="app-container container offset-lg-3 col-lg-6 offset-md-0 col-md-12">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                token ? (
                  <Dashboard token={token} />
                ) : (
                  <SignIn setToken={updateToken} />
                )
              }
            />

            <Route
              path="/sign-in"
              render={() => <SignIn setToken={updateToken} />}
            />
            <Route
              exact
              path="/dashboard"
              render={() =>
                token ? (
                  <Dashboard token={token} />
                ) : (
                  <SignIn setToken={updateToken} />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
