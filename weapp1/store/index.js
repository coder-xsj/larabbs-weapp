"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _x = _interopRequireDefault(require('./../vendor.js')(4));

var _user = _interopRequireDefault(require('./modules/user.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _x["default"].Store({
  modules: {
    users: _user["default"]
  }
});

exports["default"] = _default;