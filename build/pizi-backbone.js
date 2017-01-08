(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define("pizi-backbone", ["backbone", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["pizi-backbone"] = factory(require("backbone"), require("underscore"));
	else
		root["pizi-backbone"] = factory(root["backbone"], root["underscore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("backbone");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("underscore");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*jshint loopfunc: true */



var Model = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend({
    dates: [],
    validate: function validate(attrs, options) {
        var dates = _.pick(attrs, this.dates.concat(['date']));
        for (var date in dates) {
            if (dates[date] && !(dates[date] instanceof Date)) {
                return date;
            }
        }
    },
    save: function save(attrs) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parse: false };

        if (options.all) {
            var success = options.success;
            options.success = function (model, resp, opts) {
                _.each(_this.relations, function (relation, key) {
                    if (relation.collection && model.get(key) instanceof relation.collection) {
                        _.each(model.get(key).models, function (model) {
                            model.save(null, { all: options.all });
                        });
                    }
                });
                if (success) success.call(_this, model, resp, options);
            };
        }
        // Proxy the call to the original save function
        __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.save.call(this, attrs, options);
    },
    fetch: function fetch() {
        var _this2 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (options.all) {
            var success = options.success;
            options.success = function (model, resp, opts) {
                _.each(_this2.relations, function (relation, key) {
                    if (relation.collection && model.get(key) instanceof relation.collection) {
                        _.each(model.get(key).models, function (model) {
                            model.fetch({ all: options.all });
                        });
                    }
                });
                if (success) success.call(_this2, model, resp, options);
            };
        }
        __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.fetch.call(this, options);
    },
    toJSON: function toJSON() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var attributes = _.clone(this.attributes);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                if (attributes[attribute] instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model) {
                    attributes[attribute] = options.all ? _.pick(attributes[attribute], "id") : attributes[attribute].toJSON(options);
                } else if (attributes[attribute] instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection) {
                    var converted = [];
                    attributes[attribute].forEach(function (attr) {
                        return converted.push(options.all ? _.pick(attr, 'id') : attr.toJSON(options));
                    });
                    attributes[attribute] = converted;
                }
            }
        }
        return attributes;
    },

    set: function set(key, val, options) {
        var _this3 = this;

        if (key === null) return this;
        var attributes;
        if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === 'object') {
            attributes = key;
            options = val;
        } else {
            (attributes = {})[key] = val;
        }
        var opts = _.extend({ validate: true }, options);
        var relations = _.keys(this.relations);
        _.each(attributes, function (value, key) {
            if (_.contains(relations, key)) {
                var definition = _this3.relations[key];
                if (definition.model && value instanceof Object) {
                    _this3.set(key, new definition.model(value, opts), opts);
                    delete attributes[key];
                } else if (definition.collection && value instanceof Array) {
                    // Check if array is a real array (key = number), if it is it must be id's array
                    _this3.get(key).set(new definition.collection(value, opts));
                    delete attributes[key];
                } else if (definition.model && !(value instanceof definition.model) || definition.collection && !(value instanceof definition.collection)) {
                    console.log('Bad model definition: ' + _this3.get('className'));
                    delete attributes[key];
                }
            }
            if (_this3.dates.concat(['date']).includes(key) && !(value instanceof Date)) {
                attributes[key] = new Date(value);
            }
        }, this);
        return __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.set.apply(this, [attributes, options]);
    }
});

/**
 * Extend the Backbone.Model.extend method, to add some treatement on instance creation
 * @param  {Object} modelDefinition
 * @return {function} the model constructor
 */
Model.extend = function (modelDefinition) {
    // Set defaults collections for relations
    var defaultRelations = {};
    _.each(modelDefinition.relations, function (definition, key) {
        if (definition.collection && modelDefinition.defaults[key] instanceof Array) {
            defaultRelations[key] = new definition.collection(modelDefinition.defaults[key]);
        } else if (definition.collection && !(modelDefinition.defaults[key] instanceof Array)) {
            console.log("Bad default value for " + key);
        }
    });
    _.extend(modelDefinition.defaults, defaultRelations);
    return __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend.call(this, modelDefinition);
};

/**
 * The Collection
 * @type {Backbone.Collection}
 */
var Collection = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection.extend({
    /* Used to instanciate a new Model from Json (need to override if subtypes)*/
    model: Model
});

/**
 * Exporting the Model and the Collection
 */
/* harmony default export */ exports["a"] = {
    Model: Model,
    Collection: Collection
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    tagName: "form",
    initialize: function initialize() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { errorClass: 'error', validate: [] };

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
        this.el.querySelectorAll('input[name="' + name + '"]').className += this.errorClass;
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
            var el = this.el.querySelectorAll('*[name="' + rule.name + '"]');
            if (el.length && !el[0].value.match(rule.regex)) {
                if (!el.classList.contains(this.errorClass)) {
                    el.classList.push(this.errorClass);
                    el.insertAdjacentHTML('afterend', '<small class="' + this.errorClass + '">' + rule.message + '</small>');
                }
                valid = false;
            } else if (el.length) {
                el.classList.remove(this.errorClass);
                var $next = el.nextElementSibling;
                if ($next.tagName === "small") $next.parentNode.removeChild($next);
            }
        }
        this.isValid = valid;
        return valid;
    },
    submit: function submit() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        params = !params.currentTarget ? _.extend(this.params, params) : this.params;
        if (params.type.toUpperCase() !== 'GET') params.data = new FormData(this.el);
        $.ajax(params);
        var request = new XMLHttpRequest();
        request.open(params.type, params.url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(params.data);
    },
    render: function render() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (this.template) this.$el.html(this.template);
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    tagName: "notification",
    className: "container-fluid",
    template: _.template("<h3 class=\"notif <%= className %>\"><%= message %><a class=\"close\">&times;</a></h3>"),
    initialize: function initialize() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var $notif = document.body.getElementsByTagName('notification')[0];
        if (!$notif) document.body.appendChild(this.el);else this.el = $notif;
        this.duration = options.duration || 3000;
        this.template = options.template || this.template;
    },

    events: {
        'click .close': 'close'
    },
    close: function close(event, childEvent) {
        var $notif = event.target ? event.target.parentNode : event;
        $notif.style.height = 0;
        $notif.style.marginTop = 0;
        $notif.style.marginBottom = 0;
        $notif.style.paddingTop = 0;
        $notif.style.paddingBottom = 0;
        var styles = getComputedStyle($notif);
        var duration = styles && styles.transitionDuration ? parseFloat(styles.transitionDuration) : 0;

        setTimeout(function () {
            if ($notif && $notif.parentNode) $notif.parentNode.removeChild($notif);
        }, duration * 1000);
    },
    success: function success(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.render({ className: "success", message: message }, options);
    },
    error: function error(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.render({ className: "alert", message: message }, options);
    },
    warn: function warn(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.render({ className: "warning", message: message }, options);
    },
    notify: function notify(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.render({ message: message }, options);
    },
    render: function render(notif) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.template({ className: notif.className, message: notif.message });
        var $notif = wrapper.lastChild;
        this.el.appendChild($notif);
        if (!options.permanent) setTimeout(function () {
            _this.close($notif);
        }, options.duration || this.duration);
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    tagName: "popup",
    template: _.template("<div class=\"background\"></div>\n\t\t\t\t\t\t  <div class=\"container\">\n\t\t\t\t\t\t  \t<a class=\"close\">&#215;</a>\n\t\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\t\t<% template ? print(template) : print(message) %>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class=\"actions\">\n\t\t\t\t\t\t\t\t<li class=\"ok\">Ok</li>\n\t\t\t\t\t\t\t\t<li class=\"custom\"><%= customName %></li>\n\t\t\t\t\t\t\t\t<li class=\"cancel\">Cancel</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t  </div>"),
    initialize: function initialize() {
        var $popup = document.body.querySelector("popup");
        if (!$popup) document.body.appendChild(this.el);else this.el = $popup;
    },

    events: {
        'click .close': 'onClose',
        'click .cancel': 'onClose',
        'click .ok': 'onOk',
        'click .custom': 'onCustom'
    },
    setParam: function setParam(params) {
        var _this = this;

        this.type = params.type;
        this.ok = params.ok;
        this.close = params.close;
        this.custom = params.custom;
        this.el.classList.add(params.class);
        this.resizeOff = params.resizeOff;
        var view = this;
        if (params.template) {
            if (params.isform) {
                (function () {
                    var view = _this;
                    var PopupFormView = FormView.extend({
                        initialize: function initialize() {
                            FormView.prototype.initialize.apply(this, arguments);
                        },
                        submit: function submit() {
                            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            FormView.prototype.submit.apply(this, arguments);
                            view.closePopup();
                        }
                    });
                    _this.view = new PopupFormView(params);
                })();
            } else if (params.template instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View) {
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
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this.setParam(options);
        this.render(options);
        return this;
    },
    form: function form() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    template: _.template('<div class="background" style="display:block"></div><div class="message pulse"><%= message %><div class="anim"></div></div>'),
    tagName: "wait",
    initialize: function initialize() {
        var $body = document.body;
        if ($body.querySelectorAll('wait').length === 0) $body.appendChild(this.el);else this.el = $body.querySelector('wait');
    },
    start: function start(message, $el) {
        var _this = this;

        if (message instanceof Element) {
            $el = message;
            message = null;
        }
        var $template = this.template({ message: message || 'loading...' });
        var $parent = $el || document.body;
        $parent.classList.add('wait-container');
        $parent.classList.add('hide-child');
        if ($el) {
            var $wait = new Element("wait");
            $wait.style.display = "block";
            $wait.insertBefore($template, $wait.firstChild);
            $parent.insertBefore($wait, parent.firstChild);
        } else {
            this.el.innerHTML = $template;
            this.el.style.display = "block";
        }
        return {
            stop: function stop(callback) {
                return _this.stop($el, callback);
            }
        };
    },
    stop: function stop($el, callback) {
        callback = _.isFunction($el) ? $el : callback;
        var $wait = $el && $el.querySelector('wait') || this.el;
        var $parent = $el || document.body;
        var elements = $wait.querySelectorAll('.background, .message');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('pulse');
            elements[i].style.opacity = 0;
        }
        $parent.classList.remove('hide-child');
        setTimeout(function () {
            $parent.classList.remove('wait-container');
            $wait.style.display = "none";
            $wait.innerHTML = "";
            if ($el) $wait.parentNode.removeChild($wait);
            if (callback) callback();
        }, 1500);
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_WaitView__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_PopupView__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_NotificationView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_FormView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Entity__ = __webpack_require__(2);







// Add token in REST request
var useJwt = function useJwt() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        token: function token() {},
        onUnauthorized: function onUnauthorized() {}
    };

    var sync = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync;
    __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync = function (method, model, opts) {
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

var viewUtils = {
    table: function table(options) {
        return _.template('<table class="{{ className }}">\n                                <thead>\n                                    <tr>\n                                        <% columns.forEach(function(column){ %>\n                                            <th class="{{ column.class }}">{{ column.header || column.property }}</th>\n                                            <% }) %>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <% data.forEach(function(entry){ %>\n                                        <tr>\n                                            <% columns.forEach(function(column){ %>\n                                                <td>{{ column.transform ? column.transform(entry[column.property]) : entry[column.property] }}</td>\n                                                <% }) %>\n                                        </tr>\n                                        <% }) %>\n                                </tbody>\n                            </table>')(_.extend({ className: "", data: [], columns: {} }, options));
    }
};

/* harmony default export */ exports["default"] = {
    NotificationView: __WEBPACK_IMPORTED_MODULE_3__views_NotificationView__["a" /* default */],
    PopupView: __WEBPACK_IMPORTED_MODULE_2__views_PopupView__["a" /* default */],
    FormView: __WEBPACK_IMPORTED_MODULE_4__views_FormView__["a" /* default */],
    WaitView: __WEBPACK_IMPORTED_MODULE_1__views_WaitView__["a" /* default */],
    viewUtils: viewUtils,
    Entity: __WEBPACK_IMPORTED_MODULE_5__models_Entity__["a" /* default */],
    useJwt: useJwt
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYjJkOWVjZjMyNTZkNGUxMDg5NiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJCYWNrYm9uZSIsImV4dGVuZCIsImRhdGVzIiwidmFsaWRhdGUiLCJhdHRycyIsIm9wdGlvbnMiLCJfIiwicGljayIsImNvbmNhdCIsImRhdGUiLCJEYXRlIiwic2F2ZSIsInBhcnNlIiwiYWxsIiwic3VjY2VzcyIsIm1vZGVsIiwicmVzcCIsIm9wdHMiLCJlYWNoIiwicmVsYXRpb25zIiwicmVsYXRpb24iLCJrZXkiLCJjb2xsZWN0aW9uIiwiZ2V0IiwibW9kZWxzIiwiY2FsbCIsInByb3RvdHlwZSIsImZldGNoIiwidG9KU09OIiwiYXR0cmlidXRlcyIsImNsb25lIiwiYXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJDb2xsZWN0aW9uIiwiY29udmVydGVkIiwiZm9yRWFjaCIsInB1c2giLCJhdHRyIiwic2V0IiwidmFsIiwia2V5cyIsInZhbHVlIiwiY29udGFpbnMiLCJkZWZpbml0aW9uIiwiT2JqZWN0IiwiQXJyYXkiLCJjb25zb2xlIiwibG9nIiwiaW5jbHVkZXMiLCJhcHBseSIsIm1vZGVsRGVmaW5pdGlvbiIsImRlZmF1bHRSZWxhdGlvbnMiLCJkZWZhdWx0cyIsIlZpZXciLCJ0YWdOYW1lIiwiaW5pdGlhbGl6ZSIsImVycm9yQ2xhc3MiLCJwYXJhbXMiLCJ0eXBlIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsImNhY2hlIiwib21pdCIsInRlbXBsYXRlIiwiZXZlbnRzIiwiaW5wdXRFcnJvciIsIm5hbWUiLCJlcnJvciIsImVsIiwicXVlcnlTZWxlY3RvckFsbCIsImNsYXNzTmFtZSIsImdldFZhbHVlcyIsIiRlbCIsInNlcmlhbGl6ZUFycmF5IiwiZ2V0T2JqZWN0Iiwib2JqZWN0IiwiY2hlY2siLCJ2YWxpZCIsInJ1bGUiLCJsZW5ndGgiLCJtYXRjaCIsInJlZ2V4IiwiY2xhc3NMaXN0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwibWVzc2FnZSIsInJlbW92ZSIsIiRuZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaXNWYWxpZCIsInN1Ym1pdCIsImN1cnJlbnRUYXJnZXQiLCJ0b1VwcGVyQ2FzZSIsImRhdGEiLCJGb3JtRGF0YSIsIiQiLCJhamF4IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInVybCIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicmVuZGVyIiwiaHRtbCIsIiRub3RpZiIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkdXJhdGlvbiIsImNsb3NlIiwiZXZlbnQiLCJjaGlsZEV2ZW50IiwidGFyZ2V0Iiwic3R5bGUiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic2V0VGltZW91dCIsIndhcm4iLCJub3RpZnkiLCJub3RpZiIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibGFzdENoaWxkIiwicGVybWFuZW50IiwiJHBvcHVwIiwicXVlcnlTZWxlY3RvciIsInNldFBhcmFtIiwib2siLCJjdXN0b20iLCJhZGQiLCJjbGFzcyIsInJlc2l6ZU9mZiIsInZpZXciLCJpc2Zvcm0iLCJQb3B1cEZvcm1WaWV3IiwiRm9ybVZpZXciLCJhcmd1bWVudHMiLCJjbG9zZVBvcHVwIiwiYmFzaWMiLCJmb3JtIiwib25DbG9zZSIsImNhbGxiYWNrQXJncyIsIm9uT2siLCJvbkN1c3RvbSIsImNzcyIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImZpbmQiLCJjdXN0b21OYW1lIiwiZGVsZWdhdGVFdmVudHMiLCIkYm9keSIsInN0YXJ0IiwiRWxlbWVudCIsIiR0ZW1wbGF0ZSIsIiRwYXJlbnQiLCIkd2FpdCIsImRpc3BsYXkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwicGFyZW50Iiwic3RvcCIsImNhbGxiYWNrIiwiaXNGdW5jdGlvbiIsImVsZW1lbnRzIiwiaSIsIm9wYWNpdHkiLCJ1c2VKd3QiLCJ0b2tlbiIsIm9uVW5hdXRob3JpemVkIiwic3luYyIsIm1ldGhvZCIsImJlZm9yZVNlbmQiLCJ4aHIiLCJoZWFkZXIiLCJlcnIiLCJwYXJhbSIsInN0YXR1cyIsInZpZXdVdGlscyIsInRhYmxlIiwiY29sdW1ucyIsIk5vdGlmaWNhdGlvblZpZXciLCJQb3B1cFZpZXciLCJXYWl0VmlldyIsIkVudGl0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7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RixDQUFTLEVBQUVxRSxXQUFXLEVBQWIsRUFBaUJ3QixNQUFNLEVBQXZCLEVBQTJCaUcsU0FBUyxFQUFwQyxFQUFULEVBQW1EMUwsT0FBbkQsQ0FqQnhCLENBQVA7QUFrQkg7QUFwQmEsQ0FBbEI7O0FBdUJBLGtEQUFlO0FBQ1gyTCxzQkFBQSx3RUFEVztBQUVYQyxlQUFBLGlFQUZXO0FBR1gvQyxjQUFBLGdFQUhXO0FBSVhnRCxjQUFBLGdFQUpXO0FBS1hMLHdCQUxXO0FBTVhNLFlBQUEsK0RBTlc7QUFPWGpCO0FBUFcsQ0FBZixDIiwiZmlsZSI6InBpemktYmFja2JvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWNrYm9uZVwiKSwgcmVxdWlyZShcInVuZGVyc2NvcmVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJwaXppLWJhY2tib25lXCIsIFtcImJhY2tib25lXCIsIFwidW5kZXJzY29yZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFja2JvbmVcIiksIHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyb290W1wiYmFja2JvbmVcIl0sIHJvb3RbXCJ1bmRlcnNjb3JlXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyYjJkOWVjZjMyNTZkNGUxMDg5NiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFja2JvbmVcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5kZXJzY29yZVwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qanNoaW50IGxvb3BmdW5jOiB0cnVlICovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcblxuY29uc3QgTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICAgIGRhdGVzOiBbXSxcbiAgICB2YWxpZGF0ZShhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZGF0ZXMgPSBfLnBpY2soYXR0cnMsIHRoaXMuZGF0ZXMuY29uY2F0KFsnZGF0ZSddKSk7XG4gICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmIChkYXRlc1tkYXRlXSAmJiAhKGRhdGVzW2RhdGVdIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2F2ZShhdHRycywgb3B0aW9ucyA9IHsgcGFyc2U6IGZhbHNlIH0pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IChtb2RlbCwgcmVzcCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnJlbGF0aW9ucywgKHJlbGF0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWwuZ2V0KGtleSkgaW5zdGFuY2VvZiByZWxhdGlvbi5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobW9kZWwuZ2V0KGtleSkubW9kZWxzLCAobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zYXZlKG51bGwsIHsgYWxsOiBvcHRpb25zLmFsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MuY2FsbCh0aGlzLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3h5IHRoZSBjYWxsIHRvIHRoZSBvcmlnaW5hbCBzYXZlIGZ1bmN0aW9uXG4gICAgICAgIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5zYXZlLmNhbGwodGhpcywgYXR0cnMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgZmV0Y2gob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSAobW9kZWwsIHJlc3AsIG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5yZWxhdGlvbnMsIChyZWxhdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsLmdldChrZXkpIGluc3RhbmNlb2YgcmVsYXRpb24uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG1vZGVsLmdldChrZXkpLm1vZGVscywgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmV0Y2goeyBhbGw6IG9wdGlvbnMuYWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcy5jYWxsKHRoaXMsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLmZldGNoLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfSxcbiAgICB0b0pTT04ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gaW5zdGFuY2VvZiBCYWNrYm9uZS5Nb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBvcHRpb25zLmFsbCA/IF8ucGljayhhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sIFwiaWRcIikgOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0udG9KU09OKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdIGluc3RhbmNlb2YgQmFja2JvbmUuQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udmVydGVkID0gW107XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5mb3JFYWNoKGF0dHIgPT4gY29udmVydGVkLnB1c2gob3B0aW9ucy5hbGwgPyBfLnBpY2soYXR0ciwgJ2lkJykgOiBhdHRyLnRvSlNPTihvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBjb252ZXJ0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXM7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGtleTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB2YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoYXR0cmlidXRlcyA9IHt9KVtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRzID0gXy5leHRlbmQoeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHJlbGF0aW9ucyA9IF8ua2V5cyh0aGlzLnJlbGF0aW9ucyk7XG4gICAgICAgIF8uZWFjaChhdHRyaWJ1dGVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uY29udGFpbnMocmVsYXRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmluaXRpb24gPSB0aGlzLnJlbGF0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1vZGVsICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3IGRlZmluaXRpb24ubW9kZWwodmFsdWUsIG9wdHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFycmF5IGlzIGEgcmVhbCBhcnJheSAoa2V5ID0gbnVtYmVyKSwgaWYgaXQgaXMgaXQgbXVzdCBiZSBpZCdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0KGtleSkuc2V0KG5ldyBkZWZpbml0aW9uLmNvbGxlY3Rpb24odmFsdWUsIG9wdHMpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24ubW9kZWwgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb24ubW9kZWwpIHx8IGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmFkIG1vZGVsIGRlZmluaXRpb246ICcgKyB0aGlzLmdldCgnY2xhc3NOYW1lJykpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLmNvbmNhdChbJ2RhdGUnXSkuaW5jbHVkZXMoa2V5KSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0gPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNldC5hcHBseSh0aGlzLCBbYXR0cmlidXRlcywgb3B0aW9uc10pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEV4dGVuZCB0aGUgQmFja2JvbmUuTW9kZWwuZXh0ZW5kIG1ldGhvZCwgdG8gYWRkIHNvbWUgdHJlYXRlbWVudCBvbiBpbnN0YW5jZSBjcmVhdGlvblxuICogQHBhcmFtICB7T2JqZWN0fSBtb2RlbERlZmluaXRpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgbW9kZWwgY29uc3RydWN0b3JcbiAqL1xuTW9kZWwuZXh0ZW5kID0gZnVuY3Rpb24obW9kZWxEZWZpbml0aW9uKSB7XG4gICAgLy8gU2V0IGRlZmF1bHRzIGNvbGxlY3Rpb25zIGZvciByZWxhdGlvbnNcbiAgICB2YXIgZGVmYXVsdFJlbGF0aW9ucyA9IHt9O1xuICAgIF8uZWFjaChtb2RlbERlZmluaXRpb24ucmVsYXRpb25zLCAoZGVmaW5pdGlvbiwga2V5KSA9PiB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZGVmYXVsdFJlbGF0aW9uc1trZXldID0gbmV3IGRlZmluaXRpb24uY29sbGVjdGlvbihtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmICEobW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIGRlZmF1bHQgdmFsdWUgZm9yIFwiICsga2V5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF8uZXh0ZW5kKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0cywgZGVmYXVsdFJlbGF0aW9ucyk7XG4gICAgcmV0dXJuIEJhY2tib25lLk1vZGVsLmV4dGVuZC5jYWxsKHRoaXMsIG1vZGVsRGVmaW5pdGlvbik7XG59O1xuXG4vKipcbiAqIFRoZSBDb2xsZWN0aW9uXG4gKiBAdHlwZSB7QmFja2JvbmUuQ29sbGVjdGlvbn1cbiAqL1xuY29uc3QgQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICAvKiBVc2VkIHRvIGluc3RhbmNpYXRlIGEgbmV3IE1vZGVsIGZyb20gSnNvbiAobmVlZCB0byBvdmVycmlkZSBpZiBzdWJ0eXBlcykqL1xuICAgIG1vZGVsOiBNb2RlbFxufSk7XG5cbi8qKlxuICogRXhwb3J0aW5nIHRoZSBNb2RlbCBhbmQgdGhlIENvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIE1vZGVsLFxuICAgIENvbGxlY3Rpb25cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJmb3JtXCIsXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zID0geyBlcnJvckNsYXNzOiAnZXJyb3InLCB2YWxpZGF0ZTogW10gfSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IF8uZXh0ZW5kKHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICB9LCBfLm9taXQob3B0aW9ucywgWyd0ZW1wbGF0ZScsICd2YWxpZGF0ZScsICdlcnJvckNsYXNzJ10pKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBvcHRpb25zLnZhbGlkYXRlO1xuICAgICAgICB0aGlzLmVycm9yQ2xhc3MgPSBvcHRpb25zLmVycm9yQ2xhc3M7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5zdWJtaXQnOiAnc3VibWl0J1xuICAgIH0sXG4gICAgaW5wdXRFcnJvcihuYW1lLCBlcnJvcikge1xuICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoYGlucHV0W25hbWU9XCIke25hbWV9XCJdYCkuY2xhc3NOYW1lICs9ICh0aGlzLmVycm9yQ2xhc3MpO1xuICAgIH0sXG4gICAgZ2V0VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWwuc2VyaWFsaXplQXJyYXkoKTtcbiAgICB9LFxuICAgIGdldE9iamVjdCgpIHtcbiAgICAgICAgbGV0IG9iamVjdCA9IHt9O1xuICAgICAgICBfLmVhY2godGhpcy5nZXRWYWx1ZXMoKSwgKGF0dHJpYnV0ZSkgPT4gb2JqZWN0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfSxcbiAgICBjaGVjaygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBydWxlIGluIHRoaXMudmFsaWRhdGUpIHtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnKltuYW1lPVwiJyArIHJ1bGUubmFtZSArICdcIl0nKTtcbiAgICAgICAgICAgIGlmIChlbC5sZW5ndGggJiYgIWVsWzBdLnZhbHVlLm1hdGNoKHJ1bGUucmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5lcnJvckNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucHVzaCh0aGlzLmVycm9yQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgJzxzbWFsbCBjbGFzcz1cIicgKyB0aGlzLmVycm9yQ2xhc3MgKyAnXCI+JyArIHJ1bGUubWVzc2FnZSArICc8L3NtYWxsPicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmICgkbmV4dC50YWdOYW1lID09PSBcInNtYWxsXCIpICRuZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IHZhbGlkO1xuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfSxcbiAgICBzdWJtaXQocGFyYW1zID0ge30pIHtcbiAgICAgICAgcGFyYW1zID0gIXBhcmFtcy5jdXJyZW50VGFyZ2V0ID8gXy5leHRlbmQodGhpcy5wYXJhbXMsIHBhcmFtcykgOiB0aGlzLnBhcmFtcztcbiAgICAgICAgaWYgKHBhcmFtcy50eXBlLnRvVXBwZXJDYXNlKCkgIT09ICdHRVQnKSBwYXJhbXMuZGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmVsKTtcbiAgICAgICAgJC5hamF4KHBhcmFtcyk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbihwYXJhbXMudHlwZSwgcGFyYW1zLnVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICAgICAgICByZXF1ZXN0LnNlbmQocGFyYW1zLmRhdGEpO1xuICAgIH0sXG4gICAgcmVuZGVyKG9wdGlvbnMgPSB7fSkgeyBpZiAodGhpcy50ZW1wbGF0ZSkgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKTsgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL0Zvcm1WaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwibm90aWZpY2F0aW9uXCIsXG4gICAgY2xhc3NOYW1lOiBcImNvbnRhaW5lci1mbHVpZFwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8aDMgY2xhc3M9XCJub3RpZiA8JT0gY2xhc3NOYW1lICU+XCI+PCU9IG1lc3NhZ2UgJT48YSBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvYT48L2gzPmApLFxuICAgIGluaXRpYWxpemUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCAkbm90aWYgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RpZmljYXRpb24nKVswXTtcbiAgICAgICAgaWYgKCEkbm90aWYpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRub3RpZjtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMzAwMDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgdGhpcy50ZW1wbGF0ZTtcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLmNsb3NlJzogJ2Nsb3NlJ1xuICAgIH0sXG4gICAgY2xvc2UoZXZlbnQsIGNoaWxkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgJG5vdGlmID0gZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUgOiBldmVudDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLmhlaWdodCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIGxldCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKCRub3RpZik7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gc3R5bGVzICYmIHN0eWxlcy50cmFuc2l0aW9uRHVyYXRpb24gPyBwYXJzZUZsb2F0KHN0eWxlcy50cmFuc2l0aW9uRHVyYXRpb24pIDogMDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkbm90aWYgJiYgJG5vdGlmLnBhcmVudE5vZGUpICRub3RpZi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRub3RpZik7XG4gICAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJzdWNjZXNzXCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgZXJyb3IobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcImFsZXJ0XCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgd2FybihtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwid2FybmluZ1wiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIG5vdGlmeShtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIHJlbmRlcihub3RpZiwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSh7IGNsYXNzTmFtZTogbm90aWYuY2xhc3NOYW1lLCBtZXNzYWdlOiBub3RpZi5tZXNzYWdlIH0pO1xuICAgICAgICBjb25zdCAkbm90aWYgPSB3cmFwcGVyLmxhc3RDaGlsZDtcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCgkbm90aWYpO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGVybWFuZW50KSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5jbG9zZSgkbm90aWYpOyB9LCBvcHRpb25zLmR1cmF0aW9uIHx8IHRoaXMuZHVyYXRpb24pO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Ob3RpZmljYXRpb25WaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwicG9wdXBcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIj48L2Rpdj5cblx0XHRcdFx0XHRcdCAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0ICBcdDxhIGNsYXNzPVwiY2xvc2VcIj4mIzIxNTs8L2E+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdFx0PCUgdGVtcGxhdGUgPyBwcmludCh0ZW1wbGF0ZSkgOiBwcmludChtZXNzYWdlKSAlPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwiYWN0aW9uc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm9rXCI+T2s8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImN1c3RvbVwiPjwlPSBjdXN0b21OYW1lICU+PC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJjYW5jZWxcIj5DYW5jZWw8L2xpPlxuXHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0ICA8L2Rpdj5gKSxcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBsZXQgJHBvcHVwID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwicG9wdXBcIik7XG4gICAgICAgIGlmICghJHBvcHVwKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkcG9wdXA7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5jbG9zZSc6ICdvbkNsb3NlJyxcbiAgICAgICAgJ2NsaWNrIC5jYW5jZWwnOiAnb25DbG9zZScsXG4gICAgICAgICdjbGljayAub2snOiAnb25PaycsXG4gICAgICAgICdjbGljayAuY3VzdG9tJzogJ29uQ3VzdG9tJ1xuICAgIH0sXG4gICAgc2V0UGFyYW0ocGFyYW1zKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlO1xuICAgICAgICB0aGlzLm9rID0gcGFyYW1zLm9rO1xuICAgICAgICB0aGlzLmNsb3NlID0gcGFyYW1zLmNsb3NlO1xuICAgICAgICB0aGlzLmN1c3RvbSA9IHBhcmFtcy5jdXN0b207XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChwYXJhbXMuY2xhc3MpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9mZiA9IHBhcmFtcy5yZXNpemVPZmY7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgaWYgKHBhcmFtcy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5pc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCBQb3B1cEZvcm1WaWV3ID0gRm9ybVZpZXcuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1WaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdChwYXJhbXMgPSB7fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybVZpZXcucHJvdG90eXBlLnN1Ym1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5jbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9wdXBGb3JtVmlldyhwYXJhbXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMudGVtcGxhdGUgaW5zdGFuY2VvZiBCYWNrYm9uZS5WaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gcGFyYW1zLnRlbXBsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlldyAmJiB0aGlzLnZpZXcub2spIHtcbiAgICAgICAgICAgICAgICB2YXIgb2sgPSBwYXJhbXMub2s7XG4gICAgICAgICAgICAgICAgcGFyYW1zLm9rID0gKCkgPT4gdmlldy52aWV3Lm9rKG9rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub2sgPSBwYXJhbXMub2sgfHwgdGhpcy5vaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJhc2ljKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBmb3JtKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmlzZm9ybSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0UGFyYW0ob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlKSB0aGlzLmNsb3NlLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgb25PaygpIHtcbiAgICAgICAgaWYgKHRoaXMub2spIHRoaXMub2suYXBwbHkodGhpcywgW3RoaXMuY2FsbGJhY2tBcmdzKCldKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2Zvcm0nIHx8IHRoaXMudmlldy5pc1ZhbGlkKSB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uQ3VzdG9tKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b20pIHRoaXMuY3VzdG9tLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykgdGhpcy52aWV3LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLiRlbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLmh0bWwoKTtcbiAgICB9LFxuICAgIGNhbGxiYWNrQXJncygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Zvcm0nKSB7XG4gICAgICAgICAgICB2YWxpZCA9IHRoaXMudmlldy5jaGVjaygpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMudmlldy5nZXRWYWx1ZXMoKSk7XG4gICAgICAgICAgICBhcmdzLnB1c2godmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgfSxcbiAgICByZW5kZXJBY3Rpb25zKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnLm9rJylbdGhpcy5vayA/ICdzaG93JyA6ICdoaWRlJ10oKTtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnLmNhbmNlbCcpW3RoaXMuY2xvc2UgPyAnc2hvdycgOiAnaGlkZSddKCk7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJy5jdXN0b20nKVt0aGlzLmN1c3RvbSA/ICdzaG93JyA6ICdoaWRlJ10oKTtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnLmFjdGlvbnMnKVshdGhpcy5vayAmJiAhdGhpcy5jbG9zZSAmJiAhdGhpcy5jdXN0b20gPyAnaGlkZScgOiAnc2hvdyddKCk7XG4gICAgICAgIHN0YXRpY0FjdGlvbnMgPSBzdGF0aWNBY3Rpb25zID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyc7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJy5hY3Rpb25zJylbc3RhdGljQWN0aW9uc10oJ3N0YXRpYycpO1xuICAgICAgICB0aGlzLiRlbFtzdGF0aWNBY3Rpb25zXSgnc3RhdGljLWFjdGlvbnMnKTtcbiAgICB9LFxuICAgIHJlbmRlcihkYXRhID0ge30pIHtcbiAgICAgICAgZGF0YSA9IF8uZXh0ZW5kKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgICAgICBjdXN0b21OYW1lOiBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgfSwgXy5waWNrKGRhdGEsIFsnbWVzc2FnZScsICdjdXN0b21OYW1lJywgJ3RlbXBsYXRlJywgJ3N0YXRpY0FjdGlvbnMnXSkpO1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoZGF0YSkpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyQWN0aW9ucyhkYXRhLnN0YXRpY0FjdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLiRlbC5maW5kKCcuY29udGVudCcpLmh0bWwodGhpcy52aWV3LiRlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Qb3B1cFZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9kaXY+PGRpdiBjbGFzcz1cIm1lc3NhZ2UgcHVsc2VcIj48JT0gbWVzc2FnZSAlPjxkaXYgY2xhc3M9XCJhbmltXCI+PC9kaXY+PC9kaXY+YCksXG4gICAgdGFnTmFtZTogXCJ3YWl0XCIsXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgaWYgKCRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3dhaXQnKS5sZW5ndGggPT09IDApICRib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkYm9keS5xdWVyeVNlbGVjdG9yKCd3YWl0Jyk7XG4gICAgfSxcbiAgICBzdGFydChtZXNzYWdlLCAkZWwpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAkZWwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0ICR0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoeyBtZXNzYWdlOiBtZXNzYWdlIHx8ICdsb2FkaW5nLi4uJyB9KTtcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkZWwgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QuYWRkKCd3YWl0LWNvbnRhaW5lcicpO1xuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUtY2hpbGQnKTtcbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgICAgbGV0ICR3YWl0ID0gbmV3IEVsZW1lbnQoXCJ3YWl0XCIpO1xuICAgICAgICAgICAgJHdhaXQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICR3YWl0Lmluc2VydEJlZm9yZSgkdGVtcGxhdGUsICR3YWl0LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgJHBhcmVudC5pbnNlcnRCZWZvcmUoJHdhaXQsIHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJHRlbXBsYXRlO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdG9wOiAoY2FsbGJhY2spID0+IHRoaXMuc3RvcCgkZWwsIGNhbGxiYWNrKVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgc3RvcCgkZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gXy5pc0Z1bmN0aW9uKCRlbCkgPyAkZWwgOiBjYWxsYmFjaztcbiAgICAgICAgbGV0ICR3YWl0ID0gJGVsICYmICRlbC5xdWVyeVNlbGVjdG9yKCd3YWl0JykgfHwgdGhpcy5lbDtcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkZWwgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHdhaXQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQsIC5tZXNzYWdlJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3B1bHNlJyk7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtY2hpbGQnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3dhaXQtY29udGFpbmVyJyk7XG4gICAgICAgICAgICAkd2FpdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAkd2FpdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKCRlbCkgJHdhaXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkd2FpdCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9XYWl0Vmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgV2FpdFZpZXcgZnJvbSAnLi92aWV3cy9XYWl0Vmlldyc7XG5pbXBvcnQgUG9wdXBWaWV3IGZyb20gJy4vdmlld3MvUG9wdXBWaWV3JztcbmltcG9ydCBOb3RpZmljYXRpb25WaWV3IGZyb20gJy4vdmlld3MvTm90aWZpY2F0aW9uVmlldyc7XG5pbXBvcnQgRm9ybVZpZXcgZnJvbSAnLi92aWV3cy9Gb3JtVmlldyc7XG5pbXBvcnQgRW50aXR5IGZyb20gJy4vbW9kZWxzL0VudGl0eSc7XG5cbi8vIEFkZCB0b2tlbiBpbiBSRVNUIHJlcXVlc3RcbmNvbnN0IHVzZUp3dCA9IChvcHRpb25zID0geyB0b2tlbigpIHt9LCBvblVuYXV0aG9yaXplZCgpIHt9IH0pID0+IHtcbiAgICBjb25zdCBzeW5jID0gQmFja2JvbmUuc3luYztcbiAgICBCYWNrYm9uZS5zeW5jID0gKG1ldGhvZCwgbW9kZWwsIG9wdHMpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBvcHRpb25zLnRva2VuKCk7XG4gICAgICAgIGlmICh0b2tlbikgb3B0cy5iZWZvcmVTZW5kID0gKHhocikgPT4geyB4aHIuc2V0UmVxdWVzdEhlYWRlcihvcHRpb25zLmhlYWRlciB8fCAnYXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTsgfTtcbiAgICAgICAgbGV0IGVyciA9IG9wdHMuZXJyb3I7XG4gICAgICAgIG9wdHMuZXJyb3IgPSAocGFyYW0pID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbS5zdGF0dXMgJiYgcGFyYW0uc3RhdHVzID09PSA0MDEpIG9wdGlvbnMub25VbmF1dGhvcml6ZWQoKTtcbiAgICAgICAgICAgIGVycihwYXJhbSk7XG4gICAgICAgIH07XG4gICAgICAgIHN5bmMobWV0aG9kLCBtb2RlbCwgb3B0cyk7XG4gICAgfTtcbn07XG5cbmNvbnN0IHZpZXdVdGlscyA9IHtcbiAgICB0YWJsZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfLnRlbXBsYXRlKGA8dGFibGUgY2xhc3M9XCJ7eyBjbGFzc05hbWUgfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4peyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ7eyBjb2x1bW4uY2xhc3MgfX1cIj57eyBjb2x1bW4uaGVhZGVyIHx8IGNvbHVtbi5wcm9wZXJ0eSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBkYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cnkpeyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgY29sdW1uLnRyYW5zZm9ybSA/IGNvbHVtbi50cmFuc2Zvcm0oZW50cnlbY29sdW1uLnByb3BlcnR5XSkgOiBlbnRyeVtjb2x1bW4ucHJvcGVydHldIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+YCkoXy5leHRlbmQoeyBjbGFzc05hbWU6IFwiXCIsIGRhdGE6IFtdLCBjb2x1bW5zOiB7fSB9LCBvcHRpb25zKSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIE5vdGlmaWNhdGlvblZpZXcsXG4gICAgUG9wdXBWaWV3LFxuICAgIEZvcm1WaWV3LFxuICAgIFdhaXRWaWV3LFxuICAgIHZpZXdVdGlscyxcbiAgICBFbnRpdHksXG4gICAgdXNlSnd0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9waXppLWJhY2tib25lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==