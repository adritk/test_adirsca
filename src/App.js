import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'
import LoginPage from './Pages/Login'
import Dashboard from './Pages/Dashboard';
import Axios from 'axios';

class App extends Component {
  render() { 
    return ( 
      <div className="App">
            <Route path='/login' component={LoginPage} />
            <Route path='/dashboard' component={Dashboard} />
      </div>
     );
  }
}
 
export default App;