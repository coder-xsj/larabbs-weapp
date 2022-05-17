"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _util = require('./../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    // 父页面传入，需要格式化的时间
    datetime: String
  },
  computed: {
    formatDatetime: function formatDatetime() {
      return (0, _util.diffForHumans)(this.datetime);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });