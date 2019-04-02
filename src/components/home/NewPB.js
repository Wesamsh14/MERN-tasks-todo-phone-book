import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Logout from '../Logout';
import { Button, Form, Col, Row, ListGroup, Card } from 'react-bootstrap';



export default class NewPB extends Component {
    constructor(props){
        super(props);
        this.state={
            session:[],
            fullName:'',
            email:'',
            phoneNumber:null,
            address:'',
            city:'',
            jobTitle:'',
            GitHubUrl:'',
            UserID:''
        }
      }
      
    inputChanger= event => {
        this.setState({[event.target.name]: event.target.value});
    }


    componentDidMount=(e)=>{
        axios.get("http://localhost:9000/api/sessionUser").then((response)=>{
          const data = response.data.session  
          {data && data._id?
            this.setState({session:data}): window.location.href = "/";}
        }).then(()=>{
            let id = this.state.session._id
            this.setState({UserID:id})
        }).catch((err)=>{
            console.log(err)
        })
    }

    AddNewNumber = e => {
        e.preventDefault();
          axios.post("http://localhost:9000/api/addNewUP", this.state)
           .then((response)=>{
            console.log('post response : ', response)
          }).then(()=>{
            window.location.href = "/feed"
          }).catch((err)=>{
              console.log(err)
          })
    }
    

      
  render() {
    
    return (
      <div className='NewPB'>
        <div>
            <Logout />
        </div><br/>
        <div>
            <Button><Link id='linkAdd' to="/feed">Back</Link></Button>
        </div>
        <div>
            <div>
                <h1 id='NewUser'>Add New User To Your Phone Book</h1>
            </div>
            <div>
                <form onSubmit={this.AddNewNumber}>
                    <div className='new'>
                            <Form.Control type="text" name='fullName' placeholder='Full Name'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" name='email' placeholder='Email Address'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" name='phoneNumber' placeholder='Phone Number'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" name='address' placeholder='Address'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" name='city' placeholder='City'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" ame='jobTitle' placeholder='Job Title'
                            onChange={this.inputChanger} />
                            <Form.Control type="text" name='GitHubUrl' placeholder='GitHub URL'
                            onChange={this.inputChanger} />< br />
                            <Button variant="secondary" type='submit' size="lg" block>Add New One</Button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
  }
}
