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
        global.Entity = mod.exports;
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

    const Model = _backbone2.default.Model.extend({
        dates: [],
        validate(attrs, options) {
            var dates = _.pick(attrs, this.dates.concat(['date']));
            for (var date in dates) {
                if (dates[date] && !(dates[date] instanceof Date)) {
                    return date;
                }
            }
        },
        save(attrs, options = { parse: false }) {
            if (options.all) {
                var success = options.success;
                options.success = (model, resp, opts) => {
                    _.each(this.relations, (relation, key) => {
                        if (relation.collection && model.get(key) instanceof relation.collection) {
                            _.each(model.get(key).models, model => {
                                model.save(null, { all: options.all });
                            });
                        }
                    });
                    if (success) success.call(this, model, resp, options);
                };
            }
            // Proxy the call to the original save function
            _backbone2.default.Model.prototype.save.call(this, attrs, options);
        },
        fetch(options = {}) {
            if (options.all) {
                var success = options.success;
                options.success = (model, resp, opts) => {
                    _.each(this.relations, (relation, key) => {
                        if (relation.collection && model.get(key) instanceof relation.collection) {
                            _.each(model.get(key).models, model => {
                                model.fetch({ all: options.all });
                            });
                        }
                    });
                    if (success) success.call(this, model, resp, options);
                };
            }
            _backbone2.default.Model.prototype.fetch.call(this, options);
        },
        toJSON(options = {}) {
            var attributes = _.clone(this.attributes);
            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    if (attributes[attribute] instanceof _backbone2.default.Model) {
                        attributes[attribute] = options.all ? _.pick(attributes[attribute], "id") : attributes[attribute].toJSON(options);
                    } else if (attributes[attribute] instanceof _backbone2.default.Collection) {
                        var converted = [];
                        attributes[attribute].forEach(attr => converted.push(options.all ? _.pick(attr, 'id') : attr.toJSON(options)));
                        attributes[attribute] = converted;
                    }
                }
            }
            return attributes;
        },
        set: function (key, val, options) {
            if (key === null) return this;
            var attributes;
            if (typeof key === 'object') {
                attributes = key;
                options = val;
            } else {
                (attributes = {})[key] = val;
            }
            var opts = _.extend({ validate: true }, options);
            var relations = _.keys(this.relations);
            _.each(attributes, (value, key) => {
                if (_.contains(relations, key)) {
                    var definition = this.relations[key];
                    if (definition.model && value instanceof Object) {
                        this.set(key, new definition.model(value, opts), opts);
                        delete attributes[key];
                    } else if (definition.collection && value instanceof Array) {
                        // Check if array is a real array (key = number), if it is it must be id's array
                        this.get(key).set(new definition.collection(value, opts));
                        delete attributes[key];
                    } else if (definition.model && !(value instanceof definition.model) || definition.collection && !(value instanceof definition.collection)) {
                        console.log('Bad model definition: ' + this.get('className'));
                        delete attributes[key];
                    }
                }
            }, this);
            return _backbone2.default.Model.prototype.set.apply(this, [attributes, options]);
        }
    });

    /**
     * Extend the Backbone.Model.extend method, to add some treatement on instance creation
     * @param  {Object} modelDefinition
     * @return {function} the model constructor
     */
    /*jshint loopfunc: true */

    Model.extend = function (modelDefinition) {
        // Set defaults collections for relations
        var defaultRelations = {};
        _.each(modelDefinition.relations, (definition, key) => {
            if (definition.collection && modelDefinition.defaults[key] instanceof Array) {
                defaultRelations[key] = new definition.collection(modelDefinition.defaults[key]);
            } else if (definition.collection && !(modelDefinition.defaults[key] instanceof Array)) {
                console.log("Bad default value for " + key);
            }
        });
        _.extend(modelDefinition.defaults, defaultRelations);
        return _backbone2.default.Model.extend.call(this, modelDefinition);
    };

    /**
     * The Collection
     * @type {Backbone.Collection}
     */
    const Collection = _backbone2.default.Collection.extend({
        /* Used to instanciate a new Model from Json (need to override if subtypes)*/
        model: Model
    });

    /**
     * Exporting the Model and the Collection
     */
    exports.default = {
        Model,
        Collection
    };
    module.exports = exports["default"];
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'backbone', './views/WaitView', './views/PopupView', './views/NotificationView', './views/FormView', './models/Entity'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('backbone'), require('./views/WaitView'), require('./views/PopupView'), require('./views/NotificationView'), require('./views/FormView'), require('./models/Entity'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.backbone, global.WaitView, global.PopupView, global.NotificationView, global.FormView, global.Entity);
        global.piziBackbone = mod.exports;
    }
})(this, function (module, exports, _backbone, _WaitView, _PopupView, _NotificationView, _FormView, _Entity) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _WaitView2 = _interopRequireDefault(_WaitView);

    var _PopupView2 = _interopRequireDefault(_PopupView);

    var _NotificationView2 = _interopRequireDefault(_NotificationView);

    var _FormView2 = _interopRequireDefault(_FormView);

    var _Entity2 = _interopRequireDefault(_Entity);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // Add token in REST request
    const useJwt = (options = { token() {}, onUnauthorized() {} }) => {
        const sync = _backbone2.default.sync;
        _backbone2.default.sync = (method, model, opts) => {
            const token = options.token();
            if (token) opts.beforeSend = xhr => {
                xhr.setRequestHeader(options.header || 'authorization', 'Bearer ' + token);
            };
            let err = opts.error;
            opts.error = param => {
                if (param.status && param.status === 401) options.onUnauthorized();
                err(param);
            };
            sync(method, model, opts);
        };
    };

    exports.default = {
        NotificationView: _NotificationView2.default,
        PopupView: _PopupView2.default,
        FormView: _FormView2.default,
        WaitView: _WaitView2.default,
        Entity: _Entity2.default,
        useJwt
    };
    module.exports = exports['default'];
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'backbone'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('backbone'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.backbone);
        global.FormView = mod.exports;
    }
})(this, function (module, exports, _backbone) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({
        tagName: "form",
        initialize(options = { errorClass: 'error', validate: [] }) {
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
        inputError(name, error) {
            this.el.querySelectorAll(`input[name="${ name }"]`).className += this.errorClass;
        },
        getValues() {
            return this.$el.serializeArray();
        },
        getObject() {
            let object = {};
            _.each(this.getValues(), attribute => object[attribute.name] = attribute.value);
            return object;
        },
        check() {
            let valid = true;
            for (const rule in this.validate) {
                let el = this.el.querySelectorAll('*[name="' + rule.name + '"]');
                if (el.length && !el[0].value.match(rule.regex)) {
                    if (!el.classList.contains(this.errorClass)) {
                        el.classList.push(this.errorClass);
                        el.insertAdjacentHTML('afterend', '<small class="' + this.errorClass + '">' + rule.message + '</small>');
                    }
                    valid = false;
                } else if (el.length) {
                    el.classList.remove(this.errorClass);
                    let $next = el.nextElementSibling;
                    if ($next.tagName === "small") $next.parentNode.removeChild($next);
                }
            }
            this.isValid = valid;
            return valid;
        },
        submit(params = {}) {
            params = !params.currentTarget ? _.extend(this.params, params) : this.params;
            if (params.type.toUpperCase() !== 'GET') params.data = new FormData(this.el);
            $.ajax(params);
            var request = new XMLHttpRequest();
            request.open(params.type, params.url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(params.data);
        },
        render(options = {}) {
            if (this.template) this.$el.html(this.template);
        }
    });
    module.exports = exports['default'];
});
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
        global.NotificationView = mod.exports;
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

    exports.default = _backbone2.default.View.extend({
        tagName: "notification",
        className: "container-fluid",
        template: _.template(`<h3 class="notif <%= className %>"><%= message %><a class="close">&times;</a></h3>`),
        initialize(options = {}) {
            let $notif = document.body.getElementsByTagName('notification')[0];
            if (!$notif) document.body.appendChild(this.el);else this.el = $notif;
            this.duration = options.duration || 3000;
            this.template = options.template || this.template;
        },
        events: {
            'click .close': 'close'
        },
        close(event, childEvent) {
            const $notif = event.target ? event.target.parentNode : event;
            $notif.style.height = 0;
            $notif.style.marginTop = 0;
            $notif.style.marginBottom = 0;
            $notif.style.paddingTop = 0;
            $notif.style.paddingBottom = 0;
            let styles = getComputedStyle($notif);
            const duration = styles && styles.transitionDuration ? parseFloat(styles.transitionDuration) : 0;

            setTimeout(() => {
                if ($notif && $notif.parentNode) $notif.parentNode.removeChild($notif);
            }, duration * 1000);
        },
        success(message, options = {}) {
            this.render({ className: "success", message: message }, options);
        },
        error(message, options = {}) {
            this.render({ className: "alert", message: message }, options);
        },
        warn(message, options = {}) {
            this.render({ className: "warning", message: message }, options);
        },
        notify(message, options = {}) {
            this.render({ message: message }, options);
        },
        render(notif, options = {}) {

            const wrapper = document.createElement("div");
            wrapper.innerHTML = this.template({ className: notif.className, message: notif.message });
            const $notif = wrapper.lastChild;
            this.el.appendChild($notif);
            if (!options.permanent) setTimeout(() => {
                this.close($notif);
            }, options.duration || this.duration);
        }
    });
    module.exports = exports["default"];
});
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
        global.PopupView = mod.exports;
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

    exports.default = _backbone2.default.View.extend({
        tagName: "popup",
        template: _.template(`<div class="background"></div>
						  <div class="container">
						  	<a class="close">&#215;</a>
							<div class="content">
								<% template ? print(template) : print(message) %>
							</div>
							<ul class="actions">
								<li class="ok">Ok</li>
								<li class="custom"><%= customName %></li>
								<li class="cancel">Cancel</li>
							</ul>
						  </div>`),
        initialize() {
            let $popup = document.body.querySelector("popup");
            if (!$popup) document.body.appendChild(this.el);else this.el = $popup;
        },
        events: {
            'click .close': 'onClose',
            'click .cancel': 'onClose',
            'click .ok': 'onOk',
            'click .custom': 'onCustom'
        },
        setParam(params) {
            this.type = params.type;
            this.ok = params.ok;
            this.close = params.close;
            this.custom = params.custom;
            this.el.classList.add(params.class);
            this.resizeOff = params.resizeOff;
            var view = this;
            if (params.template) {
                if (params.isform) {
                    const view = this;
                    const PopupFormView = FormView.extend({
                        initialize() {
                            FormView.prototype.initialize.apply(this, arguments);
                        },
                        submit(params = {}) {
                            FormView.prototype.submit.apply(this, arguments);
                            view.closePopup();
                        }
                    });
                    this.view = new PopupFormView(params);
                } else if (params.template instanceof _backbone2.default.View) {
                    this.view = params.template;
                }
                if (this.view && this.view.ok) {
                    var ok = params.ok;
                    params.ok = () => view.view.ok(ok);
                }
                this.ok = params.ok || this.ok;
            } else {
                this.view = null;
            }
        },
        basic(options = {}) {
            this.setParam(options);
            this.render(options);
            return this;
        },
        form(options = {}) {
            options.isform = true;
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
            this.$el.css('display', 'none').html();
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
        render(data = {}) {
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
    module.exports = exports["default"];
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'backbone'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('backbone'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.backbone);
        global.WaitView = mod.exports;
    }
})(this, function (module, exports, _backbone) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({
        template: _.template(`<div class="background" style="display:block"></div><div class="message pulse"><%= message %><div class="anim"></div></div>`),
        tagName: "wait",
        initialize() {
            let $body = document.body;
            if ($body.querySelectorAll('wait').length === 0) $body.appendChild(this.el);else this.el = $body.querySelector('wait');
        },
        start(message, $el) {
            if (message instanceof Element) {
                $el = message;
                message = null;
            }
            let $template = this.template({ message: message || 'loading...' });
            let $parent = $el || document.body;
            $parent.classList.add('wait-container');
            $parent.classList.add('hide-child');
            if ($el) {
                let $wait = new Element("wait");
                $wait.style.display = "block";
                $wait.insertBefore($template, $wait.firstChild);
                $parent.insertBefore($wait, parent.firstChild);
            } else {
                this.el.innerHTML = $template;
                this.el.style.display = "block";
            }
            return {
                stop: callback => this.stop($el, callback)
            };
        },
        stop($el, callback) {
            callback = _.isFunction($el) ? $el : callback;
            let $wait = $el && $el.querySelector('wait') || this.el;
            let $parent = $el || document.body;
            let elements = $wait.querySelectorAll('.background, .message');
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('pulse');
                elements[i].style.opacity = 0;
            }
            $parent.classList.remove('hide-child');
            setTimeout(() => {
                $parent.classList.remove('wait-container');
                $wait.style.display = "none";
                $wait.innerHTML = "";
                if ($el) $wait.parentNode.removeChild($wait);
                if (callback) callback();
            }, 1500);
        }
    });
    module.exports = exports['default'];
});
