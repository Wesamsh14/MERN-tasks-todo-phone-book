const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhonebookSchema = new Schema({
    fullName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false 
    },
    phoneNumber: {
      type: Number,
      required: false 
    },
    address: {
        type: String,
        required: false 
      },
    city: {
        type: String,
        required: false 
      },
    jobTitle: {
        type: String,
        required: false 
      },
      GitHubUrl: {
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


 

  module.exports = Phoonebook =  mongoose.model('Phoneb', PhonebookSchema);