  import React, { Component } from 'react';
import './App.css';
import './assets/feed.css'

import { BrowserRouter, Route} from 'react-router-dom';
import Join from './components/homepage/Join';
import Feed from './components/feed/Feed';
import Home from './components/home/Home';
import Edit from './components/Edit';
import NewPB from './components/home/NewPB'
import TaskDelete from './components/feed/TaskDelete';



class App extends Component {
  render() {
    return (
     
        <BrowserRouter>
          <div className='Feed'>
            <Route exact path="/" component={Join}></Route>
            <Route exact path="/feed" component={Feed}></Route>
            <Route exact path="/home/:id" component={Home}></Route>
            <Route exact path="/feed/ed/:id" component={Edit}></Route>
            <Route exact path="/NewPB" component={NewPB}></Route>
            <Route exact path='/task/:id' component={TaskDelete}></Route>

            
          </div>
        </BrowserRouter>
    
    );
  }
}

export default App;
