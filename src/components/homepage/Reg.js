import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';


class Reg extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
              fullName:'',
              email:'',
              password:''
            },
            confirmPassword:'',
            errors:null,
            error:''
        }
    }


    updateInputField=(event)=>{
        this.setState({[event.target.name] : event.target.value})
      }


      changeHandlerOne = e => {
        var formData = this.state.data;
        formData[e.target.name] = e.target.value;
        this.setState({
          data: formData
        });
      };

      submitHandler = e => {
        e.preventDefault();
        this.setState({error:null})
        this.setState({errors:null})
        {this.state.data.password !== this.state.confirmPassword?
          this.setState({errors: 'passwords dose not match'}):
        axios.post('http://localhost:9000/api/newOne', this.state.data)
        .then(res => {
          if (res.data.msg) {
            
            return this.setState({ errors: res.data.msg });
            
          }
          console.log(this.state.errors);
          if (res.status === 200) {
            return this.setState({
              error: 'Succesfully registerated',
              errors: null
            });
          }
          console.log(res);
        });}
      };


  render() {
    const { error, errors } = this.state
    return (
      <div className="Reg">
        <Form onSubmit={this.submitHandler}>
        <h1 id='h1Reg'>Registration</h1>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="3" id='formlabel'>
              FullName
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext type="text" name='fullName' placeholder="Full Name"
                  value={this.state.data.fullName}
                  onChange={this.changeHandlerOne} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="3" id='formlabel'>
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control type="email" name='email' placeholder="Email"
                  value={this.state.data.email}
                  onChange={this.changeHandlerOne} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="3" id='formlabel'>
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" name='password' placeholder="Password"
                 value={this.state.data.password}
                 onChange={this.changeHandlerOne} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="3" id='formlabel'>
              Confirm
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" name='confirmPassword' placeholder="Retype your Password"
                  onChange={this.updateInputField} />
            </Col>
          </Form.Group>
              <Button variant="secondary" type="submit">
                Register
              </Button>
  
            </Form>
            <div><br /><br /><br />
              <h2 id='err'>
                { error && error }
              </h2>
              <h2 id='err'>
                { errors && errors }
              </h2>
            </div>  
          </div>
    );
  }
}

export default Reg;
