"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(0));

var _core = _interopRequireDefault(require('./../../vendor.js')(1));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _auth = require('./../../api/auth.js');

var _weValidator = _interopRequireDefault(require('./../../vendor.js')(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  store: _store["default"],
  data: {
    // 表单
    form: {
      phone: null
    },
    // 图片验证值
    captchaValue: null,
    // 手机号 input 是否 disabled
    phoneDisabled: false,
    // 图片验证码 modal 是否显示
    captchaModalShow: false,
    // 图片验证码 key 及过期时间
    captcha: {},
    // 表单错误
    errors: {},
    // 短信验证码 key 及过期时间
    verificationCode: {}
  },
  onReady: function onReady() {
    this.initValidator();
  },
  methods: {
    initValidator: function initValidator() {
      var _this = this;

      this.phoneValidatorInstance = new _weValidator["default"]({
        rules: {
          phone: {
            required: true,
            mobile: true
          }
        },
        messages: {
          phone: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
          }
        },
        onMessage: function onMessage(data) {
          _this.$set(_this.errors, data.name, [data.msg]);
        }
      }); // 注册表单验证实例化

      this.validatorInstance = new _weValidator["default"]({
        multiCheck: true,
        rules: {
          phone: {
            required: true,
            mobile: true
          },
          name: {
            required: true
          },
          verification_code: {
            required: true
          },
          password: {
            required: true,
            minlength: 6
          }
        },
        messages: {
          phone: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
          },
          name: {
            required: '请输入姓名'
          },
          verification_code: {
            required: '请输入验证码'
          },
          password: {
            required: '请填写密码',
            minlength: '密码最少 6 位数'
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
    // 发送短信验证码
    sendVerificationCode: function sendVerificationCode() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee() {
        var codeResponse;
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this2.captchaValue) {
                  _context.next = 3;
                  break;
                }

                _this2.$set(_this2.errors, 'captchaValue', ['请输入图片验证码']);

                return _context.abrupt("return", false);

              case 3:
                if (!(new Date().getTime() > new Date(_this2.captcha.expiredAt).getTime())) {
                  _context.next = 7;
                  break;
                }

                _this2.$set(_this2.errors, 'captchaValue', ['请输入图片验证码']);

                _this2.getCaptchaCode();

                return _context.abrupt("return", false);

              case 7:
                _context.prev = 7;
                _context.next = 10;
                return (0, _auth.getVerificationCode)(_this2.captcha.key, _this2.captchaValue);

              case 10:
                codeResponse = _context.sent;
                // 记录 key 和 过期时间
                _this2.verificationCode = {
                  key: codeResponse.data.key,
                  expiredAt: Date.parse(codeResponse.data.expired_at)
                }; // 关闭modal

                _this2.captchaModalShow = false; // 手机输入框 disabled

                _this2.phoneDisabled = true;
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](7);

                // 验证码错误提示
                _this2.$set(_this2.errors, 'captchaValue', _context.t0.response.data.message);

                _this2.getCaptchaCode();

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 16]]);
      }))();
    },
    // 响应获取图片验证码按钮点击事件
    getCaptchaCode: function getCaptchaCode() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee2() {
        var captchaResponse;
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.errors = {};

                if (_this3.phoneValidatorInstance.checkData(_this3.form)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                _context2.prev = 3;
                _context2.next = 6;
                return (0, _auth.getCaptcha)(_this3.form.phone);

              case 6:
                captchaResponse = _context2.sent;
                _this3.captcha = {
                  key: captchaResponse.data.captcha_key,
                  imageContent: captchaResponse.data.captcha_image_content,
                  expiredAt: Date.parse(captchaResponse.data.expired_at)
                }; // 打开modal

                _this3.captchaModalShow = true;
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);

                if (_context2.t0.response.statusCode === 422) {
                  _this3.errors = _context2.t0.response.data.errors;
                }

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 11]]);
      }))();
    },
    // 表单提交
    submit: function submit() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee4() {
        var formData;
        return _regeneratorRuntime2["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // 提交之前清空错误信息
                _this4.errors = {};

                if (_this4.validatorInstance.checkData(_this4.form)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return");

              case 3:
                if (_this4.verificationCode.key) {
                  _context4.next = 6;
                  break;
                }

                wx.showToast({
                  title: '请发送验证码',
                  icon: 'none',
                  duration: 2000
                });
                return _context4.abrupt("return", false);

              case 6:
                if (!(new Date().getTime() > _this4.verificationCode.expiredAt)) {
                  _context4.next = 9;
                  break;
                }

                wx.showToast({
                  title: '验证码已过期',
                  icon: 'none',
                  duration: 2000
                });
                return _context4.abrupt("return", false);

              case 9:
                _context4.prev = 9;
                formData = _this4.form;
                formData.verification_key = _this4.verificationCode.key;
                _context4.next = 14;
                return _this4.$store.dispatch('register', formData);

              case 14:
                wx.showToast({
                  title: '注册成功',
                  icon: 'success'
                }); // 跳转到我的页面

                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2["default"].mark(function _callee3() {
                  return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          wx.switchTab({
                            url: '/pages/users/me'
                          });

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })), 2000);
                _context4.next = 22;
                break;

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](9);

                // 验证码错误
                if (_context4.t0.response.statusCode === 401) {
                  _this4.$set(_this4.errors, 'verification_code', ['验证码错误']);
                } // 表单错误


                if (_context4.t0.response.statusCode === 422) {
                  _this4.errors = _context4.t0.response.data.errors;
                }

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[9, 18]]);
      }))();
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'11-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}},'11-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}},'11-2': {"confirm": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sendVerificationCode.apply(_vm, $args || [$event]);
  })();
}},'11-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}}}, models: {'5': {
      type: "input",
      expr: "form.phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "phone", $v);
      
    }
    },'6': {
      type: "input",
      expr: "form.verification_code",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "verification_code", $v);
      
    }
    },'7': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'8': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    },'9': {
      type: "input",
      expr: "captchaValue",
      handler: function set ($v) {
      var _vm=this;
        _vm.captchaValue = $v;
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'11-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}},'11-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}},'11-2': {"confirm": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sendVerificationCode.apply(_vm, $args || [$event]);
  })();
}},'11-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}}}, models: {'5': {
      type: "input",
      expr: "form.phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "phone", $v);
      
    }
    },'6': {
      type: "input",
      expr: "form.verification_code",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "verification_code", $v);
      
    }
    },'7': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'8': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    },'9': {
      type: "input",
      expr: "captchaValue",
      handler: function set ($v) {
      var _vm=this;
        _vm.captchaValue = $v;
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'11-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}},'11-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}},'11-2': {"confirm": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sendVerificationCode.apply(_vm, $args || [$event]);
  })();
}},'11-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}}}, models: {'5': {
      type: "input",
      expr: "form.phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "phone", $v);
      
    }
    },'6': {
      type: "input",
      expr: "form.verification_code",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "verification_code", $v);
      
    }
    },'7': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'8': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    },'9': {
      type: "input",
      expr: "captchaValue",
      handler: function set ($v) {
      var _vm=this;
        _vm.captchaValue = $v;
      
    }
    }}, refs: undefined }, {info: {"components":{},"on":{}}, handlers: {'11-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}},'11-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submit.apply(_vm, $args || [$event]);
  })();
}},'11-2': {"confirm": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sendVerificationCode.apply(_vm, $args || [$event]);
  })();
}},'11-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCaptchaCode.apply(_vm, $args || [$event]);
  })();
}}}, models: {'5': {
      type: "input",
      expr: "form.phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "phone", $v);
      
    }
    },'6': {
      type: "input",
      expr: "form.verification_code",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "verification_code", $v);
      
    }
    },'7': {
      type: "input",
      expr: "form.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "name", $v);
      
    }
    },'8': {
      type: "input",
      expr: "form.password",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "password", $v);
      
    }
    },'9': {
      type: "input",
      expr: "captchaValue",
      handler: function set ($v) {
      var _vm=this;
        _vm.captchaValue = $v;
      
    }
    }}, refs: undefined });