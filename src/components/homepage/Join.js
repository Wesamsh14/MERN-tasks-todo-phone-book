import React, { Component } from 'react';
import '../../App.css';
import Login from './Login'
import Reg from './Reg'

class Join extends Component {
  


  render() {
      
    return (
      <div className='Join'>
        <div>
            <Login />
        </div>
        <div>
            <Reg />
        </div>
      </div>
    );
  }
}

export default Join;
