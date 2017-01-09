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
            this.el.getElementsByClassName('content')[0].innerHTML = this.view.$el;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNzY5NzdkY2FiMmRhMjRjYzMwNSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiQmFja2JvbmUiLCJWaWV3IiwiZXh0ZW5kIiwidGFnTmFtZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZXJyb3JDbGFzcyIsInZhbGlkYXRlIiwicGFyYW1zIiwiXyIsInR5cGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY2FjaGUiLCJvbWl0IiwidGVtcGxhdGUiLCJldmVudHMiLCJpbnB1dEVycm9yIiwibmFtZSIsImVycm9yIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwiZ2V0VmFsdWVzIiwiJGVsIiwic2VyaWFsaXplQXJyYXkiLCJnZXRPYmplY3QiLCJvYmplY3QiLCJlYWNoIiwiYXR0cmlidXRlIiwidmFsdWUiLCJjaGVjayIsInZhbGlkIiwicnVsZSIsImxlbmd0aCIsIm1hdGNoIiwicmVnZXgiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInB1c2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlIiwicmVtb3ZlIiwiJG5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc1ZhbGlkIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsInRvVXBwZXJDYXNlIiwiZGF0YSIsIkZvcm1EYXRhIiwiJCIsImFqYXgiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJyZW5kZXIiLCJpbm5lckhUTUwiLCJNb2RlbCIsImRhdGVzIiwiYXR0cnMiLCJwaWNrIiwiY29uY2F0IiwiZGF0ZSIsIkRhdGUiLCJzYXZlIiwicGFyc2UiLCJhbGwiLCJzdWNjZXNzIiwibW9kZWwiLCJyZXNwIiwib3B0cyIsInJlbGF0aW9ucyIsInJlbGF0aW9uIiwia2V5IiwiY29sbGVjdGlvbiIsImdldCIsIm1vZGVscyIsImNhbGwiLCJwcm90b3R5cGUiLCJmZXRjaCIsInRvSlNPTiIsImF0dHJpYnV0ZXMiLCJjbG9uZSIsImhhc093blByb3BlcnR5IiwiQ29sbGVjdGlvbiIsImNvbnZlcnRlZCIsImZvckVhY2giLCJhdHRyIiwic2V0IiwidmFsIiwia2V5cyIsImRlZmluaXRpb24iLCJPYmplY3QiLCJBcnJheSIsImNvbnNvbGUiLCJsb2ciLCJpbmNsdWRlcyIsImFwcGx5IiwibW9kZWxEZWZpbml0aW9uIiwiZGVmYXVsdFJlbGF0aW9ucyIsImRlZmF1bHRzIiwiJG5vdGlmIiwiZG9jdW1lbnQiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImR1cmF0aW9uIiwiY2xvc2UiLCJldmVudCIsImNoaWxkRXZlbnQiLCJ0YXJnZXQiLCJzdHlsZSIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwic3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJzZXRUaW1lb3V0Iiwid2FybiIsIm5vdGlmeSIsIm5vdGlmIiwid3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJsYXN0Q2hpbGQiLCJwZXJtYW5lbnQiLCIkcG9wdXAiLCJxdWVyeVNlbGVjdG9yIiwic2V0UGFyYW0iLCJvayIsImN1c3RvbSIsImFkZCIsImNsYXNzIiwicmVzaXplT2ZmIiwidmlldyIsImlzZm9ybSIsIlBvcHVwRm9ybVZpZXciLCJGb3JtVmlldyIsImFyZ3VtZW50cyIsImNsb3NlUG9wdXAiLCJiYXNpYyIsImZvcm0iLCJvbkNsb3NlIiwiY2FsbGJhY2tBcmdzIiwib25PayIsIm9uQ3VzdG9tIiwiZGlzcGxheSIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjdXN0b21OYW1lIiwiZGVsZWdhdGVFdmVudHMiLCIkYm9keSIsInN0YXJ0IiwiRWxlbWVudCIsIiR0ZW1wbGF0ZSIsIiRwYXJlbnQiLCIkd2FpdCIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJwYXJlbnQiLCJzdG9wIiwiY2FsbGJhY2siLCJpc0Z1bmN0aW9uIiwiZWxlbWVudHMiLCJpIiwib3BhY2l0eSIsInVzZUp3dCIsInRva2VuIiwib25VbmF1dGhvcml6ZWQiLCJzeW5jIiwibWV0aG9kIiwiYmVmb3JlU2VuZCIsInhociIsImhlYWRlciIsImVyciIsInBhcmFtIiwic3RhdHVzIiwidmlld1V0aWxzIiwidGFibGUiLCJjb2x1bW5zIiwiTm90aWZpY2F0aW9uVmlldyIsIlBvcHVwVmlldyIsIldhaXRWaWV3IiwiRW50aXR5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztB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QkUsSUFBaEIsRUFBeUI7QUFDckMsWUFBTXNHLFFBQVE3SyxRQUFRNkssS0FBUixFQUFkO0FBQ0EsWUFBSUEsS0FBSixFQUFXdEcsS0FBSzBHLFVBQUwsR0FBa0IsVUFBQ0MsR0FBRCxFQUFTO0FBQUVBLGdCQUFJNUgsZ0JBQUosQ0FBcUJ0RCxRQUFRbUwsTUFBUixJQUFrQixlQUF2QyxFQUF3RCxZQUFZTixLQUFwRTtBQUE2RSxTQUExRztBQUNYLFlBQUlPLE1BQU03RyxLQUFLekQsS0FBZjtBQUNBeUQsYUFBS3pELEtBQUwsR0FBYSxVQUFDdUssS0FBRCxFQUFXO0FBQ3BCLGdCQUFJQSxNQUFNQyxNQUFOLElBQWdCRCxNQUFNQyxNQUFOLEtBQWlCLEdBQXJDLEVBQTBDdEwsUUFBUThLLGNBQVI7QUFDMUNNLGdCQUFJQyxLQUFKO0FBQ0gsU0FIRDtBQUlBTixhQUFLQyxNQUFMLEVBQWEzRyxLQUFiLEVBQW9CRSxJQUFwQjtBQUNILEtBVEQ7QUFVSCxDQVpEOztBQWNBLElBQU1nSCxZQUFZO0FBQ2RDLFNBRGMsaUJBQ1J4TCxPQURRLEVBQ0M7QUFDWCxlQUFPSSxFQUFFTSxRQUFGLGdrQ0FpQndCTixFQUFFaUcsUUFBRixDQUFXckcsT0FBWCxFQUFvQixFQUFFaUIsV0FBVyxFQUFiLEVBQWlCNkIsTUFBTSxFQUF2QixFQUEyQjJJLFNBQVMsRUFBcEMsRUFBcEIsQ0FqQnhCLENBQVA7QUFrQkg7QUFwQmEsQ0FBbEI7O0FBdUJBLGtEQUFlO0FBQ1hDLHNCQUFBLHdFQURXO0FBRVhDLGVBQUEsaUVBRlc7QUFHWDlDLGNBQUEsZ0VBSFc7QUFJWCtDLGNBQUEsZ0VBSlc7QUFLWEwsd0JBTFc7QUFNWE0sWUFBQSwrREFOVztBQU9YakI7QUFQVyxDQUFmLEMiLCJmaWxlIjoicGl6aS1iYWNrYm9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhY2tib25lXCIpLCByZXF1aXJlKFwidW5kZXJzY29yZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInBpemktYmFja2JvbmVcIiwgW1wiYmFja2JvbmVcIiwgXCJ1bmRlcnNjb3JlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInBpemktYmFja2JvbmVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWNrYm9uZVwiKSwgcmVxdWlyZShcInVuZGVyc2NvcmVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInBpemktYmFja2JvbmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJiYWNrYm9uZVwiXSwgcm9vdFtcInVuZGVyc2NvcmVcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI3Njk3N2RjYWIyZGEyNGNjMzA1IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFja2JvbmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWNrYm9uZVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bmRlcnNjb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwiZm9ybVwiLFxuICAgIGluaXRpYWxpemUob3B0aW9ucyA9IHsgZXJyb3JDbGFzczogJ2Vycm9yJywgdmFsaWRhdGU6IFtdIH0pIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgfSwgXy5vbWl0KG9wdGlvbnMsIFsndGVtcGxhdGUnLCAndmFsaWRhdGUnLCAnZXJyb3JDbGFzcyddKSk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgICB0aGlzLnZhbGlkYXRlID0gb3B0aW9ucy52YWxpZGF0ZTtcbiAgICAgICAgdGhpcy5lcnJvckNsYXNzID0gb3B0aW9ucy5lcnJvckNsYXNzO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuc3VibWl0JzogJ3N1Ym1pdCdcbiAgICB9LFxuICAgIGlucHV0RXJyb3IobmFtZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVwiXWApLmNsYXNzTmFtZSArPSAodGhpcy5lcnJvckNsYXNzKTtcbiAgICB9LFxuICAgIGdldFZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgfSxcbiAgICBnZXRPYmplY3QoKSB7XG4gICAgICAgIGxldCBvYmplY3QgPSB7fTtcbiAgICAgICAgXy5lYWNoKHRoaXMuZ2V0VmFsdWVzKCksIChhdHRyaWJ1dGUpID0+IG9iamVjdFthdHRyaWJ1dGUubmFtZV0gPSBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBpbiB0aGlzLnZhbGlkYXRlKSB7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJypbbmFtZT1cIicgKyBydWxlLm5hbWUgKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoZWwubGVuZ3RoICYmICFlbFswXS52YWx1ZS5tYXRjaChydWxlLnJlZ2V4KSkge1xuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZXJyb3JDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnB1c2godGhpcy5lcnJvckNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsICc8c21hbGwgY2xhc3M9XCInICsgdGhpcy5lcnJvckNsYXNzICsgJ1wiPicgKyBydWxlLm1lc3NhZ2UgKyAnPC9zbWFsbD4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVycm9yQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGxldCAkbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoJG5leHQudGFnTmFtZSA9PT0gXCJzbWFsbFwiKSAkbmV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSB2YWxpZDtcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG4gICAgc3VibWl0KHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHBhcmFtcyA9ICFwYXJhbXMuY3VycmVudFRhcmdldCA/IF8uZXh0ZW5kKHRoaXMucGFyYW1zLCBwYXJhbXMpIDogdGhpcy5wYXJhbXM7XG4gICAgICAgIGlmIChwYXJhbXMudHlwZS50b1VwcGVyQ2FzZSgpICE9PSAnR0VUJykgcGFyYW1zLmRhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lbCk7XG4gICAgICAgICQuYWpheChwYXJhbXMpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4ocGFyYW1zLnR5cGUsIHBhcmFtcy51cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtcy5kYXRhKTtcbiAgICB9LFxuICAgIHJlbmRlcihvcHRpb25zID0ge30pIHsgaWYgKHRoaXMudGVtcGxhdGUpIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZTsgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL0Zvcm1WaWV3LmpzIiwiLypqc2hpbnQgbG9vcGZ1bmM6IHRydWUgKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gXCJiYWNrYm9uZVwiO1xuXG5jb25zdCBNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG4gICAgZGF0ZXM6IFtdLFxuICAgIHZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkYXRlcyA9IF8ucGljayhhdHRycywgdGhpcy5kYXRlcy5jb25jYXQoWydkYXRlJ10pKTtcbiAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRlcykge1xuICAgICAgICAgICAgaWYgKGRhdGVzW2RhdGVdICYmICEoZGF0ZXNbZGF0ZV0gaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzYXZlKGF0dHJzLCBvcHRpb25zID0geyBwYXJzZTogZmFsc2UgfSkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbGwpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzID0gKG1vZGVsLCByZXNwLCBvcHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMucmVsYXRpb25zLCAocmVsYXRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbC5nZXQoa2V5KSBpbnN0YW5jZW9mIHJlbGF0aW9uLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChtb2RlbC5nZXQoa2V5KS5tb2RlbHMsIChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNhdmUobnVsbCwgeyBhbGw6IG9wdGlvbnMuYWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcy5jYWxsKHRoaXMsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJveHkgdGhlIGNhbGwgdG8gdGhlIG9yaWdpbmFsIHNhdmUgZnVuY3Rpb25cbiAgICAgICAgQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNhdmUuY2FsbCh0aGlzLCBhdHRycywgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBmZXRjaChvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IChtb2RlbCwgcmVzcCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnJlbGF0aW9ucywgKHJlbGF0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWwuZ2V0KGtleSkgaW5zdGFuY2VvZiByZWxhdGlvbi5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobW9kZWwuZ2V0KGtleSkubW9kZWxzLCAobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5mZXRjaCh7IGFsbDogb3B0aW9ucy5hbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzLmNhbGwodGhpcywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuZmV0Y2guY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIHRvSlNPTihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBfLmNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSBpbnN0YW5jZW9mIEJhY2tib25lLk1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IG9wdGlvbnMuYWxsID8gXy5waWNrKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSwgXCJpZFwiKSA6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXS50b0pTT04ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gaW5zdGFuY2VvZiBCYWNrYm9uZS5Db2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb252ZXJ0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdLmZvckVhY2goYXR0ciA9PiBjb252ZXJ0ZWQucHVzaChvcHRpb25zLmFsbCA/IF8ucGljayhhdHRyLCAnaWQnKSA6IGF0dHIudG9KU09OKG9wdGlvbnMpKSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IGNvbnZlcnRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChrZXkgPT09IG51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgYXR0cmlidXRlcztcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzID0ga2V5O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIChhdHRyaWJ1dGVzID0ge30pW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wdHMgPSBfLmV4dGVuZCh7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdGlvbnMpO1xuICAgICAgICB2YXIgcmVsYXRpb25zID0gXy5rZXlzKHRoaXMucmVsYXRpb25zKTtcbiAgICAgICAgXy5lYWNoKGF0dHJpYnV0ZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5jb250YWlucyhyZWxhdGlvbnMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHRoaXMucmVsYXRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubW9kZWwgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBuZXcgZGVmaW5pdGlvbi5tb2RlbCh2YWx1ZSwgb3B0cyksIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYXJyYXkgaXMgYSByZWFsIGFycmF5IChrZXkgPSBudW1iZXIpLCBpZiBpdCBpcyBpdCBtdXN0IGJlIGlkJ3MgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoa2V5KS5zZXQobmV3IGRlZmluaXRpb24uY29sbGVjdGlvbih2YWx1ZSwgb3B0cykpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5tb2RlbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbi5tb2RlbCkgfHwgZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmICEodmFsdWUgaW5zdGFuY2VvZiBkZWZpbml0aW9uLmNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCYWQgbW9kZWwgZGVmaW5pdGlvbjogJyArIHRoaXMuZ2V0KCdjbGFzc05hbWUnKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMuY29uY2F0KFsnZGF0ZSddKS5pbmNsdWRlcyhrZXkpICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNba2V5XSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuc2V0LmFwcGx5KHRoaXMsIFthdHRyaWJ1dGVzLCBvcHRpb25zXSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogRXh0ZW5kIHRoZSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQgbWV0aG9kLCB0byBhZGQgc29tZSB0cmVhdGVtZW50IG9uIGluc3RhbmNlIGNyZWF0aW9uXG4gKiBAcGFyYW0gIHtPYmplY3R9IG1vZGVsRGVmaW5pdGlvblxuICogQHJldHVybiB7ZnVuY3Rpb259IHRoZSBtb2RlbCBjb25zdHJ1Y3RvclxuICovXG5Nb2RlbC5leHRlbmQgPSBmdW5jdGlvbihtb2RlbERlZmluaXRpb24pIHtcbiAgICAvLyBTZXQgZGVmYXVsdHMgY29sbGVjdGlvbnMgZm9yIHJlbGF0aW9uc1xuICAgIHZhciBkZWZhdWx0UmVsYXRpb25zID0ge307XG4gICAgXy5lYWNoKG1vZGVsRGVmaW5pdGlvbi5yZWxhdGlvbnMsIChkZWZpbml0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBkZWZhdWx0UmVsYXRpb25zW2tleV0gPSBuZXcgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgIShtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYWQgZGVmYXVsdCB2YWx1ZSBmb3IgXCIgKyBrZXkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXy5leHRlbmQobW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzLCBkZWZhdWx0UmVsYXRpb25zKTtcbiAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwuZXh0ZW5kLmNhbGwodGhpcywgbW9kZWxEZWZpbml0aW9uKTtcbn07XG5cbi8qKlxuICogVGhlIENvbGxlY3Rpb25cbiAqIEB0eXBlIHtCYWNrYm9uZS5Db2xsZWN0aW9ufVxuICovXG5jb25zdCBDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIC8qIFVzZWQgdG8gaW5zdGFuY2lhdGUgYSBuZXcgTW9kZWwgZnJvbSBKc29uIChuZWVkIHRvIG92ZXJyaWRlIGlmIHN1YnR5cGVzKSovXG4gICAgbW9kZWw6IE1vZGVsXG59KTtcblxuLyoqXG4gKiBFeHBvcnRpbmcgdGhlIE1vZGVsIGFuZCB0aGUgQ29sbGVjdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgTW9kZWwsXG4gICAgQ29sbGVjdGlvblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL0VudGl0eS5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgIGNsYXNzTmFtZTogXCJjb250YWluZXItZmx1aWRcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGgzIGNsYXNzPVwibm90aWYgPCU9IGNsYXNzTmFtZSAlPlwiPjwlPSBtZXNzYWdlICU+PGEgY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L2E+PC9oMz5gKSxcbiAgICBpbml0aWFsaXplKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgJG5vdGlmID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbm90aWZpY2F0aW9uJylbMF07XG4gICAgICAgIGlmICghJG5vdGlmKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkbm90aWY7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IDMwMDA7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5jbG9zZSc6ICdjbG9zZSdcbiAgICB9LFxuICAgIGNsb3NlKGV2ZW50LCBjaGlsZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRub3RpZiA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlIDogZXZlbnQ7XG4gICAgICAgICRub3RpZi5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSgkbm90aWYpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHN0eWxlcyAmJiBzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uID8gcGFyc2VGbG9hdChzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uKSA6IDA7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJG5vdGlmICYmICRub3RpZi5wYXJlbnROb2RlKSAkbm90aWYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkbm90aWYpO1xuICAgICAgICB9LCBkdXJhdGlvbiAqIDEwMDApO1xuICAgIH0sXG4gICAgc3VjY2VzcyhtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwic3VjY2Vzc1wiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIGVycm9yKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJhbGVydFwiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIHdhcm4obWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcIndhcm5pbmdcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICBub3RpZnkobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICByZW5kZXIobm90aWYsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3cmFwcGVyLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoeyBjbGFzc05hbWU6IG5vdGlmLmNsYXNzTmFtZSwgbWVzc2FnZTogbm90aWYubWVzc2FnZSB9KTtcbiAgICAgICAgY29uc3QgJG5vdGlmID0gd3JhcHBlci5sYXN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoJG5vdGlmKTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBlcm1hbmVudCkgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2xvc2UoJG5vdGlmKTsgfSwgb3B0aW9ucy5kdXJhdGlvbiB8fCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvTm90aWZpY2F0aW9uVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgRm9ybVZpZXcgZnJvbSAnLi9Gb3JtVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcInBvcHVwXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cdFx0XHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cblx0XHRcdFx0XHRcdCAgXHQ8YSBjbGFzcz1cImNsb3NlXCI+JiMyMTU7PC9hPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHRcdDwlIHRlbXBsYXRlID8gcHJpbnQodGVtcGxhdGUpIDogcHJpbnQobWVzc2FnZSkgJT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cImFjdGlvbnNcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJva1wiPk9rPC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJjdXN0b21cIj48JT0gY3VzdG9tTmFtZSAlPjwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9saT5cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdCAgPC9kaXY+YCksXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgbGV0ICRwb3B1cCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcInBvcHVwXCIpO1xuICAgICAgICBpZiAoISRwb3B1cCkgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJHBvcHVwO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuY2xvc2UnOiAnb25DbG9zZScsXG4gICAgICAgICdjbGljayAuY2FuY2VsJzogJ29uQ2xvc2UnLFxuICAgICAgICAnY2xpY2sgLm9rJzogJ29uT2snLFxuICAgICAgICAnY2xpY2sgLmN1c3RvbSc6ICdvbkN1c3RvbSdcbiAgICB9LFxuICAgIHNldFBhcmFtKHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZTtcbiAgICAgICAgdGhpcy5vayA9IHBhcmFtcy5vaztcbiAgICAgICAgdGhpcy5jbG9zZSA9IHBhcmFtcy5jbG9zZTtcbiAgICAgICAgdGhpcy5jdXN0b20gPSBwYXJhbXMuY3VzdG9tO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLmNsYXNzKTtcbiAgICAgICAgdGhpcy5yZXNpemVPZmYgPSBwYXJhbXMucmVzaXplT2ZmO1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIGlmIChwYXJhbXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaXNmb3JtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgUG9wdXBGb3JtVmlldyA9IEZvcm1WaWV3LmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQocGFyYW1zID0ge30pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1WaWV3LnByb3RvdHlwZS5zdWJtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvcHVwRm9ybVZpZXcocGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnRlbXBsYXRlIGluc3RhbmNlb2YgQmFja2JvbmUuVmlldykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IHBhcmFtcy50ZW1wbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgJiYgdGhpcy52aWV3Lm9rKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9rID0gcGFyYW1zLm9rO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5vayA9ICgpID0+IHZpZXcudmlldy5vayhvayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9rID0gcGFyYW1zLm9rIHx8IHRoaXMub2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYXNpYyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZm9ybShvcHRpb25zID0ge30pIHtcbiAgICAgICAgb3B0aW9ucy5pc2Zvcm0gPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFBhcmFtKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZSkgdGhpcy5jbG9zZS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uT2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9rKSB0aGlzLm9rLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdmb3JtJyB8fCB0aGlzLnZpZXcuaXNWYWxpZCkgdGhpcy5jbG9zZVBvcHVwKCk7XG4gICAgfSxcbiAgICBvbkN1c3RvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tKSB0aGlzLmN1c3RvbS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHRoaXMudmlldy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSxcbiAgICBjYWxsYmFja0FyZ3MoKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLnZpZXcuY2hlY2soKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLnZpZXcuZ2V0VmFsdWVzKCkpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH0sXG4gICAgcmVuZGVyQWN0aW9ucyhzdGF0aWNBY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb2snKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vayA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NhbmNlbCcpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmNsb3NlID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3VzdG9tJylbMF0uc3R5bGUuZGlzcGxheSA9IHRoaXMuY3VzdG9tID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aW9ucycpWzBdLnN0eWxlLmRpc3BsYXkgPSAhdGhpcy5vayAmJiAhdGhpcy5jbG9zZSAmJiAhdGhpcy5jdXN0b20gPyAnJyA6ICdub25lJztcbiAgICAgICAgaWYgKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aW9ucycpWzBdLmNsYXNzTGlzdC5hZGQoXCJzdGF0aWNcIik7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJzdGF0aWMtYWN0aW9uc1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aW9ucycpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGF0aWNcIik7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGF0aWMtYWN0aW9uc1wiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyKGRhdGEgPSB7fSkge1xuICAgICAgICBkYXRhID0gXy5leHRlbmQoe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgICAgIGN1c3RvbU5hbWU6IFwiXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIlxuICAgICAgICB9LCBfLnBpY2soZGF0YSwgWydtZXNzYWdlJywgJ2N1c3RvbU5hbWUnLCAndGVtcGxhdGUnLCAnc3RhdGljQWN0aW9ucyddKSk7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKGRhdGEpO1xuICAgICAgICB0aGlzLnJlbmRlckFjdGlvbnMoZGF0YS5zdGF0aWNBY3Rpb25zKTtcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uaW5uZXJIVE1MID0gdGhpcy52aWV3LiRlbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWVzc2FnZSBwdWxzZVwiPjwlPSBtZXNzYWdlICU+PGRpdiBjbGFzcz1cImFuaW1cIj48L2Rpdj48L2Rpdj5gKSxcbiAgICB0YWdOYW1lOiBcIndhaXRcIixcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICBpZiAoJGJvZHkucXVlcnlTZWxlY3RvckFsbCgnd2FpdCcpLmxlbmd0aCA9PT0gMCkgJGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRib2R5LnF1ZXJ5U2VsZWN0b3IoJ3dhaXQnKTtcbiAgICB9LFxuICAgIHN0YXJ0KG1lc3NhZ2UsICRlbCkge1xuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICAgICRlbCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgJHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7IG1lc3NhZ2U6IG1lc3NhZ2UgfHwgJ2xvYWRpbmcuLi4nIH0pO1xuICAgICAgICBsZXQgJHBhcmVudCA9ICRlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3dhaXQtY29udGFpbmVyJyk7XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnaGlkZS1jaGlsZCcpO1xuICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgICBsZXQgJHdhaXQgPSBuZXcgRWxlbWVudChcIndhaXRcIik7XG4gICAgICAgICAgICAkd2FpdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgJHdhaXQuaW5zZXJ0QmVmb3JlKCR0ZW1wbGF0ZSwgJHdhaXQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAkcGFyZW50Lmluc2VydEJlZm9yZSgkd2FpdCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSAkdGVtcGxhdGU7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0b3A6IChjYWxsYmFjaykgPT4gdGhpcy5zdG9wKCRlbCwgY2FsbGJhY2spXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBzdG9wKCRlbCwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfLmlzRnVuY3Rpb24oJGVsKSA/ICRlbCA6IGNhbGxiYWNrO1xuICAgICAgICBsZXQgJHdhaXQgPSAkZWwgJiYgJGVsLnF1ZXJ5U2VsZWN0b3IoJ3dhaXQnKSB8fCB0aGlzLmVsO1xuICAgICAgICBsZXQgJHBhcmVudCA9ICRlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICBsZXQgZWxlbWVudHMgPSAkd2FpdC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZCwgLm1lc3NhZ2UnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgncHVsc2UnKTtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1jaGlsZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnd2FpdC1jb250YWluZXInKTtcbiAgICAgICAgICAgICR3YWl0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICR3YWl0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAoJGVsKSAkd2FpdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCR3YWl0KTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL1dhaXRWaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBXYWl0VmlldyBmcm9tICcuL3ZpZXdzL1dhaXRWaWV3JztcbmltcG9ydCBQb3B1cFZpZXcgZnJvbSAnLi92aWV3cy9Qb3B1cFZpZXcnO1xuaW1wb3J0IE5vdGlmaWNhdGlvblZpZXcgZnJvbSAnLi92aWV3cy9Ob3RpZmljYXRpb25WaWV3JztcbmltcG9ydCBGb3JtVmlldyBmcm9tICcuL3ZpZXdzL0Zvcm1WaWV3JztcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9tb2RlbHMvRW50aXR5JztcblxuLy8gQWRkIHRva2VuIGluIFJFU1QgcmVxdWVzdFxuY29uc3QgdXNlSnd0ID0gKG9wdGlvbnMgPSB7IHRva2VuKCkge30sIG9uVW5hdXRob3JpemVkKCkge30gfSkgPT4ge1xuICAgIGNvbnN0IHN5bmMgPSBCYWNrYm9uZS5zeW5jO1xuICAgIEJhY2tib25lLnN5bmMgPSAobWV0aG9kLCBtb2RlbCwgb3B0cykgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IG9wdGlvbnMudG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuKSBvcHRzLmJlZm9yZVNlbmQgPSAoeGhyKSA9PiB7IHhoci5zZXRSZXF1ZXN0SGVhZGVyKG9wdGlvbnMuaGVhZGVyIHx8ICdhdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pOyB9O1xuICAgICAgICBsZXQgZXJyID0gb3B0cy5lcnJvcjtcbiAgICAgICAgb3B0cy5lcnJvciA9IChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtLnN0YXR1cyAmJiBwYXJhbS5zdGF0dXMgPT09IDQwMSkgb3B0aW9ucy5vblVuYXV0aG9yaXplZCgpO1xuICAgICAgICAgICAgZXJyKHBhcmFtKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3luYyhtZXRob2QsIG1vZGVsLCBvcHRzKTtcbiAgICB9O1xufTtcblxuY29uc3Qgdmlld1V0aWxzID0ge1xuICAgIHRhYmxlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUoYDx0YWJsZSBjbGFzcz1cInt7IGNsYXNzTmFtZSB9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInt7IGNvbHVtbi5jbGFzcyB9fVwiPnt7IGNvbHVtbi5oZWFkZXIgfHwgY29sdW1uLnByb3BlcnR5IH19PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGRhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyeSl7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyBjb2x1bW4udHJhbnNmb3JtID8gY29sdW1uLnRyYW5zZm9ybShlbnRyeVtjb2x1bW4ucHJvcGVydHldKSA6IGVudHJ5W2NvbHVtbi5wcm9wZXJ0eV0gfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5gKShfLmRlZmF1bHRzKG9wdGlvbnMsIHsgY2xhc3NOYW1lOiBcIlwiLCBkYXRhOiBbXSwgY29sdW1uczoge30gfSkpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBOb3RpZmljYXRpb25WaWV3LFxuICAgIFBvcHVwVmlldyxcbiAgICBGb3JtVmlldyxcbiAgICBXYWl0VmlldyxcbiAgICB2aWV3VXRpbHMsXG4gICAgRW50aXR5LFxuICAgIHVzZUp3dFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGl6aS1iYWNrYm9uZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=