"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffForHumans = diffForHumans;

var _moment = _interopRequireDefault(require('./../vendor.js')(43));

require('./../vendor.js')(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function diffForHumans(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYYMMDD H:mm:ss';

  _moment["default"].locale('zh-cn');

  return (0, _moment["default"])(date, format).fromNow();
}