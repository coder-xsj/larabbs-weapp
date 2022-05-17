"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCaptcha = getCaptcha;
exports.getToken = getToken;
exports.getTokenExpiredAt = getTokenExpiredAt;
exports.getUser = getUser;
exports.getVerificationCode = getVerificationCode;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.register = register;
exports.setToken = setToken;
exports.setUser = setUser;

var _request = require('./../utils/request.js');

function login(data) {
  return (0, _request.request)('weapp/authorizations', {
    method: 'post',
    data: data
  });
}

function logout(token) {
  return (0, _request.request)('authorizations/current', {
    method: 'delete',
    header: {
      'Authorization': 'Bearer ' + token
    }
  });
}

function refresh(token) {
  return (0, _request.request)('authorizations/current', {
    method: 'put',
    header: {
      'Authorization': 'Bearer ' + token
    }
  });
}

function getCaptcha(phone) {
  return (0, _request.request)('captchas', {
    method: 'post',
    data: {
      phone: phone
    }
  });
}

function getVerificationCode(key, code) {
  return (0, _request.request)('verificationCodes', {
    method: 'post',
    data: {
      captcha_key: key,
      captcha_code: code
    }
  });
}

function register(data) {
  return (0, _request.request)('weapp/users', {
    method: 'post',
    data: data
  });
}

function getUser() {
  return wx.getStorageSync('user');
}

function setUser(user, perms) {
  return wx.setStorageSync('user', user);
}

function getToken() {
  return wx.getStorageSync('access_token');
}

function getTokenExpiredAt() {
  return wx.getStorageSync('access_token_expired_at');
}

function setToken(tokenPayload) {
  var accessToken = tokenPayload.access_token;
  var accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000;
  wx.setStorageSync('access_token', accessToken);
  wx.setStorageSync('access_token_expired_at', accessTokenExpiredAt);
}