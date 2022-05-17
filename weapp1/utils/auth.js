"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.getTokenExpiredAt = getTokenExpiredAt;
exports.getUser = getUser;
exports.logout = logout;
exports.setToken = setToken;
exports.setUser = setUser;

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

function logout() {
  return wx.clearStorage();
}