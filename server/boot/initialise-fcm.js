var admin = require('firebase-admin');
var serviceAccount = require("../../project-laboratory-firebase-adminsdk-a5gnc-b2a33b75eb.json");

module.exports = function () {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
};
