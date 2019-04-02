import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, ListGroup, Card } from 'react-bootstrap';


export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
          showOne:[],
          
            // fullName:'',
            // email:'',
            // phoneNumber: null,
            // address: '',
            // city :'',
            // jobTitle : '',
            // GitHubUrl : ''
       
        }
      }
      

      getDAta=()=>{
        const id =this.props.match.params.id
          axios.get(`http://localhost:9000/api/showOne/${id}`).then((response)=>{
            const data = response.data
            // console.log('data', data)
            this.setState({showOne:data})
          }).catch((err)=>{
            console.log(err)
          })
      } 

    componentDidMount=()=>{
      axios.get("http://localhost:9000/api/sessionUser").then((response)=>{
        const sess = response.data.session
        {sess && sess._id?
        this.getDAta() : window.location.href = "/";}
        // console.log('sess', sess)
      }).catch((err)=>{
        console.log(err)
      })
   }
    
   

    Logout=(event)=>{
        event.preventDefault();
        axios.get("http://localhost:9000/api/logout").then((response)=>{
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


      editNow= event => {
        var showOne = this.state.showOne;
          showOne[event.target.name] = event.target.value;
          this.setState({showOne:showOne});
        this.setState({[event.target.name]: event.target.value});
    }

      editSub=(event)=>{
          event.preventDefault();
        const id =this.props.match.params.id
        const data = this.state.showOne
          axios.put(`http://localhost:9000/api/ed/${id}`, data)
          .then(()=>{
            window.location.href = `/home/${id}`;
          }).catch((err)=>{
            console.log(err)
          })
      }
      
      
  render() {
    const {showOne, } = this.state
    return (
      <div className='edit'>
      <Button><Link id='linkAdd' to="/feed">Back</Link></Button>
      <Button variant="outline-warning" onClick={this.Logout}>LOGOUT</Button>
       <br /><br />
        <div>
          <div id='card'>
            <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item>fullName : {showOne.fullName}</ListGroup.Item>
                <ListGroup.Item>email : {showOne.email}</ListGroup.Item>
                <ListGroup.Item> phoneNumber : {showOne.phoneNumber}</ListGroup.Item>
                <ListGroup.Item>address : {showOne.address}</ListGroup.Item>
                <ListGroup.Item>city : {showOne.city}</ListGroup.Item>
                <ListGroup.Item>jobTitle : {showOne.jobTitle}</ListGroup.Item>
                <ListGroup.Item><a href={showOne.GitHubUrl}> GitHubUrl </a></ListGroup.Item>
              </ListGroup>
            </Card>
          </div><br />
          <div>
                <form onSubmit={this.editSub}>
                    <div>
                        <Form.Control type="text" name='fullName' placeholder='Full Name'
                                onChange={this.editNow} value={showOne.fullName} />

                        <Form.Control type="email" name='email' placeholder='Email'
                                onChange={this.editNow} value={showOne.email} />        

                        <Form.Control type="text" name='phoneNumber' placeholder='Phone Number'
                                onChange={this.editNow} value={showOne.phoneNumber} />

                        <Form.Control type="text" name='address' placeholder='Address'
                                onChange={this.editNow} value={showOne.address}/>

                        <Form.Control type="text" name='city' placeholder='City'
                                onChange={this.editNow} value={showOne.city}/>

                        <Form.Control type="text" name='jobTitle' placeholder='Job Title'
                                onChange={this.editNow} value={showOne.jobTitle}/>

                        <Form.Control type="text" name='GitHubUrl' placeholder='Github link'
                                onChange={this.editNow} value={showOne.GitHubUrl}/>

                        <Button variant="primary" size="lg" type='submit' block>
                          Submit editing
                        </Button>                  
                    </div>
                </form>
                <Button type="submit" onClick={this.deleteOne} variant="secondary" size="lg" active> deleteOne </Button>
                <br />
              </div>
        </div>
      </div>
    )
  }
}
