const mongoose = require('mongoose');
const Users = mongoose.model("Users");
const Phoonebook = mongoose.model("Phoneb")

const showData= (req, res) =>{
    Phoonebook.findById({_id:req.params.id})
    .then((post)=>{res.json(post)})
    .catch((error)=>{res.json(error)})
}

module.exports = {
    showData
 
}