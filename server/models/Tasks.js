const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Tasks = new Schema({
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false 
    },
    UserID : {
        type:String,
        required: true 
     },
    created_at: {
      type: Date,
      default: Date.now
     },
     updated_at :{
        type: Date,
        default: Date.now
     },
     
  });


 

  module.exports = Task =  mongoose.model('Tasks', Tasks);