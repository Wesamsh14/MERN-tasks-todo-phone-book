const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true 
    },
    password: {
      type: String,
      required: true 
    },
    created_at: {
      type: Date,
      default: Date.now
     },
  });



  UsersSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, 12);
}


    UsersSchema.methods.comparePassword = function(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

 

  module.exports = User =  mongoose.model('Users', UsersSchema);