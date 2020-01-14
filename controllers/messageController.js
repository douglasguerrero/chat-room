var messageController = module.exports = {};
var messageService = require('../services/messageService');

messageController.getMessages = function(req, res) {
    messageService.getMessages(function(err, response) {
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

