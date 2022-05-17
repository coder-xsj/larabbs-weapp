"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _weValidator = _interopRequireDefault(require('./../../vendor.js')(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  store: _store["default"],
  data: {
    // 用户名
    form: {},
    // 是否有错
    errors: {},
    // 错误信息
    errorMessage: ''
  },
  onReady: function onReady() {
    this.initValidator();
  },
  methods: {
    initValidator: function initValidator() {
      var _this = this;

      // 实例化
      this.validatorInstance = new _weValidator["default"]({
        rules: {
          username: {
            required: true
          },
          password: {
            required: true,
            minlength: 6
          }
        },
        messages: {
          username: {
            required: '请输入用户名'
          },
          password: {
            required: '请填写密码',
            minlength: '密码最少 6 位数'
          }
        },
        onMessage: function onMessage(data) {
          _this.$set(_this.errors, data.name, [data.msg]);

          _this.errorMessage = data.msg;
        }
      });
    },
    // 表单提交
    submit: function submit() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.error = {}; // 提交时重置错误

                if (_this2.validatorInstance.checkData(_this2.form)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return _this2.$store.dispatch('login', _this2.form);

              case 6:
                wx.navigateBack();
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                _this2.errorMessage = _context.t0.response.data.message;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 9]]);
      }))();
    }
  },
  // 页面打开事件
  onShow: function onShow() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
      return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this3.$store.dispatch('login');

            case 3:
              wx.navigateBack();
              _context2.next = 8;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }))();
  }
}, {info: {"components":{},"on":{}}, handlers: {'10-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'3': {
      type: "input",
      expr: "form.username",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "username", $v);
      
    }
    },'4': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'10-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'3': {
      type: "input",
      expr: "form.username",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "username", $v);
      
    }
    },'4': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'10-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'3': {
      type: "input",
      expr: "form.username",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "username", $v);
      
    }
    },'4': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'10-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}}}, models: {'3': {
      type: "input",
      expr: "form.username",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "username", $v);
      
    }
    },'4': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    }}, refs: undefined });