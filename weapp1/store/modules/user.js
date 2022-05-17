"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var auth = _interopRequireWildcard(require('./../../utils/auth.js'));

var _isEmpty = _interopRequireDefault(require('./../../vendor.js')(42));

var _user = require('./../../api/user.js');

var _auth2 = require('./../../api/auth.js');

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getDefaultState = function getDefaultState() {
  return {
    user: auth.getUser(),
    accessToken: auth.getToken(),
    accessTokenExpiredAt: auth.getTokenExpiredAt()
  };
};

var state = getDefaultState(); // 定义 getters

var getters = {
  isLoggedIn: function isLoggedIn(state) {
    return !(0, _isEmpty["default"])(state.accessToken);
  },
  user: function user(state) {
    return state.user;
  },
  accessToken: function accessToken(state) {
    return state.accessToken;
  },
  accessTokenExpiredAt: function accessTokenExpiredAt(state) {
    return state.accessTokenExpiredAt;
  }
}; // 定义 actions

var actions = {
  login: function login(_ref) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
      var dispatch, commit, params, loginData, authResponse;
      return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch, commit = _ref.commit;
              params = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
              _context.next = 4;
              return _core["default"].wx.login();

            case 4:
              loginData = _context.sent;
              params.code = loginData.code;
              _context.next = 8;
              return (0, _auth2.login)(params);

            case 8:
              authResponse = _context.sent;
              commit('setToken', authResponse.data);
              auth.setToken(authResponse.data);
              dispatch('getUser');

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getUser: function getUser(_ref2) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
      var dispatch, commit, userResponse;
      return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref2.dispatch, commit = _ref2.commit;
              _context2.next = 3;
              return (0, _user.getCurrentUser)();

            case 3:
              userResponse = _context2.sent;
              commit('setUser', userResponse.data);
              auth.setUser(userResponse.data);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  refresh: function refresh(_ref3) {
    var _arguments2 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee3() {
      var dispatch, commit, state, params, refreshResponse;
      return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref3.dispatch, commit = _ref3.commit, state = _ref3.state;
              params = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
              _context3.next = 4;
              return (0, _auth2.refresh)(state.accessToken, {}, false);

            case 4:
              refreshResponse = _context3.sent;
              commit('setToken', refreshResponse.data);
              auth.setToken(refreshResponse.data);
              dispatch('getUser');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  logout: function logout(_ref4) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee4() {
      var commit, state;
      return _regeneratorRuntime2["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref4.commit, state = _ref4.state;
              _context4.next = 3;
              return (0, _auth2.logout)(state.accessToken);

            case 3:
              // 清空 storage
              auth.logout();
              commit('resetState');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  register: function register(_ref5) {
    var _arguments3 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee5() {
      var dispatch, params, loginData;
      return _regeneratorRuntime2["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatch = _ref5.dispatch;
              params = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : {};
              _context5.next = 4;
              return _core["default"].wx.login();

            case 4:
              loginData = _context5.sent;
              params.code = loginData.code;
              _context5.next = 8;
              return (0, _auth2.register)(params);

            case 8:
              _context5.next = 10;
              return dispatch('login');

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  updateUser: function updateUser(_ref6) {
    var _arguments4 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee6() {
      var commit, params, editResponse;
      return _regeneratorRuntime2["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref6.commit;
              params = _arguments4.length > 1 && _arguments4[1] !== undefined ? _arguments4[1] : {};
              _context6.next = 4;
              return (0, _user.updateUser)(params);

            case 4:
              editResponse = _context6.sent;
              commit('setUser', editResponse.data);
              auth.setUser(editResponse.data);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
}; // 定义 mutations

var mutations = {
  setUser: function setUser(state, user) {
    state.user = user;
  },
  setToken: function setToken(state, tokenPayload) {
    state.accessToken = tokenPayload.access_token;
    state.accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000;
  },
  resetState: function resetState(state) {
    Object.assign(state, getDefaultState());
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;