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

	var NotificationView = _Backbone2.default.View.extend({
		tagName: "notification",
		className: "container-fluid",
		template: _.template("\n        <div data-alert class=\"alert-box <%= type %>\" style=\"margin-bottom: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t padding-top: 5px;\n      \t\t\t\t\t\t\t\t\t\t\t\t\t\t padding-bottom: 5px;\">\n            <%= message %><a class=\"close\">&times;</a>\n        </div>"),
		initialize: function initialize() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.duration = options.duration || 3000;

			if ($('notification').length === 0) {
				this.$el.prependTo('body');
			} else {
				this.$el = $($('notification')[0]);
			}

			this.$el.css({
				'position': 'fixed',
				'top': '0',
				'width': '100%',
				'z-index': '1000'
			});
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
		template: _.template("\n        <a class=\"close-reveal-modal\" aria-label=\"Close\">&#215;</a>\n        <div>\n            <div class=\"row content\">\n                <% template ? print(template) : print(message) %>\n            </div>\n            <div class=\"actions right\">\n                <button class=\"ok button\">Ok</button>\n                <button class=\"custom button\"><%= customName %></button>\n                <button class=\"cancel button\">Cancel</button>\n            </div>\n        </div>"),
		initialize: function initialize() {
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
				if (view.basicView) {
					view.basicView.remove();
					view.basicView = null;
					view.undelegateEvents();
				}

				window.removeEventListener('resize', this.resize);
				$('body').css('overflow', 'auto');
			});
			$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
				view.resize();
				$('body').css('overflow', 'hidden');
			});
		},
		events: {
			'click a.close-reveal-modal': 'onClose',
			'click button.cancel': 'onClose',
			'click button.ok': 'onOk',
			'click button.custom': 'onCustom'
		},
		confirm: function confirm() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.type = 'confirm';
			this.ok = options.ok;
			this.close = options.close;
			this.custom = options.custom;
			this.render({
				message: options.message,
				customName: options.customName
			});
		},
		alert: function alert() {
			var message = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			this.type = 'alert';
			this.ok = true;
			this.close = null;
			this.custom = null;
			this.render({
				message: message
			});
		},
		form: function form() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			this.type = 'form';
			this.ok = options.ok;
			this.close = options.close;
			this.custom = options.custom;
			this.render({
				template: options.template,
				customName: options.customName
			});
		},
		onClose: function onClose() {
			this.$el.foundation('reveal', 'close');
			if (this.close && this.type === 'confirm') this.close(this);
		},
		onOk: function onOk() {
			this.$el.foundation('reveal', 'close');

			if (this.ok && this.type === 'confirm') {
				this.ok(this);
			} else if (this.ok && this.type === 'form') {
				var data = this.$el.find('form').serializeArray();
				this.ok(this, data);
			}
		},
		onCustom: function onCustom() {
			this.$el.foundation('reveal', 'close');
			if (this.custom && this.type === 'confirm') this.custom(this);
		},
		renderActions: function renderActions() {
			this.$el.find('.ok')[this.ok ? 'show' : 'hide']();
			this.$el.find('.cancel')[this.close ? 'show' : 'hide']();
			this.$el.find('.custom')[this.custom ? 'show' : 'hide']();
			this.$el.find('.actions')[!this.ok && !this.close && !this.custom ? 'hide' : 'show']();
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
			this.renderActions();
			window.addEventListener('resize', this.resize, true);
			this.$el.foundation('reveal', 'open');
			this.delegateEvents();
		}
	});

	exports.default = {
		NotificationView: NotificationView,
		PopupView: PopupView
	};
});
