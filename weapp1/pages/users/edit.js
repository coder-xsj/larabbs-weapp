"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var _user = require('./../../api/user.js');

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _x = require('./../../vendor.js')(4);

var _weValidator = _interopRequireDefault(require('./../../vendor.js')(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  config: {
    navigationBarTitleText: '修改个人信息'
  },
  data: {
    form: {},
    // 错误信息
    errors: {}
  },
  computed: _objectSpread({}, (0, _x.mapGetters)(['user'])),
  onShow: function onShow() {
    this.form = this.user;
  },
  onReady: function onReady() {
    this.initValidator();
  },
  methods: {
    initValidator: function initValidator() {
      var _this = this;

      // 实例化
      this.validatorInstance = new _weValidator["default"]({
        multiCheck: true,
        rules: {
          name: {
            required: true
          },
          email: {
            email: true
          }
        },
        messages: {
          name: {
            required: '请输入姓名'
          },
          email: {
            email: '邮箱格式不正确'
          }
        },
        onMessage: function onMessage(data) {
          var errors = {};
          Object.keys(data).map(function (key) {
            errors[key] = [data[key].msg];
          });
          _this.errors = errors;
        }
      });
    },
    // 表单提交
    submit: function submit() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.errors = {};

                if (_this2.validatorInstance.checkData(_this2.form)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                _context2.prev = 3;
                _context2.next = 6;
                return _this2.$store.dispatch('updateUser', _this2.form);

              case 6:
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000
                }); // 跳转到我的页面

                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
                  return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          wx.switchTab({
                            url: '/pages/users/me'
                          });

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), 800);
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);

                // 设置报错信息
                if (_context2.t0.response.statusCode === 422) {
                  _this2.errors = _context2.t0.response.data.errors;
                }

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 10]]);
      }))();
    },
    uploadAvatar: function uploadAvatar() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee3() {
        var image, avatar, imageResponse, responseData;
        return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _core["default"].wx.chooseImage({
                  count: 1
                });

              case 2:
                image = _context3.sent;
                _context3.prev = 3;
                // 获取选择的图片
                avatar = image.tempFilePaths[0]; // 调用上传图片接口

                _context3.next = 7;
                return (0, _user.updateAvatar)(avatar);

              case 7:
                imageResponse = _context3.sent;
                // 小程序上传结果没有做 JSON.parse，需要手动处理
                responseData = JSON.parse(imageResponse.data);
                _this3.form = Object.assign({}, _this3.form, {
                  'avatar': responseData.path,
                  'avatar_image_id': responseData.id
                });
                _context3.next = 14;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](3);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 12]]);
      }))();
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'9-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadAvatar.apply(_vm, $args || [$event]);
  })();
}},'9-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'1': {
      type: "input",
      expr: "form.email",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "email", $v);
      
    }
    },'2': {
      type: "input",
      expr: "form.introduction",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "introduction", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'9-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadAvatar.apply(_vm, $args || [$event]);
  })();
}},'9-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'1': {
      type: "input",
      expr: "form.email",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "email", $v);
      
    }
    },'2': {
      type: "input",
      expr: "form.introduction",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "introduction", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'9-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadAvatar.apply(_vm, $args || [$event]);
  })();
}},'9-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'1': {
      type: "input",
      expr: "form.email",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "email", $v);
      
    }
    },'2': {
      type: "input",
      expr: "form.introduction",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "introduction", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'9-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadAvatar.apply(_vm, $args || [$event]);
  })();
}},'9-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'1': {
      type: "input",
      expr: "form.email",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "email", $v);
      
    }
    },'2': {
      type: "input",
      expr: "form.introduction",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "introduction", $v);
      
    }
    }}, refs: undefined });