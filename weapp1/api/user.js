"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentUser = getCurrentUser;
exports.updateAvatar = updateAvatar;
exports.updateUser = updateUser;

var _request = require('./../utils/request.js');

function getCurrentUser(data) {
  return (0, _request.authRequest)('user');
}

function updateAvatar(avatar) {
  return (0, _request.uploadFile)('images', {
    method: 'POST',
    name: 'image',
    formData: {
      type: 'avatar'
    },
    filePath: avatar
  });
}

function updateUser(data) {
  return (0, _request.authRequest)('user', {
    method: 'PUT',
    data: data
  });
}