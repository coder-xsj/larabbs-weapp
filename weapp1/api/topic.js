"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.getTopic = getTopic;
exports.getTopics = getTopics;
exports.getUserTopics = getUserTopics;

var _request = require('./../utils/request.js');

function getTopics(data) {
  return (0, _request.request)('topics', {
    data: data
  });
}

function getCategories(data) {
  return (0, _request.request)('categories');
}

function getTopic(id, data) {
  return (0, _request.request)('topics/' + id, {
    data: data
  });
}

function getUserTopics(userId, data) {
  return (0, _request.request)('users/' + userId + '/topics', {
    data: data
  });
}