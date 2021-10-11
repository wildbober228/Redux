import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import StudentList from "./student/StudentList";
import StudentEdit from "./student/StudentEdit";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/students/' exact={true} component={StudentList}/>

            <Route path='/students/:id/:type' component={StudentEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
