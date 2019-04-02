import React, { Component } from 'react';
import '../../assets/feed.css';
import axios from 'axios';
// import Feed1 from './Feed1';
import ToDo from './ToDo';
import Logout from '../Logout';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';

axios.defaults.withCredentials = true;


class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAllData:[],
      session:[],
      // ... Task List
      lists : [],
      title : '',
      subject : '',
      // ... PhoneBook
        fullName :'',
        phoneNumber: null,
        UserID : '',
        PhoneUsersNum:null
    }
}

GetInfo = (e) => {
  let id = this.state.session._id;
  axios.get(`http://localhost:9000/api/feed/${id}`)
  .then((response)=>{
    const data = response.data.userInfo
    this.setState({showAllData:data})
  }).then(()=>{
    this.getCount();
  }).catch((err)=>{
    console.log(err)
  })
  return e;
}

getCount=()=>{
  let id = this.state.session._id;
  axios.get(`http://localhost:9000/api/phoneUsers/${id}`).then((response)=>{
    const data = response.data.Users
    this.setState({PhoneUsersNum:data})
  }).catch((err)=>{
    console.log(err)
  })
}

componentWillMount=(e)=>{
  axios.get("http://localhost:9000/api/sessionUser").then((response)=>{
    const data = response.data.session  
    {data && data._id?
    this.setState({session:data}): window.location.href = "/";}
  }).then(()=>{
    let id = this.state.session._id
    this.setState({UserID:id})
  }).then(()=>{
    this.getCount();
    this.GetInfo();
  }).catch((err)=>{
    console.log(err)
  })
}

AddNewNumber = e => {
  e.preventDefault();
  // let id = this.state.session._id
  // this.setState({UserID : id})
    axios.post("http://localhost:9000/api/addNewUP", this.state)
    //  .then((response)=>{
    //   console.log('post response : ', response)
    // })
    .then(()=>{
      this.GetInfo()
    }).catch((err)=>{
        console.log(err)
    })
}


inputChanger= event => {
this.setState({[event.target.name]: event.target.value});

}


  render() {
    const {title, subject, showAllData, session, PhoneUsersNum} = this.state
    return (
     
        
          <div className=''>
            <div id='logOut'>
              <h1 id='Welcome'>Welcome {this.state.session.fullName}</h1>
              <Logout />
             
            </div><br /><br />
            <div className='Feed1'>
              <div className='AddPhoneQuick'>
              <h1 id='PhoneBook'>PHONE BOOK : </h1>
                <h2 id='AddOne'>Add new user to your PB</h2>
                <Link id='addNew' to='/NewPB'>Add NEW ONE</Link>
                <h2 id='AddOneQ'>Or Add One Quickly</h2>
                <Form onSubmit={this.AddNewNumber}>
                  <Form.Row>
                    <Col>
                      <Form.Control type='text' name='fullName' placeholder='full Name'
                    onChange={this.inputChanger} />
                    </Col>
                    <Col>
                      <Form.Control type='text' name='phoneNumber' placeholder='Phone Number'
                    onChange={this.inputChanger} />
                    </Col>
                    <Button variant="light" type='submit'>Add One</Button> 
                  </Form.Row>
                </Form>
                <div><br />
                    <h2 id='OneAdded'>You have <span id='usersN' > {PhoneUsersNum && PhoneUsersNum} </span> users in the PhoneBook : </h2>
                    <div id='bookInfo'> 
                      { session && session._id ? showAllData && showAllData.map((value) => {
                        return(
                          <div key={value._id}>
                          
                            <h2 id='fullName'>Name : <span id='name'> {value.fullName} </span></h2>
                            <Button variant="secondary" size="sm">
                              <Link id='linkAdd' to={`/home/${value._id}`}>See More ...</Link>
                            </Button>
                            <hr />
                            
                          </div> 
                        );
                      }) : null }
                    </div>
                </div> 
              </div>
            
                <div className='ToDo'>
                    <ToDo />
                </div>
                {/* <div className='GitHub'>
                  <GitHubUser />
                </div> */}
              </div> 
            </div> 

           
       
    
    );
  }
}

export default Feed;
