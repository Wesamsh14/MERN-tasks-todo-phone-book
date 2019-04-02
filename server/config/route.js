const userController = require('./../controller/usersController');
const showOne = require('../controller/Data')
const Tasks = require('../controller/Tasks')
const { regValidation } = require('../vald');
module.exports = function(app){

    app.get('/api/ping', (req, res) => res.send('pong'));

    app.post('/api/newOne', userController.createUser)
    app.post('/api/login', userController.login)
    app.get('/api/sessionUser', (req,res) => res.json({session: req.session.user}));
    app.get('/api/feed/:id',  userController.getAllUsers)
    app.post('/api/addNewUP', userController.createPhoneUser);
    app.get('/api/phoneUsers/:id', userController.countPhoneUsers)
    app.get('/api/logout', userController.logout)
    app.get('/api/showOne/:id', showOne.showData)
    app.delete('/api/del/:id', userController.deleteOne)
    app.put('/api/ed/:id', userController.editOne)
    app.post('/api/newTask', Tasks.createNewTask)
    app.get('/api/allTasks/:id', Tasks.getAllTasks)
    app.delete('/api/delt/:id', Tasks.deleteOneT)
}