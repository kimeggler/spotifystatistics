import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import overview from './overview/overview';

import './App.css';

class App extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(err) {
    this.setState({
      hasError: true,
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
