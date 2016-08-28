"use strict";

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
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const FormView = _backbone2.default.View.extend({
		tagName: "form",

		initialize(options = {
			errorClass: 'error',
			validate: []
		}) {
			this.template = options.template;
			this.validate = options.validate;
			this.errorClass = options.errorClass;
		},

		inputError(name, error) {
			this.$el.find(`input[name="${ name }"]`).addClass(this.errorClass);
		},

		getValues() {
			return this.$el.serializeArray();
		},

		check() {
			let valid = true;

			for (const rule in this.validate) {
				let el = this.$el.find('*[name="' + rule.name + '"]');

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

		submit(params = {}) {
			$.ajax({
				type: 'POST',
				url: params.url,
				data: new FormData(this.$el[0]),
				processData: false,
				contentType: false,
				cache: false,
				success: params.success,
				error: params.error
			});
		},

		render(options = {}) {
			if (this.template) this.$el.html(this.template);
		}

	});

	const NotificationView = _backbone2.default.View.extend({
		tagName: "notification",
		className: "container-fluid",
		template: _.template(`<div data-alert class="alert-box <%= type %>">
            			   	<%= message %><a class="close">&times;</a>
        				   </div>`),

		initialize(options = {}) {
			this.duration = options.duration || 3000;

			if ($('notification').length === 0) {
				this.$el.prependTo('body');
			} else {
				this.$el = $($('notification')[0]);
			}
		},

		success(message, options = {}) {
			this.render({
				type: "success",
				message: message
			}, options);
		},

		error(message, options = {}) {
			this.render({
				type: "alert",
				message: message
			}, options);
		},

		warn(message, options = {}) {
			this.render({
				type: "warning",
				message: message
			}, options);
		},

		notify(message, options = {}) {
			this.render({
				message: message
			}, options);
		},

		render(news, options = {}) {
			let $news = $(this.template({
				type: news.type,
				message: news.message
			}));
			this.$el.append($news);

			if (!options.permanent) {
				setTimeout(() => {
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

	const PopupView = _backbone2.default.View.extend({
		tagName: "popup",
		className: "reveal-modal container-fluid",
		template: _.template(`<a class="close-reveal-modal" aria-label="Close">&#215;</a>
						  <div>
							<div class="row content">
								<% template ? print(template) : print(message) %>
							</div>
							<ul class="actions button-group right">
								<li class="ok"><a class="button">Ok</a></li>
								<li class="custom"><a class="button"><%= customName %></a></li>
								<li class="cancel"><a class="button alert">Cancel</a></li>
							</ul>
						  </div>`),

		initialize() {
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
			let view = this;
			$(document).on('closed.fndtn.reveal', '[data-reveal]', () => {
				if (!this.resizeOff) window.removeEventListener('resize', this.resize);
				$('body').css({
					overflow: 'auto'
				});
			});
			$(document).on('opened.fndtn.reveal', '[data-reveal]', () => {
				view.resize();
				if (!this.resizeOff) window.addEventListener('resize', this.resize, true);
				$('body').css({
					overflow: 'hidden'
				});
			});
		},

		events: {
			'click .close-reveal-modal': 'onClose',
			'click .cancel': 'onClose',
			'click .ok': 'onOk',
			'click .custom': 'onCustom'
		},

		setParam(params) {
			this.type = params.type;
			this.ok = params.ok;
			this.close = params.close;
			this.custom = params.custom;
			this.$el.addClass(params.class);
			this.resizeOff = params.resizeOff;
			var view = this;

			if (params.template) {
				if (params.type === "form") {
					this.view = params.template instanceof FormView ? params.template : new FormView({
						template: params.template,
						validate: params.validate
					});

					this.view.resize = () => {
						this.resize();
					};
				} else if (params.template instanceof _backbone2.default.View) {
					this.view = params.template;

					this.view.resize = () => {
						this.resize();
					};
				}

				if (this.view.ok) {
					var ok = params.ok;

					params.ok = function () {
						view.view.ok(ok);
					};
				}

				this.ok = params.ok || this.ok;
			} else {
				this.view = null;
			}
		},

		basic(options = {}) {
			options.type = 'popup';
			this.setParam(options);
			this.render(options);
			return this;
		},

		form(options = {}) {
			options.type = 'form';
			this.setParam(options);
			this.render(options);
			return this;
		},

		onClose() {
			if (this.close) this.close.apply(this, [this.callbackArgs()]);
			this.closePopup();
		},

		onOk() {
			if (this.ok) this.ok.apply(this, [this.callbackArgs()]);
			if (this.type !== 'form' || this.view.isValid) this.closePopup();
		},

		onCustom() {
			if (this.custom) this.custom.apply(this, [this.callbackArgs()]);
			this.closePopup();
		},

		closePopup() {
			if (this.view) this.view.remove();
			this.$el.foundation('reveal', 'close');
		},

		callbackArgs() {
			let valid = true;
			let args = [];

			if (this.type === 'form') {
				valid = this.view.check();
				args.push(this.view.getValues());
				args.push(valid);
			}

			args.push(this);
			return args;
		},

		renderActions(staticActions) {
			this.$el.find('.ok')[this.ok ? 'show' : 'hide']();
			this.$el.find('.cancel')[this.close ? 'show' : 'hide']();
			this.$el.find('.custom')[this.custom ? 'show' : 'hide']();
			this.$el.find('.actions')[!this.ok && !this.close && !this.custom ? 'hide' : 'show']();
			staticActions = staticActions ? 'addClass' : 'removeClass';
			this.$el.find('.actions')[staticActions]('static');
			this.$el[staticActions]('static-actions');
		},

		resize() {
			var $popup = $('popup');
			$popup.height("");
			var bodyHeight = $(window).height() - 10;
			var height = $popup.outerHeight();
			var top = 5;

			if (height > bodyHeight) {
				$popup.outerHeight(bodyHeight);
			} else {
				top = (bodyHeight + 10 - height) / 2;
			}

			$popup.css('top', top > 100 ? 100 : top + 'px');
		},

		render(data = {}) {
			data = _.extend({
				message: "",
				customName: "",
				template: ""
			}, _.pick(data, ['message', 'customName', 'template', 'staticActions']));
			this.$el.html(this.template(data));

			if (this.view) {
				this.view.render();
				this.$el.find('.content').html(this.view.$el);
			}

			if (!this.foundationInitilized) {
				$(document).foundation('reveal', 'reflow');
				this.foundationInitilized = true;
			}

			this.resize();
			this.renderActions(data.staticActions);
			this.$el.foundation('reveal', 'open');
			this.delegateEvents();
		}

	});

	const WaitView = _backbone2.default.View.extend({
		template: _.template(`<div style="width:100%;height:100%;position:fixed;z-index: 10000;background-color:black;opacity:0.6;"></div>
		<div style="text-align:center; position: fixed; font-size:3em; width: 100%;z-index: 10000; top:calc(50% - 50px)"><%= message %></div>`),
		tagName: "wait",
		initialize: function () {
			if ($('wait').length === 0) {
				this.$el.prependTo('body');
			} else {
				this.$el = $('wait').first();
			}

			this.$el.hide();
		},
		start: function (message) {
			$('body').css({
				overflow: 'hidden'
			});
			this.$el.html(this.template({
				message: message
			}));
			this.$el.show();
		},
		stop: function () {
			$('body').css({
				overflow: ''
			});
			this.$el.hide();
			this.$el.html('');
		}
	});

	const useJwt = (options = {
		header: 'authorization',

		token() {},

		onUnauthorized() {}

	}) => {
		const sync = _backbone2.default.sync;

		_backbone2.default.sync = (method, model, options) => {
			const token = token();
			if (token) options.beforeSend = xhr => {
				xhr.setRequestHeader(options.header, 'Bearer ' + token);
			};
			let err = options.error;

			options.error = param => {
				if (param.status && param.status === 401) options.onUnauthorized();
				err(param);
			};

			sync(method, model, options);
		};
	};

	exports.default = {
		NotificationView,
		PopupView,
		FormView,
		WaitView,
		useJwt
	};
	module.exports = exports["default"];
});
