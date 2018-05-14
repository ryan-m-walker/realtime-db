import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App;
