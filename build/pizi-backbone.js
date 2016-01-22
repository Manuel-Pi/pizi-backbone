"use strict";

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "Backbone"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("Backbone"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Backbone);
		global.piziBackbone = mod.exports;
	}
})(this, function (exports, _Backbone) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Backbone2 = _interopRequireDefault(_Backbone);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var FormView = _Backbone2.default.View.extend({
		tagName: "form",
		initialize: function initialize(options) {
			this.template = options.template;
			this.validate = options.validate;
		},
		inputError: function inputError(name, error) {
			this.$el.find("input[name=\"" + name + "\"]").addClass('error');
		},
		getValues: function getValues() {
			return this.$el.serializeArray();
		},
		check: function check() {
			var valid = true;
			var i = this.validate.length;

			while (i--) {
				var rule = this.validate[i];
				var el = this.$el.find('*[name="' + rule.name + '"]');

				if (el.length && !el.val().match(rule.regex)) {
					if (!el.hasClass('error')) {
						el.addClass('error');
						el.after('<small class="error">' + rule.message + '</small>');
					}

					valid = false;
				} else if (el.length) {
					el.removeClass('error');
					el.next('small.error').remove();
				}
			}

			this.isValid = valid;
			return valid;
		},
		render: function render() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			if (this.template) this.$el.html(this.template);
		}
	});

	var NotificationView = _Backbone2.default.View.extend({
		tagName: "notification",
		className: "container-fluid",
		template: _.template("<div data-alert class=\"alert-box <%= type %>\">\n            \t\t\t   \t<%= message %><a class=\"close\">&times;</a>\n        \t\t\t\t   </div>"),
		initialize: function initialize() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.duration = options.duration || 3000;

			if ($('notification').length === 0) {
				this.$el.prependTo('body');
			} else {
				this.$el = $($('notification')[0]);
			}
		},
		success: function success(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({
				type: "success",
				message: message
			}, options);
		},
		error: function error(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({
				type: "alert",
				message: message
			}, options);
		},
		warn: function warn(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({
				type: "warning",
				message: message
			}, options);
		},
		notify: function notify(message) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			this.render({
				message: message
			}, options);
		},
		render: function render(news) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var $news = $(this.template({
				type: news.type,
				message: news.message
			}));
			this.$el.append($news);

			if (!options.permanent) {
				setTimeout(function () {
					$news.slideUp();
					$news.find("a.close").click();
				}, options.duration || this.duration);
			}

			if (!this.foundationInitilized) {
				$(document).foundation('alert', 'reflow');
				this.foundationInitilized = true;
			}
		}
	});

	var PopupView = _Backbone2.default.View.extend({
		tagName: "popup",
		className: "reveal-modal container-fluid small",
		template: _.template("<a class=\"close-reveal-modal\" aria-label=\"Close\">&#215;</a>\n\t\t\t\t\t\t  <div>\n\t\t\t\t\t\t\t<div class=\"row content\">\n\t\t\t\t\t\t\t\t<% template ? print(template) : print(message) %>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class=\"actions button-group right\">\n\t\t\t\t\t\t\t\t<li class=\"ok\"><a class=\"button\">Ok</a></li>\n\t\t\t\t\t\t\t\t<li class=\"custom\"><a class=\"button\"><%= customName %></a></li>\n\t\t\t\t\t\t\t\t<li class=\"cancel\"><a class=\"button alert\">Cancel</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t  </div>"),
		initialize: function initialize() {
			var _this = this;

			if ($('popup').length === 0) {
				this.$el.prependTo('body');
			} else {
				this.$el = $($('popup')[0]);
			}

			this.$el.attr('data-reveal', '');
			this.$el.foundation({
				reveal: {
					close_on_background_click: false,
					dismiss_modal_class: 'close-modal',
					close_on_esc: false,
					animation: 'none'
				}
			});
			var view = this;
			$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
				window.removeEventListener('resize', _this.resize);
				$('body').css('overflow', 'auto');
			});
			$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
				view.resize();
				window.addEventListener('resize', _this.resize, true);
				$('body').css('overflow', 'hidden');
			});
		},
		events: {
			'click .close-reveal-modal': 'onClose',
			'click .cancel': 'onClose',
			'click .ok': 'onOk',
			'click .custom': 'onCustom'
		},
		resetParam: function resetParam() {
			this.type = null;
			this.ok = null;
			this.close = null;
			this.custom = null;
			this.view = null;
		},
		confirm: function confirm() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.resetParam();
			this.type = 'confirm';
			this.ok = options.ok;
			this.close = options.close;
			this.custom = options.custom;
			this.render({
				message: options.message,
				customName: options.customName,
				staticActions: options.staticActions
			});
		},
		alert: function alert() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.resetParam();
			this.type = 'alert';
			this.ok = true;
			this.render({
				message: options.message,
				staticActions: options.staticActions
			});
		},
		form: function form() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.resetParam();
			this.type = 'form';
			this.ok = options.ok;
			this.close = options.close;
			this.custom = options.custom;
			this.view = options.template instanceof FormView ? options.template : new FormView({
				template: options.template,
				validate: options.validate
			});
			this.render({
				customName: options.customName,
				staticActions: options.staticActions
			});
		},
		onClose: function onClose() {
			if (this.close) this.close.apply(this, this.callbackArgs());
			this.closePopup();
		},
		onOk: function onOk() {
			if (this.ok) this.ok.apply(this, this.callbackArgs());
			if (this.type === 'form' && this.view.isValid) this.closePopup();
		},
		onCustom: function onCustom() {
			if (this.custom) this.custom.apply(this, this.callbackArgs());
			this.closePopup();
		},
		closePopup: function closePopup() {
			this.$el.foundation('reveal', 'close');
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
		resize: function resize() {
			var $popup = $('popup');
			$popup.height("");
			var bodyHeight = $('body').height() - 10;
			var height = $popup.outerHeight();
			var top = 5;

			if (height > bodyHeight) {
				$popup.outerHeight(bodyHeight);
			} else {
				top = (bodyHeight + 10 - height) / 2;
			}

			$popup.css('top', top > 100 ? 100 : top + 'px');
		},
		render: function render() {
			var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			data = _.extend({
				message: "",
				customName: "",
				template: ""
			}, data);
			this.$el.html(this.template(data));

			if (this.view) {
				this.view.render();
				this.$el.find('.content').html(this.view.$el);
			}

			this.renderActions(data.staticActions);
			this.$el.foundation('reveal', 'open');
			this.delegateEvents();
		}
	});

	exports.default = {
		NotificationView: NotificationView,
		PopupView: PopupView,
		FormView: FormView
	};
});
