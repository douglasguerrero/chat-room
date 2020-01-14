var messageService = module.exports = {};
var db = require("firebase-admin").firestore();

messageService.logMessage = function(dataObject) {

    var data = {
        uid: dataObject.uid,
        username: dataObject.username,
        message: dataObject.message,
        date: dataObject.date,
        timestamp: dataObject.timestamp,
    };

    db.collection('chatlogs').doc().set(data);
};

messageService.getMessages = function(cb) {
    var messages = new Array();
    const chatLogsRef = db.collection('chatlogs').orderBy('timestamp', 'asc').limit(50);
    chatLogsRef.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
                var result = Object.assign({}, {messageId: doc.id}, doc.data());
                messages.push(result);
        });
        return cb(null, messages);
    })
    .catch((err) => {
        return cb(err, null);
    });
};