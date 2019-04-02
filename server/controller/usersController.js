var mongoose = require('mongoose');
const Users = mongoose.model("Users");
const Phoonebook = mongoose.model("Phoneb")
;const session = require('express-session');
const { check, validationResult } = require('express-validator/check');
const { regValidation  } = require('../vald');

const createUser = (req, res, next) => {
   

    let User = new Users(req.body);
    User.password = User.hashPassword(User.password);
    User.save().then(()=>{
        res.send('saved to database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}

const login =(req, res, next)=>{
    Users.findOne({email : req.body.email}, (err, user) => {
        if (err) {
            console.log('Error getting User: ', err);
            return next();
        }
        if(!user) {
            return res.status(404).json({err : true, message : "User dose not exist"})
        };
        if(!user.comparePassword(req.body.password, user.password)) {
            return res.status(404).json({err: true, message:"Passwords is not right, Please try again"});
        }
        
       return req.session.user= user,
    
        // console.log(user)
        res.json(user)
        next();
    })
}


const getAllUsers=(req, res, next)=>{
    let id = req.session.user._id
    Phoonebook.find({UserID: id})
    .then((user)=>{
        res.send({
        userInfo: user,
    })})
    .catch((err)=>{res.send(err)})
}

const createPhoneUser = (req, res, next) => {
    let userInfo = new Phoonebook(req.body);
    userInfo.save().then(()=>{
        res.send('saved to database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}

const countPhoneUsers=(req, res, next)=>{
    let id = req.session.user._id
    Phoonebook.find({UserID : id}).count()
    .then((PhoneUsers)=>{
        res.send({
        Users: PhoneUsers,
    })})
    .catch((err)=>{res.send(err)})
}

const logout=(req,res , next) =>{
    req.session.destroy((err) => {
        if(err) {
            console.log('Error logging out: ', err);
            return next();
        }
        res.json({ok : true})
     })
 };

 const deleteOne = (req, res, next) => {
    Phoonebook.findOneAndDelete({_id: req.params.id})
    .then((deletedOne)=>{
        res.send({
        deletedOne,
    })})
    .catch((err)=>{res.send(err)})
}

const editOne = (req, res, next) => {
    Phoonebook.findOne({ _id: req.params.id })
    .then(Phoone => {
        Phoone.fullName = req.body.fullName;
	    Phoone.email = req.body.email;
        Phoone.phoneNumber = req.body.phoneNumber;
        Phoone.address = req.body.address;
        Phoone.city = req.body.city;
        Phoone.jobTitle = req.body.jobTitle;
        Phoone.GitHubUrl = req.body.GitHubUrl;
		Phoone.save().then(savedMsg => {
			res.send(savedMsg);
		});
	});
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    createPhoneUser,
    countPhoneUsers,
    logout,
    deleteOne,
    editOne

}