"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.request = exports.authRequest = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(0));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _store = _interopRequireDefault(require('./../store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 服务器接口地址
var host = 'http://larabbs.test/api/v1/'; // 普通请求

var request = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee(url) {
    var options,
        showLoading,
        response,
        error,
        _args = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            showLoading = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;

            // 显示加载中
            if (showLoading) {
              wx.showLoading({
                title: '加载中'
              });
            } // 拼接请求地址


            options.url = host + url;
            _context.next = 6;
            return _core["default"].wx.request(options);

          case 6:
            response = _context.sent;

            if (showLoading) {
              // 隐藏加载中
              wx.hideLoading();
            }

            if (!(response.statusCode >= 200 && response.statusCode < 300)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", response);

          case 10:
            if (response.statusCode === 429) {
              wx.showModal({
                title: '提示',
                content: '请求太频繁，请稍后再试'
              });
            }

            if (response.statusCode === 500) {
              wx.showModal({
                title: '提示',
                content: '服务器错误，请联系管理员或重试'
              });
            }

            error = new Error(response.data.message);
            error.response = response;
            return _context.abrupt("return", Promise.reject(error));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.request = request;

var checkToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
    var accessToken, expiredAt;
    return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 从缓存中取出 Token
            accessToken = _store["default"].getters.accessToken;
            expiredAt = _store["default"].getters.accessTokenExpiredAt; // 如果 token 过期了，则调用刷新方法

            if (!(accessToken && new Date().getTime() > expiredAt)) {
              _context2.next = 10;
              break;
            }

            _context2.prev = 3;
            return _context2.abrupt("return", _store["default"].dispatch('refresh'));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", _store["default"].dispatch('login'));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 7]]);
  }));

  return function checkToken() {
    return _ref2.apply(this, arguments);
  };
}(); // 普通请求


var authRequest = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee3(url) {
    var options,
        showLoading,
        _args3 = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            showLoading = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
            _context3.next = 4;
            return checkToken();

          case 4:
            options.header = {
              Authorization: 'Bearer ' + _store["default"].getters.accessToken
            };
            _context3.next = 7;
            return request(url, options, showLoading);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function authRequest(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); // 上传文件


exports.authRequest = authRequest;

var uploadFile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee4(url) {
    var options,
        showLoading,
        response,
        error,
        _args4 = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            showLoading = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : true;

            if (showLoading) {
              wx.showLoading({
                title: '上传中'
              });
            } // 拼接请求地址


            options.url = host + url;
            checkToken();
            options.header = {
              Authorization: 'Bearer' + _store["default"].getters.accessToken
            };
            _context4.next = 8;
            return _core["default"].wx.uploadFile(options);

          case 8:
            response = _context4.sent;

            if (showLoading) {
              wx.hideLoading();
            }

            if (!(response.statusCode >= 200 && response.statusCode < 300)) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", response);

          case 12:
            wx.showModal({
              title: '提示',
              content: '服务器错误，请联系管理员或重试'
            });
            error = new Error(response.data.message);
            error.response = response;
            return _context4.abrupt("return", Promise.reject(error));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function uploadFile(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.uploadFile = uploadFile;