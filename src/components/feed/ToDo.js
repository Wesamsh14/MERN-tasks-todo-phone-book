import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';


class ToDo extends Component {
  constructor(props){
    super(props);
    this.state = {
      session:[],
      showAllTasks:[],
      title : '',
      description : '',
      UserID:''
    };
  }


  componentWillMount=(e)=>{
    axios.get("http://localhost:9000/api/sessionUser")
    .then((response)=>{
      const data = response.data.session  
      {data && data._id?
      this.setState({session:data}): window.location.href = "/";}
    }).then(()=>{
      let id = this.state.session._id
      this.setState({UserID:id})
    }).then(()=>{
      this.GetInfo();
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  GetInfo = (e) => {
    let id = this.state.session._id;
    axios.get(`http://localhost:9000/api/allTasks/${id}`)
    .then((response)=>{
      const data = response.data.userTasks
      this.setState({showAllTasks:data})
    }).catch((err)=>{
      console.log(err)
    })
    return e;
  }

  hendleSubmit= event => {
    event.preventDefault();
    
    axios.post("http://localhost:9000/api/newTask", this.state)
    //  .then((response)=>{
    //   console.log('post response : ', response)
    // })
    .then(()=>{
      this.GetInfo();
      this.setState({title : ''})
      this.setState({description: ''})
    })
    .catch((err)=>{
        console.log(err)
    })
    // this.setState({title:"" , subject:""});
   
  }

  inputChanger= event => {
  this.setState({[event.target.name]: event.target.value});

  }
 

  deleteOne=(event)=>{
    const id =this.state.showAllTasks.map((value)=> value._id)
    console.log(id)
    // axios.delete(`http://localhost:9000/api/delt/${id}`)
    //   .then((response)=>{
    //     window.location.href = "/feed";
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
  }

  render() {
  
    
    return (
      <div>
        <h1 id='tasks'>Tasks To Do</h1>
        <div>
          <h2 id='AddOne'>New Task:</h2>
          <div>
            <Form onSubmit={e=>this.hendleSubmit(e)}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Title"  name='title'  onChange={this.inputChanger} value={this.state.title} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows="2" name='description' placeholder="BIO.." onChange={this.inputChanger} value={this.state.description} />
              </Form.Group>
              <Button variant="outline-info" type='submit'>Add New Task</Button>
            </Form>
          </div>
        </div><br />
        <div >
          {
              this.state.showAllTasks.map((value, index) => {
                return (
                  <div key={index}>
                        {/* <p>
                          <b>title : </b>{value.title}
                          <br />
                          <b>subject: </b>{value.description}
                          <br />
                          <Link to={`/task/${value._id}`}>Done ...</Link>                  
                        </p> */}
                        <Card style={{ width: '18rem' }}>
                          <Card.Body>
                            <Card.Title>{value.title}</Card.Title>
                            <Card.Text>
                            {value.description}
                            </Card.Text>
                            <Card.Link><Link to={`/task/${value._id}`}>Done ...</Link></Card.Link>
                          </Card.Body>
                        </Card>  
                  </div>
                  
                );
              })}
        </div> 
      </div>
    );
  }
}

export default ToDo;
