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
		template: _.template("\n        <div data-alert class=\"alert-box <%= type %>\" style=\"margin-bottom: 0\">\n            <%= message %><a href=\"#\" class=\"close\">&times;</a>\n        </div>"),
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
			this.render({
				type: "success",
				message: message
			});
		},
		error: function error(message) {
			this.render({
				type: "alert",
				message: message
			});
		},
		warn: function warn(message) {
			this.render({
				type: "warning",
				message: message
			});
		},
		notify: function notify(message) {
			this.render({
				message: message
			});
		},
		render: function render(news) {
			var $news = $(this.template({
				type: news.type,
				message: news.message
			}));
			this.$el.append($news);
			this.$el.foundation();
			setTimeout(function () {
				$news.slideUp();
				$news.find("a.close").click();
			}, this.duration);
		}
	});

	var PopupView = _Backbone2.default.View.extend({
		tagName: "popup",
		className: "reveal-modal container-fluid small",
		template: _.template("\n        <a class=\"close-reveal-modal\" aria-label=\"Close\">&#215;</a>\n        <div style=\"overflow-x: hidden;\n                    overflow-y: auto;\n                    height: 100%;\n                    width:100%;\">\n            <div class=\"row content\" style=\"overflow:hidden;\n                                            padding-right: 10px;\">\n                <%= message %>\n            </div>\n            <div class=\"actions right\" style=\"margin-top: 30px;\n                                              margin-right: 10px;\n                                              overflow: hidden;\">\n                <button class=\"ok button\" style=\"margin:0;\">Ok</button>\n                <button class=\"custom button\" style=\"margin:0;\"><%= customName %></button>\n                <button class=\"cancel button\" style=\"margin:0;\">Cancel</button>\n            </div>\n        </div>"),
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
					close_on_esc: false
				}
			});
			this.$el.css({
				'padding-top': '50px',
				'padding-right': 'calc(1.875rem - 10px)'
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
			this.ok = options.ok;
			this.close = options.close;
			this.custom = options.custom;
			this.render({
				message: options.message,
				customName: options.customName
			});
		},
		onClose: function onClose() {
			this.$el.foundation('reveal', 'close');
			if (this.close) this.close();
		},
		onOk: function onOk() {
			this.$el.foundation('reveal', 'close');
			if (this.ok) this.ok();
		},
		onCustom: function onCustom() {
			this.$el.foundation('reveal', 'close');
			if (this.custom) this.custom();
		},
		renderActions: function renderActions() {
			if (this.ok) {
				this.$el.find('.ok').show();
			} else {
				this.$el.find('.ok').hide();
			}

			if (this.close) {
				this.$el.find('.cancel').show();
			} else {
				this.$el.find('.cancel').hide();
			}

			if (this.custom) {
				this.$el.find('.custom').show();
			} else {
				this.$el.find('.custom').hide();
			}

			if (!this.ok && !this.close && !this.custom) {
				this.$el.find('.actions').hide();
			} else {
				this.$el.find('.actions').show();
			}
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
		render: function render(data) {
			this.$el.html(this.template(data));
			this.renderActions();
			var view = this;
			this.resize();
			window.addEventListener('resize', this.resize, true);
			$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
				if (view.basicView) {
					view.basicView.remove();
					view.basicView = null;
					view.undelegateEvents();
				}

				window.removeEventListener('resize', this.resize);
			});
			this.$el.foundation('reveal', 'open');
			this.delegateEvents();
		}
	});

	exports.default = {
		NotificationView: NotificationView,
		PopupView: PopupView
	};
});
