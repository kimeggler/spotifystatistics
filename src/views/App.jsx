import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import Logincallback from './auth/logincallback';
import { Switch, Route } from 'react-router-dom';
import About from './about/About';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/callback' component={Logincallback} />
        <Route component={AppRouter} />
      </Switch>
    </div>
  );
}

export default App;
