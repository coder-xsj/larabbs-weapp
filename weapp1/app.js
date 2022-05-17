"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./vendor.js')(0));

var _core = _interopRequireDefault(require('./vendor.js')(1));

var _eventHub = _interopRequireDefault(require('./common/eventHub.js'));

var _x = _interopRequireDefault(require('./vendor.js')(4));

var _usePromisify = _interopRequireDefault(require('./vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].use(_x["default"]);

_core["default"].use(_usePromisify["default"]);

_core["default"].app({
  onLaunch: function onLaunch() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
      var res;
      return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _core["default"].wx.login();

            case 2:
              res = _context.sent;
              console.log(res);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {}
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {}, refs: undefined });