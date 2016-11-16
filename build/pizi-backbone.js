(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["module", "exports", "backbone"], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("backbone"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.backbone);
		global.piziBackbone = mod.exports;
	}
})(this, function (module, exports, _backbone) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var FormView = _backbone2.default.View.extend({
		tagName: "form",
		initialize: function initialize() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? { errorClass: 'error', validate: [] } : arguments[0];

			this.params = _.extend({
				type: 'POST',
				processData: false,
				contentType: false,
				cache: false
			}, _.omit(options, ['template', 'validate', 'errorClass']));
			this.template = options.template;
			this.validate = options.validate;
			this.errorClass = options.errorClass;
		},

		events: {
			'click .submit': 'submit'
		},
		inputError: function inputError(name, error) {
			this.$el.find("input[name=\"" + name + "\"]").addClass(this.errorClass);
		},
		getValues: function getValues() {
			return this.$el.serializeArray();
		},
		getObject: function getObject() {
			var object = {};
			_.each(this.getValues(), function (attribute) {
				return object[attribute.name] = attribute.value;
			});
			return object;
		},
		check: function check() {
			var valid = true;
			for (var rule in this.validate) {
				var el = this.$el.find('*[name="' + rule.name + '"]');
				if (el.length && !el.val().match(rule.regex)) {
					if (!el.hasClass(this.errorClass)) {
						el.addClass(this.errorClass);
						el.after('<small class="' + this.errorClass + '">' + rule.message + '</small>');
					}
					valid = false;
				} else if (el.length) {
					el.removeClass(this.errorClass);
					el.next('small.' + this.errorClass).remove();
				}
			}
			this.isValid = valid;
			return valid;
		},
		submit: function submit() {
			var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			params = !params.currentTarget ? _.extend(this.params, params) : this.params;
			if (params.type.toUpperCase() !== 'GET') params.data = new FormData(this.$el[0]);
			$.ajax(params);
		},
		render: function render() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			if (this.template) this.$el.html(this.template);
		}
	});

	var NotificationView = _backbone2.default.View.extend({
		tagName: "notification",
		className: "container-fluid",
		template: _.template("<h3 class=\"notif <%= className %>\"><%= message %><a class=\"close\">&times;</a></h3>"),
		initialize: function initialize() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			if ($('notification').length === 0) this.$el.prependTo('body');else this.$el = $($('notification')[0]);
			this.duration = options.duration || 3000;
			this.template = options.template || this.template;
		},

		events: {
			'click .close': 'close'
		},
		close: function close(event) {
			var $notif = event.currentTarget ? $(event.currentTarget).parents('.notif') : event;
			$notif.slideUp({
				complete: function complete() {
					$notif.remove();
				}
			});
		},
		success: function success(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({ className: "success", message: message }, options);
		},
		error: function error(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({ className: "alert", message: message }, options);
		},
		warn: function warn(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({ className: "warning", message: message }, options);
		},
		notify: function notify(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({ message: message }, options);
		},
		render: function render(notif) {
			var _this = this;

			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var $notif = $(this.template({ className: notif.className, message: notif.message }));
			this.$el.append($notif);
			if (!options.permanent) setTimeout(function () {
				_this.close($notif);
			}, options.duration || this.duration);
		}
	});

	var PopupView = _backbone2.default.View.extend({
		tagName: "popup",
		template: _.template("<div class=\"background\"></div>\n\t\t\t\t\t\t  <div class=\"container\">\n\t\t\t\t\t\t  \t<a class=\"close\">&#215;</a>\n\t\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\t\t<% template ? print(template) : print(message) %>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class=\"actions\">\n\t\t\t\t\t\t\t\t<li class=\"ok\">Ok</li>\n\t\t\t\t\t\t\t\t<li class=\"custom\"><%= customName %></li>\n\t\t\t\t\t\t\t\t<li class=\"cancel\">Cancel</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t  </div>"),
		initialize: function initialize() {
			if ($('popup').length === 0) this.$el.prependTo('body');else this.$el = $($('popup')[0]);
		},

		events: {
			'click .close': 'onClose',
			'click .cancel': 'onClose',
			'click .ok': 'onOk',
			'click .custom': 'onCustom'
		},
		setParam: function setParam(params) {
			var _this2 = this;

			this.type = params.type;
			this.ok = params.ok;
			this.close = params.close;
			this.custom = params.custom;
			this.$el.addClass(params.class);
			this.resizeOff = params.resizeOff;
			var view = this;
			if (params.template) {
				if (params.isform) {
					(function () {
						var view = _this2;
						var PopupFormView = FormView.extend({
							initialize: function initialize() {
								FormView.prototype.initialize.apply(this, arguments);
							},
							submit: function submit() {
								var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

								FormView.prototype.submit.apply(this, arguments);
								view.closePopup();
							}
						});
						_this2.view = new PopupFormView(params);
					})();
				} else if (params.template instanceof _backbone2.default.View) {
					this.view = params.template;
				}
				if (this.view && this.view.ok) {
					var ok = params.ok;
					params.ok = function () {
						return view.view.ok(ok);
					};
				}
				this.ok = params.ok || this.ok;
			} else {
				this.view = null;
			}
		},
		basic: function basic() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			this.setParam(options);
			this.render(options);
			return this;
		},
		form: function form() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			options.isform = true;
			this.setParam(options);
			this.render(options);
			return this;
		},
		onClose: function onClose() {
			if (this.close) this.close.apply(this, [this.callbackArgs()]);
			this.closePopup();
		},
		onOk: function onOk() {
			if (this.ok) this.ok.apply(this, [this.callbackArgs()]);
			if (this.type !== 'form' || this.view.isValid) this.closePopup();
		},
		onCustom: function onCustom() {
			if (this.custom) this.custom.apply(this, [this.callbackArgs()]);
			this.closePopup();
		},
		closePopup: function closePopup() {
			if (this.view) this.view.remove();
			this.$el.css('display', 'none').html();
		},
		callbackArgs: function callbackArgs() {
			var valid = true;
			var args = [];
			if (this.type === 'form') {
				valid = this.view.check();
				args.push(this.view.getValues());
				args.push(valid);
			}
			args.push(this);
			return args;
		},
		renderActions: function renderActions(staticActions) {
			this.$el.find('.ok')[this.ok ? 'show' : 'hide']();
			this.$el.find('.cancel')[this.close ? 'show' : 'hide']();
			this.$el.find('.custom')[this.custom ? 'show' : 'hide']();
			this.$el.find('.actions')[!this.ok && !this.close && !this.custom ? 'hide' : 'show']();
			staticActions = staticActions ? 'addClass' : 'removeClass';
			this.$el.find('.actions')[staticActions]('static');
			this.$el[staticActions]('static-actions');
		},
		render: function render() {
			var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			data = _.extend({
				message: "",
				customName: "",
				template: ""
			}, _.pick(data, ['message', 'customName', 'template', 'staticActions']));
			this.$el.html(this.template(data)).css('display', 'flex');
			this.renderActions(data.staticActions);
			if (this.view) {
				this.view.render();
				this.$el.find('.content').html(this.view.$el);
			}
			this.delegateEvents();
		}
	});

	var WaitView = _backbone2.default.View.extend({
		template: _.template("<div class=\"background\"></div><div class=\"message pulse\"><%= message %><div class=\"anim\"></div></div>"),
		tagName: "wait",
		initialize: function initialize() {
			if ($('wait').length === 0) this.$el.prependTo('body');else this.$el = $('wait').first();
		},
		start: function start(message, $el) {
			var _this3 = this;

			if (message instanceof $) {
				$el = message;
				message = null;
			}
			var $template = this.template({ message: message || 'loading...' });
			var $parent = $el || $('body');
			$parent.addClass('wait-container hide-child');
			if ($el) {
				$parent.prepend($('<wait style="display:block"></wait>').prepend($template));
			} else {
				this.$el.html($template).show();
			}
			return {
				stop: function stop(callback) {
					return _this3.stop($el, callback);
				}
			};
		},
		stop: function stop($el, callback) {
			callback = _.isFunction($el) ? $el : callback;
			var $wait = $el && $el.find('wait') || this.$el;
			var $parent = $el || $('body');
			$wait.find('.background, .message').removeClass('pulse').css('opacity', 0);
			$parent.removeClass('hide-child');
			setTimeout(function () {
				$parent.removeClass('wait-container');
				$wait.hide().html('');
				if ($el) $wait.remove();
				if (callback) callback();
			}, 1500);
		}
	});
	// Add token in REST request
	var useJwt = function useJwt() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {
			token: function token() {},
			onUnauthorized: function onUnauthorized() {}
		} : arguments[0];

		var sync = _backbone2.default.sync;
		_backbone2.default.sync = function (method, model, opts) {
			var token = options.token();
			if (token) opts.beforeSend = function (xhr) {
				xhr.setRequestHeader(options.header || 'authorization', 'Bearer ' + token);
			};
			var err = opts.error;
			opts.error = function (param) {
				if (param.status && param.status === 401) options.onUnauthorized();
				err(param);
			};
			sync(method, model, opts);
		};
	};

	exports.default = {
		NotificationView: NotificationView,
		PopupView: PopupView,
		FormView: FormView,
		WaitView: WaitView,
		useJwt: useJwt
	};
	module.exports = exports["default"];
});
