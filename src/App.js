import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
