"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var _topic = require('./../../api/topic.js');

var _methods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  data: {
    // 分类数据
    categories: [],
    // 当前的分类
    currentCategory: {},
    // 是否显示分类
    categoryOpen: false,
    // 话题数据
    topics: [],
    // 当前分页
    page: 1,
    // 是否还有更多数据
    noMoreData: false
  },
  computed: {
    currentCategoryId: function currentCategoryId() {
      return this.currentCategory.id || null;
    },
    currentCategoryName: function currentCategoryName() {
      return this.currentCategory.name || '话题';
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
      return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loadTopics();

              _this.loadCategories();

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
              if (!_this3.noMoreData) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _this3.page += 1;
              _context3.next = 5;
              return _this3.loadTopics();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  methods: (_methods = {
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
                return (0, _topic.getTopics)({
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
    },
    loadCategories: function loadCategories() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee5() {
        var categories, categoriesResponse;
        return _regeneratorRuntime2["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // 从缓存中获取分类数据
                categories = wx.getStorageSync('categories');

                if (categories) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return (0, _topic.getCategories)();

              case 4:
                categoriesResponse = _context5.sent;
                categories = categoriesResponse.data.data;
                wx.setStorageSync('categories', categories);

              case 7:
                _this5.categories = categories;

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  }, _defineProperty(_methods, "loadTopics", function loadTopics() {
    var _arguments2 = arguments,
        _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee6() {
      var reset, params, topicsResponse, pagination;
      return _regeneratorRuntime2["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              reset = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : false;
              params = {
                page: _this6.page,
                include: 'user,category'
              };

              if (_this6.currentCategoryId) {
                params['filter[category_id]'] = _this6.currentCategoryId;
              } // 请求话题列表接口


              _context6.next = 5;
              return (0, _topic.getTopics)(params);

            case 5:
              topicsResponse = _context6.sent;
              // 将数据合并到 this.topics
              _this6.topics = reset ? topicsResponse.data.data : _this6.topics.concat(topicsResponse.data.data);
              pagination = topicsResponse.data.meta; // 根据分页设置是否还有更多数据

              if (pagination.current_page === pagination.last_page) {
                _this6.noMoreData = true;
              }

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }), _defineProperty(_methods, "categorisToggle", function categorisToggle() {
    this.categoryOpen = !this.categoryOpen;
  }), _defineProperty(_methods, "changeCategory", function changeCategory() {
    var _arguments3 = arguments,
        _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee7() {
      var category;
      return _regeneratorRuntime2["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              category = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : {};
              _this7.currentCategory = category;
              _this7.categoryOpen = false;
              _this7.page = 1; // 设置 reset 为 true

              _this7.loadTopics(true);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  }), _methods)
}, {info: {"components":{"datetime-diff":{"path":"./../../components/datetime-diff"},"topic-list":{"path":"./../../components/topic-list"}},"on":{}}, handlers: {'7-45': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.categorisToggle.apply(_vm, $args || [$event]);
  })();
}},'7-46': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.changeCategory.apply(_vm, $args || [$event]);
  })();
}},'7-47': {"tap": function proxy (category) {
    var _vm=this;
  return (function () {
    _vm.changeCategory(category);
  })();
}}}, models: {}, refs: undefined });