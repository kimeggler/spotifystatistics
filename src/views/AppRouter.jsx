import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Overview from "./overview/overview";

import "./App.css";
import { validateToken } from "../services/fetchservice";
import Landingpage from "./landingpage/landingpage";

class AppRouter extends Component {
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
    const { hasError } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return null;
    }

    if (hasError) {
      return null;
    }

    if (!validateToken()) {
      return <Landingpage />;
    }

    return (
      <div className="router-section" id="router-element">
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route component={null} />
        </Switch>
      </div>
    );
  };
}

export default withRouter(AppRouter);
