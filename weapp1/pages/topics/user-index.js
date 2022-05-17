"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var _topic = require('./../../api/topic.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  data: {
    page: 1,
    // 话题数据
    topics: [],
    // 有没有更多数据
    noMoreData: false,
    // 是否在加载中
    isLoading: false,
    // 用户 id
    userId: 0
  },
  onLoad: function onLoad(options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
      return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.userId = options.id;

              _this.loadTopics();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
      return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this2.page = 1;
              _this2.noMoreData = false;
              _context2.next = 4;
              return _this2.loadTopics(true);

            case 4:
              wx.stopPullDownRefresh();

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  onReachBottom: function onReachBottom() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee3() {
      return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(_this3.noMoreData || _this3.isLoading)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _this3.isLoading = true;
              _this3.page += 1;
              _context3.next = 6;
              return _this3.loadTopics();

            case 6:
              _this3.isLoading = false;

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  methods: {
    loadTopics: function loadTopics() {
      var _arguments = arguments,
          _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee4() {
        var reset, topicsResponse, pagination;
        return _regeneratorRuntime2["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                reset = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                _context4.next = 3;
                return (0, _topic.getUserTopics)(_this4.userId, {
                  page: _this4.page,
                  include: 'user,category'
                });

              case 3:
                topicsResponse = _context4.sent;
                // 将数据合并到 this.topics
                _this4.topics = reset ? topicsResponse.data.data : _this4.topics.concat(topicsResponse.data.data);
                pagination = topicsResponse.data.meta; // 根据分页设置是否还有更多数据

                if (pagination.current_page === pagination.last_page) {
                  _this4.noMoreData = true;
                }

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  }
}, {info: {"components":{"topic-list":{"path":"./../../components/topic-list"}},"on":{}}, handlers: {}, models: {}, refs: undefined });