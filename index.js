const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const moment = require("moment");

var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://multichatnode.firebaseio.com"
});

app.get('/', function(req, res) {
    res.render('index.ejs');
});

var user = require('./routes/user');
var message = require('./routes/message');

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

 var server = http.listen(process.env.PORT || 8081, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 }); 

var messageService = require('./services/messageService');

 io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('userId', function(userId) {
        socket.userId = userId;
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', function(message) {

        var query = "/stock=";

        if (message.substr(0, query.length).toUpperCase() == query.toUpperCase()) {          
            io.sockets.connected[socket.id].emit('chat_message', '<i>Bot message to be returned here</i>');
        }else{
            var date = moment();
            var currentDate = date.format('MMM/Do/YYYY hh:mm:ssa');    
            messageService.logMessage({uid: socket.userId, username: socket.username, message: message, date: currentDate, timestamp: date.unix()});    
            io.emit('chat_message', '<i>' + currentDate + '</i><strong> ' + socket.username + ' says </strong>: </br>' + message);
        }
    });
});

app.use('/users', user);
app.use('/messages', message);