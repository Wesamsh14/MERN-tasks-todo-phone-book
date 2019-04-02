import React, { Component } from 'react';
import axios from 'axios';


class TaskDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }


  componentWillMount=(e)=>{
    const id =this.props.match.params.id
    axios.delete(`http://localhost:9000/api/delt/${id}`)
      .then((response)=>{
        window.location.href = "/feed";
      }).catch((err)=>{
        console.log(err)
      })
  }
  

//   deleteOne=(event)=>{
//     const id =this.state.showAllTasks.map((value)=> value._id)
//     console.log(id)
//     // axios.delete(`http://localhost:9000/api/delt/${id}`)
//     //   .then((response)=>{
//     //     window.location.href = "/feed";
//     //   }).catch((err)=>{
//     //     console.log(err)
//     //   })
//   }

  render() {
  
    
    return (
      <div>
          <p>waiting ...</p>
      </div>
    );
  }
}

export default TaskDelete;
