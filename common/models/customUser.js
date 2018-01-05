'use strict';
var config = require('../../server/config.json');
var path = require('path');
var admin = require('firebase-admin');

module.exports = function(CustomUser) {
  CustomUser.on('resetPasswordRequest', function (info) {
    var url = 'http://localhost' + ':' + config.port + '/index.html#/reset-password-form';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    CustomUser.app.models.Email.send({
      to: info.email,
      from: 'teremfoglaloinfo@gmail.com',
      subject: 'Password reset',
      html: html
    }, function (err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  CustomUser.invite = function (id, eventId, cb) {
    CustomUser.find({
      where: {id: id},
      include: { relation: 'registrationToken'}
    }).then(function (user) {
      var payload = {
        notification: {
          title: "Event invite",
          body: "You have an event inviation. Click to accept."
        },
        data:{eventId: eventId,
          userId: id}
      };
      user.forEach(function (userInstance) {
        var userjson = userInstance.toJSON();
        if (userjson.registrationToken !== undefined) {
          admin.messaging().sendToDevice(userjson.registrationToken.value, payload)
            .then(function (response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
              console.log("Error sending message:", error);
            });
        }
      });

      }
    );
  };

  CustomUser.remoteMethod (
    'invite',
    {
      http: {path: '/invite', verb: 'get'},
      accepts: [{arg: 'id', type: 'string', http: { source: 'query' } },
        {arg: 'eventId', type: 'string', http: { source: 'query' }}],
      returns: { }
    }
  );
};
