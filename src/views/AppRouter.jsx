import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import overview from "./overview/overview";

import "./App.css";
import Landingpage from "./landingpage/landingpage";

class App extends Component {
  state = {
    hasError: false,
    isLoggedIn: false
  };

  componentDidCatch(err) {
    this.setState({
      hasError: true
    });
  }

  render = () => {
    const { hasError, isLoggedIn } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return null;
    }

    if (hasError) {
      return null;
    }

    if (isLoggedIn) {
      return <Landingpage />;
    }

    return (
      <div className="router-section" id="router-element">
        <Switch>
          <Route exact path="/" component={overview} />
          <Route component={null} />
        </Switch>
      </div>
    );
  };
}

export default withRouter(App);
