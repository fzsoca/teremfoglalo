'use strict';

var admin = require('firebase-admin');
var serviceAccount = require("../../project-laboratory-firebase-adminsdk-a5gnc-b2a33b75eb.json");

module.exports = function(Participation) {
  /*var app = require('../../server/server');
  Participation.observe('after save', function (ctx, next){
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      // This registration token comes from the client FCM SDKs.
      var registrationToken = ctx.instance.value;

// See the "Defining the message payload" section below for details
// on how to define a message payload.
      var payload = {
        notification: {
          title: "Server test",
          body: "Testing the hell out of this"
        }
      };

// Send a message to the device corresponding to the provided
// registration token.
      admin.messaging().sendToDevice(registrationToken, payload)
        .then(function(response) {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
      next();
    }

  )*/

};
