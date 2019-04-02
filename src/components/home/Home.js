import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, ListGroup } from 'react-bootstrap';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
          showOne:[]
        }
      }
      

    getDAta=()=>{
        const id =this.props.match.params.id
          axios.get(`http://localhost:9000/api/showOne/${id}`)
          .then((response)=>{
            const data = response.data   
            this.setState({showOne:data})
          }).catch((err)=>{
            console.log(err)
          })
      } 

    componentDidMount=()=>{
      axios.get("http://localhost:9000/api/sessionUser")
      .then((response)=>{
        const sess = response.data.session
        {sess && sess._id?
        this.getDAta() : window.location.href = "/";}
      }).catch((err)=>{
        console.log(err)
      })
   }
    
   

    Logout=(event)=>{
        event.preventDefault();
        axios.get("http://localhost:9000/api/logout")
        .then((response)=>{
          window.location.href = "/";
          }).catch((err)=>{
            console.log(err)
          })
      }

      deleteOne=(event)=>{
        const id =this.props.match.params.id
          axios.delete(`http://localhost:9000/api/del/${id}`)
          .then((response)=>{
            window.location.href = "/feed";
          }).catch((err)=>{
            console.log(err)
          })
      }

      edit=(e)=>{
        e.preventDefault();
        const id =this.props.match.params.id
        window.location.href = `/feed/ed/${id}`;
      }
      
  render() {
    const {showOne} = this.state
    return (
      <div className='home'>
       <Button variant="outline-warning" onClick={this.Logout}>LOGOUT</Button>
       <br /><br />
        <div>
          <div>
                <ListGroup as="ul">
                  <ListGroup.Item as="li" active>
                    <h3>Full Name : {showOne.fullName}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <h3>Email : {showOne.email}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" disabled>
                    <h3>Phone Number : {showOne.phoneNumber}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <h3>Address : {showOne.address}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                  <h3>City : {showOne.city}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                  <h3>Job Title : {showOne.jobTitle}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                      <h3> GitHub Url : <a href={showOne.GitHubUrl}>
                        {showOne.GitHubUrl} </a>
                      </h3>    
                  </ListGroup.Item>
                </ListGroup>
                <Button variant="outline-success" type="submit" onClick={this.edit}>Edit</Button> || <Button variant="outline-danger" type="submit" onClick={this.deleteOne}>Delete</Button>
                
                <br /><br />
                <Button variant="info" ><Link id='linkAdd' to="/feed">Back</Link></Button>
                
              </div>
        </div>
      </div>
    )
  }
}
