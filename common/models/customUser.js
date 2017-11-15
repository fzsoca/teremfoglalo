'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function(CustomUser) {
  CustomUser.on('resetPasswordRequest', function(info) {
    var url = 'http://localhost'+ ':' + config.port + '/index.html#/reset-password-form';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    CustomUser.app.models.Email.send({
      to: info.email,
      from: 'teremfoglaloinfo@gmail.com',
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
