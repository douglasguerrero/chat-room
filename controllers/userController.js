var userController = module.exports = {};
var userService = require('../services/userService');

userController.userInformation = function(req, res) {
    var userId = req.params.id;
    userService.userInformation(userId, function(err, response) {
        if (err) {
            res.send({
                success: false,
                payload: err
            });
        }   
        res.send({
            success: true,
            payload: response
        });
    });
};

