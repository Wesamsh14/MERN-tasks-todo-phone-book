var mongoose = require('mongoose');
const Tasks = mongoose.model("Tasks");

const createNewTask = (req, res, next) => {
    let userTask = new Tasks(req.body);
    userTask.save().then(()=>{
        res.send('saved to database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}

const getAllTasks=(req, res, next)=>{
    let id = req.session.user._id
    Tasks.find({UserID: id})
    .then((Tasks)=>{
        res.send({
        userTasks: Tasks,
    })})
    .catch((err)=>{res.send(err)})
}

const deleteOneT = (req, res, next) => {
    Tasks.findOneAndDelete({_id: req.params.id})
    .then((deletedOne)=>{
        res.send({
        deletedOne,
    })})
    .catch((err)=>{res.send(err)})
}



module.exports = {
    createNewTask,
    getAllTasks,
    deleteOneT
}