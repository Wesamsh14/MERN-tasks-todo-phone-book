import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }


    updateInputField=(event)=>{
        this.setState({[event.target.name] : event.target.value})
      }

      sendForm=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:9000/api/login", this.state).then((response)=>{
            window.location.href = "/feed";
          }).catch((err)=>{
            this.setState({err: 'The email or password is incorrect.'})
            console.log('err', err)
          })
      }


  render() {
      
    return (
      <div className='Login'>
        <Form onSubmit={this.sendForm}>
          <h1 id='h1Log'>Login</h1>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="3" id='logformlabel'>
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext type="email" name='email' placeholder="Email"
                  onChange={this.updateInputField} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="3" id='logformlabel'>
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" name='password' placeholder="Password"
                  onChange={this.updateInputField} />
            </Col>
          </Form.Group>
          <Button variant="dark" type='submit'>LogIn</Button>
        </Form>
        <div id='err'>
          <p id='err'>{this.state.err}</p>
        </div>
      </div>
    );
  }
}

export default Login;
