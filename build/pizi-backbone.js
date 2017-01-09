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
        if (this.template) this.el.innerHTML = this.template;
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormView__ = __webpack_require__(2);



/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    tagName: "popup",
    template: _.template('<div class="background"></div>\n\t\t\t\t\t\t  <div class="container">\n\t\t\t\t\t\t  \t<a class="close">&#215;</a>\n\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t<% template ? print(template) : print(message) %>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class="actions">\n\t\t\t\t\t\t\t\t<li class="ok">Ok</li>\n\t\t\t\t\t\t\t\t<li class="custom"><%= customName %></li>\n\t\t\t\t\t\t\t\t<li class="cancel">Cancel</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t  </div>'),
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
                    var PopupFormView = __WEBPACK_IMPORTED_MODULE_1__FormView__["a" /* default */].extend({
                        initialize: function initialize() {
                            __WEBPACK_IMPORTED_MODULE_1__FormView__["a" /* default */].prototype.initialize.apply(this, arguments);
                        },
                        submit: function submit() {
                            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            __WEBPACK_IMPORTED_MODULE_1__FormView__["a" /* default */].prototype.submit.apply(this, arguments);
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
        delete options.template;
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
        this.el.style.display = 'none';
        this.el.innerHTML = "";
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
        this.el.getElementsByClassName('ok')[0].style.display = this.ok ? '' : 'none';
        this.el.getElementsByClassName('cancel')[0].style.display = this.close ? '' : 'none';
        this.el.getElementsByClassName('custom')[0].style.display = this.custom ? '' : 'none';
        this.el.getElementsByClassName('actions')[0].style.display = !this.ok && !this.close && !this.custom ? '' : 'none';
        if (staticActions) {
            this.el.getElementsByClassName('actions')[0].classList.add("static");
            this.el.classList.add("static-actions");
        } else {
            this.el.getElementsByClassName('actions')[0].classList.remove("static");
            this.el.classList.remove("static-actions");
        }
    },
    render: function render() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        data = _.extend({
            message: "",
            customName: "",
            template: ""
        }, _.pick(data, ['message', 'customName', 'template', 'staticActions']));
        this.el.style.display = 'flex';
        this.el.innerHTML = this.template(data);
        this.renderActions(data.staticActions);
        if (this.view) {
            this.view.render();
            this.el.getElementsByClassName('content')[0].appendChild(this.view.el);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_FormView__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Entity__ = __webpack_require__(3);







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
        return _.template('<table class="{{ className }}">\n                                <thead>\n                                    <tr>\n                                        <% columns.forEach(function(column){ %>\n                                            <th class="{{ column.class }}">{{ column.header || column.property }}</th>\n                                            <% }) %>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <% data.forEach(function(entry){ %>\n                                        <tr>\n                                            <% columns.forEach(function(column){ %>\n                                                <td>{{ column.transform ? column.transform(entry[column.property]) : entry[column.property] }}</td>\n                                                <% }) %>\n                                        </tr>\n                                        <% }) %>\n                                </tbody>\n                            </table>')(_.defaults(options, { className: "", data: [], columns: {} }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ODA2ZWVmYzA0ZTc1ZDgzYzI1NSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiQmFja2JvbmUiLCJWaWV3IiwiZXh0ZW5kIiwidGFnTmFtZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZXJyb3JDbGFzcyIsInZhbGlkYXRlIiwicGFyYW1zIiwiXyIsInR5cGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY2FjaGUiLCJvbWl0IiwidGVtcGxhdGUiLCJldmVudHMiLCJpbnB1dEVycm9yIiwibmFtZSIsImVycm9yIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwiZ2V0VmFsdWVzIiwiJGVsIiwic2VyaWFsaXplQXJyYXkiLCJnZXRPYmplY3QiLCJvYmplY3QiLCJlYWNoIiwiYXR0cmlidXRlIiwidmFsdWUiLCJjaGVjayIsInZhbGlkIiwicnVsZSIsImxlbmd0aCIsIm1hdGNoIiwicmVnZXgiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInB1c2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlIiwicmVtb3ZlIiwiJG5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc1ZhbGlkIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsInRvVXBwZXJDYXNlIiwiZGF0YSIsIkZvcm1EYXRhIiwiJCIsImFqYXgiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJyZW5kZXIiLCJpbm5lckhUTUwiLCJNb2RlbCIsImRhdGVzIiwiYXR0cnMiLCJwaWNrIiwiY29uY2F0IiwiZGF0ZSIsIkRhdGUiLCJzYXZlIiwicGFyc2UiLCJhbGwiLCJzdWNjZXNzIiwibW9kZWwiLCJyZXNwIiwib3B0cyIsInJlbGF0aW9ucyIsInJlbGF0aW9uIiwia2V5IiwiY29sbGVjdGlvbiIsImdldCIsIm1vZGVscyIsImNhbGwiLCJwcm90b3R5cGUiLCJmZXRjaCIsInRvSlNPTiIsImF0dHJpYnV0ZXMiLCJjbG9uZSIsImhhc093blByb3BlcnR5IiwiQ29sbGVjdGlvbiIsImNvbnZlcnRlZCIsImZvckVhY2giLCJhdHRyIiwic2V0IiwidmFsIiwia2V5cyIsImRlZmluaXRpb24iLCJPYmplY3QiLCJBcnJheSIsImNvbnNvbGUiLCJsb2ciLCJpbmNsdWRlcyIsImFwcGx5IiwibW9kZWxEZWZpbml0aW9uIiwiZGVmYXVsdFJlbGF0aW9ucyIsImRlZmF1bHRzIiwiJG5vdGlmIiwiZG9jdW1lbnQiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImR1cmF0aW9uIiwiY2xvc2UiLCJldmVudCIsImNoaWxkRXZlbnQiLCJ0YXJnZXQiLCJzdHlsZSIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwic3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJzZXRUaW1lb3V0Iiwid2FybiIsIm5vdGlmeSIsIm5vdGlmIiwid3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJsYXN0Q2hpbGQiLCJwZXJtYW5lbnQiLCIkcG9wdXAiLCJxdWVyeVNlbGVjdG9yIiwic2V0UGFyYW0iLCJvayIsImN1c3RvbSIsImFkZCIsImNsYXNzIiwicmVzaXplT2ZmIiwidmlldyIsImlzZm9ybSIsIlBvcHVwRm9ybVZpZXciLCJGb3JtVmlldyIsImFyZ3VtZW50cyIsImNsb3NlUG9wdXAiLCJiYXNpYyIsImZvcm0iLCJvbkNsb3NlIiwiY2FsbGJhY2tBcmdzIiwib25PayIsIm9uQ3VzdG9tIiwiZGlzcGxheSIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjdXN0b21OYW1lIiwiZGVsZWdhdGVFdmVudHMiLCIkYm9keSIsInN0YXJ0IiwiRWxlbWVudCIsIiR0ZW1wbGF0ZSIsIiRwYXJlbnQiLCIkd2FpdCIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJwYXJlbnQiLCJzdG9wIiwiY2FsbGJhY2siLCJpc0Z1bmN0aW9uIiwiZWxlbWVudHMiLCJpIiwib3BhY2l0eSIsInVzZUp3dCIsInRva2VuIiwib25VbmF1dGhvcml6ZWQiLCJzeW5jIiwibWV0aG9kIiwiYmVmb3JlU2VuZCIsInhociIsImhlYWRlciIsImVyciIsInBhcmFtIiwic3RhdHVzIiwidmlld1V0aWxzIiwidGFibGUiLCJjb2x1bW5zIiwiTm90aWZpY2F0aW9uVmlldyIsIlBvcHVwVmlldyIsIldhaXRWaWV3IiwiRW50aXR5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztB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LE1BQUQsRUFBUzNHLEtBQVQsRUFBZ0JFLElBQWhCLEVBQXlCO0FBQ3JDLFlBQU1zRyxRQUFRN0ssUUFBUTZLLEtBQVIsRUFBZDtBQUNBLFlBQUlBLEtBQUosRUFBV3RHLEtBQUswRyxVQUFMLEdBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUFFQSxnQkFBSTVILGdCQUFKLENBQXFCdEQsUUFBUW1MLE1BQVIsSUFBa0IsZUFBdkMsRUFBd0QsWUFBWU4sS0FBcEU7QUFBNkUsU0FBMUc7QUFDWCxZQUFJTyxNQUFNN0csS0FBS3pELEtBQWY7QUFDQXlELGFBQUt6RCxLQUFMLEdBQWEsVUFBQ3VLLEtBQUQsRUFBVztBQUNwQixnQkFBSUEsTUFBTUMsTUFBTixJQUFnQkQsTUFBTUMsTUFBTixLQUFpQixHQUFyQyxFQUEwQ3RMLFFBQVE4SyxjQUFSO0FBQzFDTSxnQkFBSUMsS0FBSjtBQUNILFNBSEQ7QUFJQU4sYUFBS0MsTUFBTCxFQUFhM0csS0FBYixFQUFvQkUsSUFBcEI7QUFDSCxLQVREO0FBVUgsQ0FaRDs7QUFjQSxJQUFNZ0gsWUFBWTtBQUNkQyxTQURjLGlCQUNSeEwsT0FEUSxFQUNDO0FBQ1gsZUFBT0ksRUFBRU0sUUFBRixna0NBaUJ3Qk4sRUFBRWlHLFFBQUYsQ0FBV3JHLE9BQVgsRUFBb0IsRUFBRWlCLFdBQVcsRUFBYixFQUFpQjZCLE1BQU0sRUFBdkIsRUFBMkIySSxTQUFTLEVBQXBDLEVBQXBCLENBakJ4QixDQUFQO0FBa0JIO0FBcEJhLENBQWxCOztBQXVCQSxrREFBZTtBQUNYQyxzQkFBQSx3RUFEVztBQUVYQyxlQUFBLGlFQUZXO0FBR1g5QyxjQUFBLGdFQUhXO0FBSVgrQyxjQUFBLGdFQUpXO0FBS1hMLHdCQUxXO0FBTVhNLFlBQUEsK0RBTlc7QUFPWGpCO0FBUFcsQ0FBZixDIiwiZmlsZSI6InBpemktYmFja2JvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWNrYm9uZVwiKSwgcmVxdWlyZShcInVuZGVyc2NvcmVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJwaXppLWJhY2tib25lXCIsIFtcImJhY2tib25lXCIsIFwidW5kZXJzY29yZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFja2JvbmVcIiksIHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyb290W1wiYmFja2JvbmVcIl0sIHJvb3RbXCJ1bmRlcnNjb3JlXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1ODA2ZWVmYzA0ZTc1ZDgzYzI1NSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFja2JvbmVcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5kZXJzY29yZVwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcImZvcm1cIixcbiAgICBpbml0aWFsaXplKG9wdGlvbnMgPSB7IGVycm9yQ2xhc3M6ICdlcnJvcicsIHZhbGlkYXRlOiBbXSB9KSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gXy5leHRlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0sIF8ub21pdChvcHRpb25zLCBbJ3RlbXBsYXRlJywgJ3ZhbGlkYXRlJywgJ2Vycm9yQ2xhc3MnXSkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IG9wdGlvbnMudmFsaWRhdGU7XG4gICAgICAgIHRoaXMuZXJyb3JDbGFzcyA9IG9wdGlvbnMuZXJyb3JDbGFzcztcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLnN1Ym1pdCc6ICdzdWJtaXQnXG4gICAgfSxcbiAgICBpbnB1dEVycm9yKG5hbWUsIGVycm9yKSB7XG4gICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbbmFtZT1cIiR7bmFtZX1cIl1gKS5jbGFzc05hbWUgKz0gKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgfSxcbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5zZXJpYWxpemVBcnJheSgpO1xuICAgIH0sXG4gICAgZ2V0T2JqZWN0KCkge1xuICAgICAgICBsZXQgb2JqZWN0ID0ge307XG4gICAgICAgIF8uZWFjaCh0aGlzLmdldFZhbHVlcygpLCAoYXR0cmlidXRlKSA9PiBvYmplY3RbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9LFxuICAgIGNoZWNrKCkge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgaW4gdGhpcy52YWxpZGF0ZSkge1xuICAgICAgICAgICAgbGV0IGVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcqW25hbWU9XCInICsgcnVsZS5uYW1lICsgJ1wiXScpO1xuICAgICAgICAgICAgaWYgKGVsLmxlbmd0aCAmJiAhZWxbMF0udmFsdWUubWF0Y2gocnVsZS5yZWdleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmVycm9yQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5wdXNoKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCAnPHNtYWxsIGNsYXNzPVwiJyArIHRoaXMuZXJyb3JDbGFzcyArICdcIj4nICsgcnVsZS5tZXNzYWdlICsgJzwvc21hbGw+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lcnJvckNsYXNzKTtcbiAgICAgICAgICAgICAgICBsZXQgJG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKCRuZXh0LnRhZ05hbWUgPT09IFwic21hbGxcIikgJG5leHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gdmFsaWQ7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9LFxuICAgIHN1Ym1pdChwYXJhbXMgPSB7fSkge1xuICAgICAgICBwYXJhbXMgPSAhcGFyYW1zLmN1cnJlbnRUYXJnZXQgPyBfLmV4dGVuZCh0aGlzLnBhcmFtcywgcGFyYW1zKSA6IHRoaXMucGFyYW1zO1xuICAgICAgICBpZiAocGFyYW1zLnR5cGUudG9VcHBlckNhc2UoKSAhPT0gJ0dFVCcpIHBhcmFtcy5kYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZWwpO1xuICAgICAgICAkLmFqYXgocGFyYW1zKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKHBhcmFtcy50eXBlLCBwYXJhbXMudXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIHJlcXVlc3Quc2VuZChwYXJhbXMuZGF0YSk7XG4gICAgfSxcbiAgICByZW5kZXIob3B0aW9ucyA9IHt9KSB7IGlmICh0aGlzLnRlbXBsYXRlKSB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7IH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Gb3JtVmlldy5qcyIsIi8qanNoaW50IGxvb3BmdW5jOiB0cnVlICovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcblxuY29uc3QgTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICAgIGRhdGVzOiBbXSxcbiAgICB2YWxpZGF0ZShhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZGF0ZXMgPSBfLnBpY2soYXR0cnMsIHRoaXMuZGF0ZXMuY29uY2F0KFsnZGF0ZSddKSk7XG4gICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmIChkYXRlc1tkYXRlXSAmJiAhKGRhdGVzW2RhdGVdIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2F2ZShhdHRycywgb3B0aW9ucyA9IHsgcGFyc2U6IGZhbHNlIH0pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IChtb2RlbCwgcmVzcCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnJlbGF0aW9ucywgKHJlbGF0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWwuZ2V0KGtleSkgaW5zdGFuY2VvZiByZWxhdGlvbi5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobW9kZWwuZ2V0KGtleSkubW9kZWxzLCAobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zYXZlKG51bGwsIHsgYWxsOiBvcHRpb25zLmFsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MuY2FsbCh0aGlzLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3h5IHRoZSBjYWxsIHRvIHRoZSBvcmlnaW5hbCBzYXZlIGZ1bmN0aW9uXG4gICAgICAgIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5zYXZlLmNhbGwodGhpcywgYXR0cnMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgZmV0Y2gob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSAobW9kZWwsIHJlc3AsIG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5yZWxhdGlvbnMsIChyZWxhdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsLmdldChrZXkpIGluc3RhbmNlb2YgcmVsYXRpb24uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG1vZGVsLmdldChrZXkpLm1vZGVscywgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmV0Y2goeyBhbGw6IG9wdGlvbnMuYWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcy5jYWxsKHRoaXMsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLmZldGNoLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfSxcbiAgICB0b0pTT04ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gaW5zdGFuY2VvZiBCYWNrYm9uZS5Nb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBvcHRpb25zLmFsbCA/IF8ucGljayhhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sIFwiaWRcIikgOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0udG9KU09OKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdIGluc3RhbmNlb2YgQmFja2JvbmUuQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udmVydGVkID0gW107XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5mb3JFYWNoKGF0dHIgPT4gY29udmVydGVkLnB1c2gob3B0aW9ucy5hbGwgPyBfLnBpY2soYXR0ciwgJ2lkJykgOiBhdHRyLnRvSlNPTihvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBjb252ZXJ0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXM7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGtleTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB2YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoYXR0cmlidXRlcyA9IHt9KVtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRzID0gXy5leHRlbmQoeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHJlbGF0aW9ucyA9IF8ua2V5cyh0aGlzLnJlbGF0aW9ucyk7XG4gICAgICAgIF8uZWFjaChhdHRyaWJ1dGVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uY29udGFpbnMocmVsYXRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmluaXRpb24gPSB0aGlzLnJlbGF0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1vZGVsICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3IGRlZmluaXRpb24ubW9kZWwodmFsdWUsIG9wdHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFycmF5IGlzIGEgcmVhbCBhcnJheSAoa2V5ID0gbnVtYmVyKSwgaWYgaXQgaXMgaXQgbXVzdCBiZSBpZCdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0KGtleSkuc2V0KG5ldyBkZWZpbml0aW9uLmNvbGxlY3Rpb24odmFsdWUsIG9wdHMpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24ubW9kZWwgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb24ubW9kZWwpIHx8IGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmFkIG1vZGVsIGRlZmluaXRpb246ICcgKyB0aGlzLmdldCgnY2xhc3NOYW1lJykpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLmNvbmNhdChbJ2RhdGUnXSkuaW5jbHVkZXMoa2V5KSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0gPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNldC5hcHBseSh0aGlzLCBbYXR0cmlidXRlcywgb3B0aW9uc10pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEV4dGVuZCB0aGUgQmFja2JvbmUuTW9kZWwuZXh0ZW5kIG1ldGhvZCwgdG8gYWRkIHNvbWUgdHJlYXRlbWVudCBvbiBpbnN0YW5jZSBjcmVhdGlvblxuICogQHBhcmFtICB7T2JqZWN0fSBtb2RlbERlZmluaXRpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgbW9kZWwgY29uc3RydWN0b3JcbiAqL1xuTW9kZWwuZXh0ZW5kID0gZnVuY3Rpb24obW9kZWxEZWZpbml0aW9uKSB7XG4gICAgLy8gU2V0IGRlZmF1bHRzIGNvbGxlY3Rpb25zIGZvciByZWxhdGlvbnNcbiAgICB2YXIgZGVmYXVsdFJlbGF0aW9ucyA9IHt9O1xuICAgIF8uZWFjaChtb2RlbERlZmluaXRpb24ucmVsYXRpb25zLCAoZGVmaW5pdGlvbiwga2V5KSA9PiB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZGVmYXVsdFJlbGF0aW9uc1trZXldID0gbmV3IGRlZmluaXRpb24uY29sbGVjdGlvbihtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmICEobW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIGRlZmF1bHQgdmFsdWUgZm9yIFwiICsga2V5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF8uZXh0ZW5kKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0cywgZGVmYXVsdFJlbGF0aW9ucyk7XG4gICAgcmV0dXJuIEJhY2tib25lLk1vZGVsLmV4dGVuZC5jYWxsKHRoaXMsIG1vZGVsRGVmaW5pdGlvbik7XG59O1xuXG4vKipcbiAqIFRoZSBDb2xsZWN0aW9uXG4gKiBAdHlwZSB7QmFja2JvbmUuQ29sbGVjdGlvbn1cbiAqL1xuY29uc3QgQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICAvKiBVc2VkIHRvIGluc3RhbmNpYXRlIGEgbmV3IE1vZGVsIGZyb20gSnNvbiAobmVlZCB0byBvdmVycmlkZSBpZiBzdWJ0eXBlcykqL1xuICAgIG1vZGVsOiBNb2RlbFxufSk7XG5cbi8qKlxuICogRXhwb3J0aW5nIHRoZSBNb2RlbCBhbmQgdGhlIENvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIE1vZGVsLFxuICAgIENvbGxlY3Rpb25cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJub3RpZmljYXRpb25cIixcbiAgICBjbGFzc05hbWU6IFwiY29udGFpbmVyLWZsdWlkXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxoMyBjbGFzcz1cIm5vdGlmIDwlPSBjbGFzc05hbWUgJT5cIj48JT0gbWVzc2FnZSAlPjxhIGNsYXNzPVwiY2xvc2VcIj4mdGltZXM7PC9hPjwvaDM+YCksXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0ICRub3RpZiA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ25vdGlmaWNhdGlvbicpWzBdO1xuICAgICAgICBpZiAoISRub3RpZikgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJG5vdGlmO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAzMDAwO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuY2xvc2UnOiAnY2xvc2UnXG4gICAgfSxcbiAgICBjbG9zZShldmVudCwgY2hpbGRFdmVudCkge1xuICAgICAgICBjb25zdCAkbm90aWYgPSBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQucGFyZW50Tm9kZSA6IGV2ZW50O1xuICAgICAgICAkbm90aWYuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUucGFkZGluZ1RvcCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoJG5vdGlmKTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBzdHlsZXMgJiYgc3R5bGVzLnRyYW5zaXRpb25EdXJhdGlvbiA/IHBhcnNlRmxvYXQoc3R5bGVzLnRyYW5zaXRpb25EdXJhdGlvbikgOiAwO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCRub3RpZiAmJiAkbm90aWYucGFyZW50Tm9kZSkgJG5vdGlmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJG5vdGlmKTtcbiAgICAgICAgfSwgZHVyYXRpb24gKiAxMDAwKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcInN1Y2Nlc3NcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICBlcnJvcihtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwiYWxlcnRcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICB3YXJuKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJ3YXJuaW5nXCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgbm90aWZ5KG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgcmVuZGVyKG5vdGlmLCBvcHRpb25zID0ge30pIHtcblxuICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgd3JhcHBlci5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKHsgY2xhc3NOYW1lOiBub3RpZi5jbGFzc05hbWUsIG1lc3NhZ2U6IG5vdGlmLm1lc3NhZ2UgfSk7XG4gICAgICAgIGNvbnN0ICRub3RpZiA9IHdyYXBwZXIubGFzdENoaWxkO1xuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKCRub3RpZik7XG4gICAgICAgIGlmICghb3B0aW9ucy5wZXJtYW5lbnQpIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmNsb3NlKCRub3RpZik7IH0sIG9wdGlvbnMuZHVyYXRpb24gfHwgdGhpcy5kdXJhdGlvbik7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IEZvcm1WaWV3IGZyb20gJy4vRm9ybVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJwb3B1cFwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuXHRcdFx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQgIFx0PGEgY2xhc3M9XCJjbG9zZVwiPiYjMjE1OzwvYT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0XHQ8JSB0ZW1wbGF0ZSA/IHByaW50KHRlbXBsYXRlKSA6IHByaW50KG1lc3NhZ2UpICU+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJhY3Rpb25zXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwib2tcIj5PazwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiY3VzdG9tXCI+PCU9IGN1c3RvbU5hbWUgJT48L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvbGk+XG5cdFx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHQgIDwvZGl2PmApLFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGxldCAkcG9wdXAgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCJwb3B1cFwiKTtcbiAgICAgICAgaWYgKCEkcG9wdXApIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRwb3B1cDtcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLmNsb3NlJzogJ29uQ2xvc2UnLFxuICAgICAgICAnY2xpY2sgLmNhbmNlbCc6ICdvbkNsb3NlJyxcbiAgICAgICAgJ2NsaWNrIC5vayc6ICdvbk9rJyxcbiAgICAgICAgJ2NsaWNrIC5jdXN0b20nOiAnb25DdXN0b20nXG4gICAgfSxcbiAgICBzZXRQYXJhbShwYXJhbXMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGU7XG4gICAgICAgIHRoaXMub2sgPSBwYXJhbXMub2s7XG4gICAgICAgIHRoaXMuY2xvc2UgPSBwYXJhbXMuY2xvc2U7XG4gICAgICAgIHRoaXMuY3VzdG9tID0gcGFyYW1zLmN1c3RvbTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5jbGFzcyk7XG4gICAgICAgIHRoaXMucmVzaXplT2ZmID0gcGFyYW1zLnJlc2l6ZU9mZjtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICBpZiAocGFyYW1zLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmlzZm9ybSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IFBvcHVwRm9ybVZpZXcgPSBGb3JtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybVZpZXcucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0KHBhcmFtcyA9IHt9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtVmlldy5wcm90b3R5cGUuc3VibWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBQb3B1cEZvcm1WaWV3KHBhcmFtcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIEJhY2tib25lLlZpZXcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBwYXJhbXMudGVtcGxhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ICYmIHRoaXMudmlldy5vaykge1xuICAgICAgICAgICAgICAgIHZhciBvayA9IHBhcmFtcy5vaztcbiAgICAgICAgICAgICAgICBwYXJhbXMub2sgPSAoKSA9PiB2aWV3LnZpZXcub2sob2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vayA9IHBhcmFtcy5vayB8fCB0aGlzLm9rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmFzaWMob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW0ob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGZvcm0ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMuaXNmb3JtID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbShvcHRpb25zKTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMudGVtcGxhdGU7XG4gICAgICAgIHRoaXMucmVuZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlKSB0aGlzLmNsb3NlLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgb25PaygpIHtcbiAgICAgICAgaWYgKHRoaXMub2spIHRoaXMub2suYXBwbHkodGhpcywgW3RoaXMuY2FsbGJhY2tBcmdzKCldKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2Zvcm0nIHx8IHRoaXMudmlldy5pc1ZhbGlkKSB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uQ3VzdG9tKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b20pIHRoaXMuY3VzdG9tLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykgdGhpcy52aWV3LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9LFxuICAgIGNhbGxiYWNrQXJncygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Zvcm0nKSB7XG4gICAgICAgICAgICB2YWxpZCA9IHRoaXMudmlldy5jaGVjaygpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMudmlldy5nZXRWYWx1ZXMoKSk7XG4gICAgICAgICAgICBhcmdzLnB1c2godmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgfSxcbiAgICByZW5kZXJBY3Rpb25zKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvaycpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9rID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2FuY2VsJylbMF0uc3R5bGUuZGlzcGxheSA9IHRoaXMuY2xvc2UgPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXN0b20nKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5jdXN0b20gPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uc3R5bGUuZGlzcGxheSA9ICF0aGlzLm9rICYmICF0aGlzLmNsb3NlICYmICF0aGlzLmN1c3RvbSA/ICcnIDogJ25vbmUnO1xuICAgICAgICBpZiAoc3RhdGljQWN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uY2xhc3NMaXN0LmFkZChcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcInN0YXRpYy1hY3Rpb25zXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpYy1hY3Rpb25zXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXIoZGF0YSA9IHt9KSB7XG4gICAgICAgIGRhdGEgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgY3VzdG9tTmFtZTogXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgIH0sIF8ucGljayhkYXRhLCBbJ21lc3NhZ2UnLCAnY3VzdG9tTmFtZScsICd0ZW1wbGF0ZScsICdzdGF0aWNBY3Rpb25zJ10pKTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoZGF0YSk7XG4gICAgICAgIHRoaXMucmVuZGVyQWN0aW9ucyhkYXRhLnN0YXRpY0FjdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZCh0aGlzLnZpZXcuZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvUG9wdXBWaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJtZXNzYWdlIHB1bHNlXCI+PCU9IG1lc3NhZ2UgJT48ZGl2IGNsYXNzPVwiYW5pbVwiPjwvZGl2PjwvZGl2PmApLFxuICAgIHRhZ05hbWU6IFwid2FpdFwiLFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGlmICgkYm9keS5xdWVyeVNlbGVjdG9yQWxsKCd3YWl0JykubGVuZ3RoID09PSAwKSAkYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJGJvZHkucXVlcnlTZWxlY3Rvcignd2FpdCcpO1xuICAgIH0sXG4gICAgc3RhcnQobWVzc2FnZSwgJGVsKSB7XG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgJGVsID0gbWVzc2FnZTtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHsgbWVzc2FnZTogbWVzc2FnZSB8fCAnbG9hZGluZy4uLicgfSk7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnd2FpdC1jb250YWluZXInKTtcbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QuYWRkKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAgIGxldCAkd2FpdCA9IG5ldyBFbGVtZW50KFwid2FpdFwiKTtcbiAgICAgICAgICAgICR3YWl0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAkd2FpdC5pbnNlcnRCZWZvcmUoJHRlbXBsYXRlLCAkd2FpdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICRwYXJlbnQuaW5zZXJ0QmVmb3JlKCR3YWl0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICR0ZW1wbGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RvcDogKGNhbGxiYWNrKSA9PiB0aGlzLnN0b3AoJGVsLCBjYWxsYmFjaylcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHN0b3AoJGVsLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF8uaXNGdW5jdGlvbigkZWwpID8gJGVsIDogY2FsbGJhY2s7XG4gICAgICAgIGxldCAkd2FpdCA9ICRlbCAmJiAkZWwucXVlcnlTZWxlY3Rvcignd2FpdCcpIHx8IHRoaXMuZWw7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGxldCBlbGVtZW50cyA9ICR3YWl0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLCAubWVzc2FnZScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdwdWxzZScpO1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd3YWl0LWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgJHdhaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgJHdhaXQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGlmICgkZWwpICR3YWl0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHdhaXQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IFdhaXRWaWV3IGZyb20gJy4vdmlld3MvV2FpdFZpZXcnO1xuaW1wb3J0IFBvcHVwVmlldyBmcm9tICcuL3ZpZXdzL1BvcHVwVmlldyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uVmlldyBmcm9tICcuL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcnO1xuaW1wb3J0IEZvcm1WaWV3IGZyb20gJy4vdmlld3MvRm9ybVZpZXcnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL21vZGVscy9FbnRpdHknO1xuXG4vLyBBZGQgdG9rZW4gaW4gUkVTVCByZXF1ZXN0XG5jb25zdCB1c2VKd3QgPSAob3B0aW9ucyA9IHsgdG9rZW4oKSB7fSwgb25VbmF1dGhvcml6ZWQoKSB7fSB9KSA9PiB7XG4gICAgY29uc3Qgc3luYyA9IEJhY2tib25lLnN5bmM7XG4gICAgQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gb3B0aW9ucy50b2tlbigpO1xuICAgICAgICBpZiAodG9rZW4pIG9wdHMuYmVmb3JlU2VuZCA9ICh4aHIpID0+IHsgeGhyLnNldFJlcXVlc3RIZWFkZXIob3B0aW9ucy5oZWFkZXIgfHwgJ2F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7IH07XG4gICAgICAgIGxldCBlcnIgPSBvcHRzLmVycm9yO1xuICAgICAgICBvcHRzLmVycm9yID0gKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW0uc3RhdHVzICYmIHBhcmFtLnN0YXR1cyA9PT0gNDAxKSBvcHRpb25zLm9uVW5hdXRob3JpemVkKCk7XG4gICAgICAgICAgICBlcnIocGFyYW0pO1xuICAgICAgICB9O1xuICAgICAgICBzeW5jKG1ldGhvZCwgbW9kZWwsIG9wdHMpO1xuICAgIH07XG59O1xuXG5jb25zdCB2aWV3VXRpbHMgPSB7XG4gICAgdGFibGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZShgPHRhYmxlIGNsYXNzPVwie3sgY2xhc3NOYW1lIH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwie3sgY29sdW1uLmNsYXNzIH19XCI+e3sgY29sdW1uLmhlYWRlciB8fCBjb2x1bW4ucHJvcGVydHkgfX08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4peyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGNvbHVtbi50cmFuc2Zvcm0gPyBjb2x1bW4udHJhbnNmb3JtKGVudHJ5W2NvbHVtbi5wcm9wZXJ0eV0pIDogZW50cnlbY29sdW1uLnByb3BlcnR5XSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPmApKF8uZGVmYXVsdHMob3B0aW9ucywgeyBjbGFzc05hbWU6IFwiXCIsIGRhdGE6IFtdLCBjb2x1bW5zOiB7fSB9KSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIE5vdGlmaWNhdGlvblZpZXcsXG4gICAgUG9wdXBWaWV3LFxuICAgIEZvcm1WaWV3LFxuICAgIFdhaXRWaWV3LFxuICAgIHZpZXdVdGlscyxcbiAgICBFbnRpdHksXG4gICAgdXNlSnd0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9waXppLWJhY2tib25lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==