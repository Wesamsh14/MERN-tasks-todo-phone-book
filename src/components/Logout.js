import React, { Component } from 'react'
import axios from "axios"
import { Button } from 'react-bootstrap';

export default class Logout extends Component {

    Logout=(event)=>{
        event.preventDefault();
        axios.get("http://localhost:9000/api/logout").then((response)=>{
            console.log(response)
                  window.location.href = "/";
          }).catch((err)=>{
            console.log(err)
          })
      }

      
  render() {
    return (
      <div>
        <Button variant="outline-warning" onClick={this.Logout}>LOGOUT</Button>
      </div>
    )
  }
}
