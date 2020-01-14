var express = require('express');
var router = express.Router();

var messageController = require('../controllers/messageController');

//router.post('/login', userController.loginUser);
router.post('/all', messageController.getMessages);
//router.get('/userInformation/:id', userController.userInformation);
//router.post('/create', userController.createUser);
//router.put('/edit', userController.editUser);
//router.post('/password/edit', userController.editUserPassword);
//router.delete('/delete/:id', userController.deleteUser);

module.exports = router;