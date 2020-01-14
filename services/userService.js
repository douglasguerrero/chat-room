var userService = module.exports = {};
var db = require("firebase-admin").firestore();

userService.userInformation = function(userId, cb) {
    db.collection('users').doc(userId).get()
    .then(doc => {
        return cb(null, { userId: doc.id, ...doc.data()} );
    })
    .catch(err => {
        return cb(err, null);
    });
};

