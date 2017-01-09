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
        if (this.template) this.$el.html(this.template);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNzNlZjk4MWJkM2M2MmZmYWI5YSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiQmFja2JvbmUiLCJWaWV3IiwiZXh0ZW5kIiwidGFnTmFtZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZXJyb3JDbGFzcyIsInZhbGlkYXRlIiwicGFyYW1zIiwiXyIsInR5cGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY2FjaGUiLCJvbWl0IiwidGVtcGxhdGUiLCJldmVudHMiLCJpbnB1dEVycm9yIiwibmFtZSIsImVycm9yIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwiZ2V0VmFsdWVzIiwiJGVsIiwic2VyaWFsaXplQXJyYXkiLCJnZXRPYmplY3QiLCJvYmplY3QiLCJlYWNoIiwiYXR0cmlidXRlIiwidmFsdWUiLCJjaGVjayIsInZhbGlkIiwicnVsZSIsImxlbmd0aCIsIm1hdGNoIiwicmVnZXgiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInB1c2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlIiwicmVtb3ZlIiwiJG5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc1ZhbGlkIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsInRvVXBwZXJDYXNlIiwiZGF0YSIsIkZvcm1EYXRhIiwiJCIsImFqYXgiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJyZW5kZXIiLCJodG1sIiwiTW9kZWwiLCJkYXRlcyIsImF0dHJzIiwicGljayIsImNvbmNhdCIsImRhdGUiLCJEYXRlIiwic2F2ZSIsInBhcnNlIiwiYWxsIiwic3VjY2VzcyIsIm1vZGVsIiwicmVzcCIsIm9wdHMiLCJyZWxhdGlvbnMiLCJyZWxhdGlvbiIsImtleSIsImNvbGxlY3Rpb24iLCJnZXQiLCJtb2RlbHMiLCJjYWxsIiwicHJvdG90eXBlIiwiZmV0Y2giLCJ0b0pTT04iLCJhdHRyaWJ1dGVzIiwiY2xvbmUiLCJoYXNPd25Qcm9wZXJ0eSIsIkNvbGxlY3Rpb24iLCJjb252ZXJ0ZWQiLCJmb3JFYWNoIiwiYXR0ciIsInNldCIsInZhbCIsImtleXMiLCJkZWZpbml0aW9uIiwiT2JqZWN0IiwiQXJyYXkiLCJjb25zb2xlIiwibG9nIiwiaW5jbHVkZXMiLCJhcHBseSIsIm1vZGVsRGVmaW5pdGlvbiIsImRlZmF1bHRSZWxhdGlvbnMiLCJkZWZhdWx0cyIsIiRub3RpZiIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkdXJhdGlvbiIsImNsb3NlIiwiZXZlbnQiLCJjaGlsZEV2ZW50IiwidGFyZ2V0Iiwic3R5bGUiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic2V0VGltZW91dCIsIndhcm4iLCJub3RpZnkiLCJub3RpZiIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibGFzdENoaWxkIiwicGVybWFuZW50IiwiJHBvcHVwIiwicXVlcnlTZWxlY3RvciIsInNldFBhcmFtIiwib2siLCJjdXN0b20iLCJhZGQiLCJjbGFzcyIsInJlc2l6ZU9mZiIsInZpZXciLCJpc2Zvcm0iLCJQb3B1cEZvcm1WaWV3IiwiRm9ybVZpZXciLCJhcmd1bWVudHMiLCJjbG9zZVBvcHVwIiwiYmFzaWMiLCJmb3JtIiwib25DbG9zZSIsImNhbGxiYWNrQXJncyIsIm9uT2siLCJvbkN1c3RvbSIsImRpc3BsYXkiLCJhcmdzIiwicmVuZGVyQWN0aW9ucyIsInN0YXRpY0FjdGlvbnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY3VzdG9tTmFtZSIsImRlbGVnYXRlRXZlbnRzIiwiJGJvZHkiLCJzdGFydCIsIkVsZW1lbnQiLCIkdGVtcGxhdGUiLCIkcGFyZW50IiwiJHdhaXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwicGFyZW50Iiwic3RvcCIsImNhbGxiYWNrIiwiaXNGdW5jdGlvbiIsImVsZW1lbnRzIiwiaSIsIm9wYWNpdHkiLCJ1c2VKd3QiLCJ0b2tlbiIsIm9uVW5hdXRob3JpemVkIiwic3luYyIsIm1ldGhvZCIsImJlZm9yZVNlbmQiLCJ4aHIiLCJoZWFkZXIiLCJlcnIiLCJwYXJhbSIsInN0YXR1cyIsInZpZXdVdGlscyIsInRhYmxlIiwiY29sdW1ucyIsIk5vdGlmaWNhdGlvblZpZXciLCJQb3B1cFZpZXciLCJXYWl0VmlldyIsIkVudGl0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMs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RUFBZ0JFLElBQWhCLEVBQXlCO0FBQ3JDLFlBQU11RyxRQUFROUssUUFBUThLLEtBQVIsRUFBZDtBQUNBLFlBQUlBLEtBQUosRUFBV3ZHLEtBQUsyRyxVQUFMLEdBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUFFQSxnQkFBSTdILGdCQUFKLENBQXFCdEQsUUFBUW9MLE1BQVIsSUFBa0IsZUFBdkMsRUFBd0QsWUFBWU4sS0FBcEU7QUFBNkUsU0FBMUc7QUFDWCxZQUFJTyxNQUFNOUcsS0FBS3pELEtBQWY7QUFDQXlELGFBQUt6RCxLQUFMLEdBQWEsVUFBQ3dLLEtBQUQsRUFBVztBQUNwQixnQkFBSUEsTUFBTUMsTUFBTixJQUFnQkQsTUFBTUMsTUFBTixLQUFpQixHQUFyQyxFQUEwQ3ZMLFFBQVErSyxjQUFSO0FBQzFDTSxnQkFBSUMsS0FBSjtBQUNILFNBSEQ7QUFJQU4sYUFBS0MsTUFBTCxFQUFhNUcsS0FBYixFQUFvQkUsSUFBcEI7QUFDSCxLQVREO0FBVUgsQ0FaRDs7QUFjQSxJQUFNaUgsWUFBWTtBQUNkQyxTQURjLGlCQUNSekwsT0FEUSxFQUNDO0FBQ1gsZUFBT0ksRUFBRU0sUUFBRixna0NBaUJ3Qk4sRUFBRWlHLFFBQUYsQ0FBV3JHLE9BQVgsRUFBb0IsRUFBRWlCLFdBQVcsRUFBYixFQUFpQjZCLE1BQU0sRUFBdkIsRUFBMkI0SSxTQUFTLEVBQXBDLEVBQXBCLENBakJ4QixDQUFQO0FBa0JIO0FBcEJhLENBQWxCOztBQXVCQSxrREFBZTtBQUNYQyxzQkFBQSx3RUFEVztBQUVYQyxlQUFBLGlFQUZXO0FBR1g5QyxjQUFBLGdFQUhXO0FBSVgrQyxjQUFBLGdFQUpXO0FBS1hMLHdCQUxXO0FBTVhNLFlBQUEsK0RBTlc7QUFPWGpCO0FBUFcsQ0FBZixDIiwiZmlsZSI6InBpemktYmFja2JvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWNrYm9uZVwiKSwgcmVxdWlyZShcInVuZGVyc2NvcmVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJwaXppLWJhY2tib25lXCIsIFtcImJhY2tib25lXCIsIFwidW5kZXJzY29yZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFja2JvbmVcIiksIHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwaXppLWJhY2tib25lXCJdID0gZmFjdG9yeShyb290W1wiYmFja2JvbmVcIl0sIHJvb3RbXCJ1bmRlcnNjb3JlXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNzNlZjk4MWJkM2M2MmZmYWI5YSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFja2JvbmVcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5kZXJzY29yZVwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcImZvcm1cIixcbiAgICBpbml0aWFsaXplKG9wdGlvbnMgPSB7IGVycm9yQ2xhc3M6ICdlcnJvcicsIHZhbGlkYXRlOiBbXSB9KSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gXy5leHRlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0sIF8ub21pdChvcHRpb25zLCBbJ3RlbXBsYXRlJywgJ3ZhbGlkYXRlJywgJ2Vycm9yQ2xhc3MnXSkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IG9wdGlvbnMudmFsaWRhdGU7XG4gICAgICAgIHRoaXMuZXJyb3JDbGFzcyA9IG9wdGlvbnMuZXJyb3JDbGFzcztcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLnN1Ym1pdCc6ICdzdWJtaXQnXG4gICAgfSxcbiAgICBpbnB1dEVycm9yKG5hbWUsIGVycm9yKSB7XG4gICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbbmFtZT1cIiR7bmFtZX1cIl1gKS5jbGFzc05hbWUgKz0gKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgfSxcbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5zZXJpYWxpemVBcnJheSgpO1xuICAgIH0sXG4gICAgZ2V0T2JqZWN0KCkge1xuICAgICAgICBsZXQgb2JqZWN0ID0ge307XG4gICAgICAgIF8uZWFjaCh0aGlzLmdldFZhbHVlcygpLCAoYXR0cmlidXRlKSA9PiBvYmplY3RbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9LFxuICAgIGNoZWNrKCkge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgaW4gdGhpcy52YWxpZGF0ZSkge1xuICAgICAgICAgICAgbGV0IGVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcqW25hbWU9XCInICsgcnVsZS5uYW1lICsgJ1wiXScpO1xuICAgICAgICAgICAgaWYgKGVsLmxlbmd0aCAmJiAhZWxbMF0udmFsdWUubWF0Y2gocnVsZS5yZWdleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmVycm9yQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5wdXNoKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCAnPHNtYWxsIGNsYXNzPVwiJyArIHRoaXMuZXJyb3JDbGFzcyArICdcIj4nICsgcnVsZS5tZXNzYWdlICsgJzwvc21hbGw+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lcnJvckNsYXNzKTtcbiAgICAgICAgICAgICAgICBsZXQgJG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKCRuZXh0LnRhZ05hbWUgPT09IFwic21hbGxcIikgJG5leHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gdmFsaWQ7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9LFxuICAgIHN1Ym1pdChwYXJhbXMgPSB7fSkge1xuICAgICAgICBwYXJhbXMgPSAhcGFyYW1zLmN1cnJlbnRUYXJnZXQgPyBfLmV4dGVuZCh0aGlzLnBhcmFtcywgcGFyYW1zKSA6IHRoaXMucGFyYW1zO1xuICAgICAgICBpZiAocGFyYW1zLnR5cGUudG9VcHBlckNhc2UoKSAhPT0gJ0dFVCcpIHBhcmFtcy5kYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZWwpO1xuICAgICAgICAkLmFqYXgocGFyYW1zKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKHBhcmFtcy50eXBlLCBwYXJhbXMudXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIHJlcXVlc3Quc2VuZChwYXJhbXMuZGF0YSk7XG4gICAgfSxcbiAgICByZW5kZXIob3B0aW9ucyA9IHt9KSB7IGlmICh0aGlzLnRlbXBsYXRlKSB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUpOyB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCIvKmpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5cbmNvbnN0IE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgICBkYXRlczogW10sXG4gICAgdmFsaWRhdGUoYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRhdGVzID0gXy5waWNrKGF0dHJzLCB0aGlzLmRhdGVzLmNvbmNhdChbJ2RhdGUnXSkpO1xuICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGVzKSB7XG4gICAgICAgICAgICBpZiAoZGF0ZXNbZGF0ZV0gJiYgIShkYXRlc1tkYXRlXSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNhdmUoYXR0cnMsIG9wdGlvbnMgPSB7IHBhcnNlOiBmYWxzZSB9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSAobW9kZWwsIHJlc3AsIG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5yZWxhdGlvbnMsIChyZWxhdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsLmdldChrZXkpIGluc3RhbmNlb2YgcmVsYXRpb24uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG1vZGVsLmdldChrZXkpLm1vZGVscywgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2F2ZShudWxsLCB7IGFsbDogb3B0aW9ucy5hbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzLmNhbGwodGhpcywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcm94eSB0aGUgY2FsbCB0byB0aGUgb3JpZ2luYWwgc2F2ZSBmdW5jdGlvblxuICAgICAgICBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuc2F2ZS5jYWxsKHRoaXMsIGF0dHJzLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIGZldGNoKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbGwpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzID0gKG1vZGVsLCByZXNwLCBvcHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMucmVsYXRpb25zLCAocmVsYXRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbC5nZXQoa2V5KSBpbnN0YW5jZW9mIHJlbGF0aW9uLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChtb2RlbC5nZXQoa2V5KS5tb2RlbHMsIChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmZldGNoKHsgYWxsOiBvcHRpb25zLmFsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MuY2FsbCh0aGlzLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5mZXRjaC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgdG9KU09OKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IF8uY2xvbmUodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdIGluc3RhbmNlb2YgQmFja2JvbmUuTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gb3B0aW9ucy5hbGwgPyBfLnBpY2soYXR0cmlidXRlc1thdHRyaWJ1dGVdLCBcImlkXCIpIDogYXR0cmlidXRlc1thdHRyaWJ1dGVdLnRvSlNPTihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSBpbnN0YW5jZW9mIEJhY2tib25lLkNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnZlcnRlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uZm9yRWFjaChhdHRyID0+IGNvbnZlcnRlZC5wdXNoKG9wdGlvbnMuYWxsID8gXy5waWNrKGF0dHIsICdpZCcpIDogYXR0ci50b0pTT04ob3B0aW9ucykpKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gY29udmVydGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzO1xuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBrZXk7XG4gICAgICAgICAgICBvcHRpb25zID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF0dHJpYnV0ZXMgPSB7fSlba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3B0cyA9IF8uZXh0ZW5kKHsgdmFsaWRhdGU6IHRydWUgfSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciByZWxhdGlvbnMgPSBfLmtleXModGhpcy5yZWxhdGlvbnMpO1xuICAgICAgICBfLmVhY2goYXR0cmlidXRlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChfLmNvbnRhaW5zKHJlbGF0aW9ucywga2V5KSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWZpbml0aW9uID0gdGhpcy5yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5tb2RlbCAmJiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ldyBkZWZpbml0aW9uLm1vZGVsKHZhbHVlLCBvcHRzKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhcnJheSBpcyBhIHJlYWwgYXJyYXkgKGtleSA9IG51bWJlciksIGlmIGl0IGlzIGl0IG11c3QgYmUgaWQncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldChrZXkpLnNldChuZXcgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKHZhbHVlLCBvcHRzKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLm1vZGVsICYmICEodmFsdWUgaW5zdGFuY2VvZiBkZWZpbml0aW9uLm1vZGVsKSB8fCBkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgISh2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb24uY29sbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JhZCBtb2RlbCBkZWZpbml0aW9uOiAnICsgdGhpcy5nZXQoJ2NsYXNzTmFtZScpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5jb25jYXQoWydkYXRlJ10pLmluY2x1ZGVzKGtleSkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlc1trZXldID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5zZXQuYXBwbHkodGhpcywgW2F0dHJpYnV0ZXMsIG9wdGlvbnNdKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBFeHRlbmQgdGhlIEJhY2tib25lLk1vZGVsLmV4dGVuZCBtZXRob2QsIHRvIGFkZCBzb21lIHRyZWF0ZW1lbnQgb24gaW5zdGFuY2UgY3JlYXRpb25cbiAqIEBwYXJhbSAge09iamVjdH0gbW9kZWxEZWZpbml0aW9uXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIG1vZGVsIGNvbnN0cnVjdG9yXG4gKi9cbk1vZGVsLmV4dGVuZCA9IGZ1bmN0aW9uKG1vZGVsRGVmaW5pdGlvbikge1xuICAgIC8vIFNldCBkZWZhdWx0cyBjb2xsZWN0aW9ucyBmb3IgcmVsYXRpb25zXG4gICAgdmFyIGRlZmF1bHRSZWxhdGlvbnMgPSB7fTtcbiAgICBfLmVhY2gobW9kZWxEZWZpbml0aW9uLnJlbGF0aW9ucywgKGRlZmluaXRpb24sIGtleSkgPT4ge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGRlZmF1bHRSZWxhdGlvbnNba2V5XSA9IG5ldyBkZWZpbml0aW9uLmNvbGxlY3Rpb24obW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiAhKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCBkZWZhdWx0IHZhbHVlIGZvciBcIiArIGtleSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBfLmV4dGVuZChtb2RlbERlZmluaXRpb24uZGVmYXVsdHMsIGRlZmF1bHRSZWxhdGlvbnMpO1xuICAgIHJldHVybiBCYWNrYm9uZS5Nb2RlbC5leHRlbmQuY2FsbCh0aGlzLCBtb2RlbERlZmluaXRpb24pO1xufTtcblxuLyoqXG4gKiBUaGUgQ29sbGVjdGlvblxuICogQHR5cGUge0JhY2tib25lLkNvbGxlY3Rpb259XG4gKi9cbmNvbnN0IENvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgLyogVXNlZCB0byBpbnN0YW5jaWF0ZSBhIG5ldyBNb2RlbCBmcm9tIEpzb24gKG5lZWQgdG8gb3ZlcnJpZGUgaWYgc3VidHlwZXMpKi9cbiAgICBtb2RlbDogTW9kZWxcbn0pO1xuXG4vKipcbiAqIEV4cG9ydGluZyB0aGUgTW9kZWwgYW5kIHRoZSBDb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBNb2RlbCxcbiAgICBDb2xsZWN0aW9uXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvRW50aXR5LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwibm90aWZpY2F0aW9uXCIsXG4gICAgY2xhc3NOYW1lOiBcImNvbnRhaW5lci1mbHVpZFwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8aDMgY2xhc3M9XCJub3RpZiA8JT0gY2xhc3NOYW1lICU+XCI+PCU9IG1lc3NhZ2UgJT48YSBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvYT48L2gzPmApLFxuICAgIGluaXRpYWxpemUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCAkbm90aWYgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RpZmljYXRpb24nKVswXTtcbiAgICAgICAgaWYgKCEkbm90aWYpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRub3RpZjtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMzAwMDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgdGhpcy50ZW1wbGF0ZTtcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLmNsb3NlJzogJ2Nsb3NlJ1xuICAgIH0sXG4gICAgY2xvc2UoZXZlbnQsIGNoaWxkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgJG5vdGlmID0gZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUgOiBldmVudDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLmhlaWdodCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIGxldCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKCRub3RpZik7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gc3R5bGVzICYmIHN0eWxlcy50cmFuc2l0aW9uRHVyYXRpb24gPyBwYXJzZUZsb2F0KHN0eWxlcy50cmFuc2l0aW9uRHVyYXRpb24pIDogMDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkbm90aWYgJiYgJG5vdGlmLnBhcmVudE5vZGUpICRub3RpZi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRub3RpZik7XG4gICAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJzdWNjZXNzXCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgZXJyb3IobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcImFsZXJ0XCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgd2FybihtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwid2FybmluZ1wiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIG5vdGlmeShtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIHJlbmRlcihub3RpZiwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZSh7IGNsYXNzTmFtZTogbm90aWYuY2xhc3NOYW1lLCBtZXNzYWdlOiBub3RpZi5tZXNzYWdlIH0pO1xuICAgICAgICBjb25zdCAkbm90aWYgPSB3cmFwcGVyLmxhc3RDaGlsZDtcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCgkbm90aWYpO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGVybWFuZW50KSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5jbG9zZSgkbm90aWYpOyB9LCBvcHRpb25zLmR1cmF0aW9uIHx8IHRoaXMuZHVyYXRpb24pO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Ob3RpZmljYXRpb25WaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBGb3JtVmlldyBmcm9tICcuL0Zvcm1WaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwicG9wdXBcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIj48L2Rpdj5cblx0XHRcdFx0XHRcdCAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0ICBcdDxhIGNsYXNzPVwiY2xvc2VcIj4mIzIxNTs8L2E+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdFx0PCUgdGVtcGxhdGUgPyBwcmludCh0ZW1wbGF0ZSkgOiBwcmludChtZXNzYWdlKSAlPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwiYWN0aW9uc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm9rXCI+T2s8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImN1c3RvbVwiPjwlPSBjdXN0b21OYW1lICU+PC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJjYW5jZWxcIj5DYW5jZWw8L2xpPlxuXHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0ICA8L2Rpdj5gKSxcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBsZXQgJHBvcHVwID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwicG9wdXBcIik7XG4gICAgICAgIGlmICghJHBvcHVwKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkcG9wdXA7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5jbG9zZSc6ICdvbkNsb3NlJyxcbiAgICAgICAgJ2NsaWNrIC5jYW5jZWwnOiAnb25DbG9zZScsXG4gICAgICAgICdjbGljayAub2snOiAnb25PaycsXG4gICAgICAgICdjbGljayAuY3VzdG9tJzogJ29uQ3VzdG9tJ1xuICAgIH0sXG4gICAgc2V0UGFyYW0ocGFyYW1zKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlO1xuICAgICAgICB0aGlzLm9rID0gcGFyYW1zLm9rO1xuICAgICAgICB0aGlzLmNsb3NlID0gcGFyYW1zLmNsb3NlO1xuICAgICAgICB0aGlzLmN1c3RvbSA9IHBhcmFtcy5jdXN0b207XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChwYXJhbXMuY2xhc3MpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9mZiA9IHBhcmFtcy5yZXNpemVPZmY7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgaWYgKHBhcmFtcy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5pc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCBQb3B1cEZvcm1WaWV3ID0gRm9ybVZpZXcuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1WaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdChwYXJhbXMgPSB7fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybVZpZXcucHJvdG90eXBlLnN1Ym1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5jbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9wdXBGb3JtVmlldyhwYXJhbXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMudGVtcGxhdGUgaW5zdGFuY2VvZiBCYWNrYm9uZS5WaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gcGFyYW1zLnRlbXBsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlldyAmJiB0aGlzLnZpZXcub2spIHtcbiAgICAgICAgICAgICAgICB2YXIgb2sgPSBwYXJhbXMub2s7XG4gICAgICAgICAgICAgICAgcGFyYW1zLm9rID0gKCkgPT4gdmlldy52aWV3Lm9rKG9rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub2sgPSBwYXJhbXMub2sgfHwgdGhpcy5vaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJhc2ljKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBmb3JtKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmlzZm9ybSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0UGFyYW0ob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlKSB0aGlzLmNsb3NlLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgb25PaygpIHtcbiAgICAgICAgaWYgKHRoaXMub2spIHRoaXMub2suYXBwbHkodGhpcywgW3RoaXMuY2FsbGJhY2tBcmdzKCldKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2Zvcm0nIHx8IHRoaXMudmlldy5pc1ZhbGlkKSB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uQ3VzdG9tKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b20pIHRoaXMuY3VzdG9tLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykgdGhpcy52aWV3LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9LFxuICAgIGNhbGxiYWNrQXJncygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Zvcm0nKSB7XG4gICAgICAgICAgICB2YWxpZCA9IHRoaXMudmlldy5jaGVjaygpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMudmlldy5nZXRWYWx1ZXMoKSk7XG4gICAgICAgICAgICBhcmdzLnB1c2godmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgfSxcbiAgICByZW5kZXJBY3Rpb25zKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvaycpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9rID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2FuY2VsJylbMF0uc3R5bGUuZGlzcGxheSA9IHRoaXMuY2xvc2UgPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXN0b20nKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5jdXN0b20gPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uc3R5bGUuZGlzcGxheSA9ICF0aGlzLm9rICYmICF0aGlzLmNsb3NlICYmICF0aGlzLmN1c3RvbSA/ICcnIDogJ25vbmUnO1xuICAgICAgICBpZiAoc3RhdGljQWN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uY2xhc3NMaXN0LmFkZChcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcInN0YXRpYy1hY3Rpb25zXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3Rpb25zJylbMF0uY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpYy1hY3Rpb25zXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXIoZGF0YSA9IHt9KSB7XG4gICAgICAgIGRhdGEgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgY3VzdG9tTmFtZTogXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgIH0sIF8ucGljayhkYXRhLCBbJ21lc3NhZ2UnLCAnY3VzdG9tTmFtZScsICd0ZW1wbGF0ZScsICdzdGF0aWNBY3Rpb25zJ10pKTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoZGF0YSk7XG4gICAgICAgIHRoaXMucmVuZGVyQWN0aW9ucyhkYXRhLnN0YXRpY0FjdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5pbm5lckhUTUwgPSB0aGlzLnZpZXcuJGVsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvUG9wdXBWaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJtZXNzYWdlIHB1bHNlXCI+PCU9IG1lc3NhZ2UgJT48ZGl2IGNsYXNzPVwiYW5pbVwiPjwvZGl2PjwvZGl2PmApLFxuICAgIHRhZ05hbWU6IFwid2FpdFwiLFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGlmICgkYm9keS5xdWVyeVNlbGVjdG9yQWxsKCd3YWl0JykubGVuZ3RoID09PSAwKSAkYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJGJvZHkucXVlcnlTZWxlY3Rvcignd2FpdCcpO1xuICAgIH0sXG4gICAgc3RhcnQobWVzc2FnZSwgJGVsKSB7XG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgJGVsID0gbWVzc2FnZTtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHsgbWVzc2FnZTogbWVzc2FnZSB8fCAnbG9hZGluZy4uLicgfSk7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnd2FpdC1jb250YWluZXInKTtcbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QuYWRkKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAgIGxldCAkd2FpdCA9IG5ldyBFbGVtZW50KFwid2FpdFwiKTtcbiAgICAgICAgICAgICR3YWl0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAkd2FpdC5pbnNlcnRCZWZvcmUoJHRlbXBsYXRlLCAkd2FpdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICRwYXJlbnQuaW5zZXJ0QmVmb3JlKCR3YWl0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICR0ZW1wbGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RvcDogKGNhbGxiYWNrKSA9PiB0aGlzLnN0b3AoJGVsLCBjYWxsYmFjaylcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHN0b3AoJGVsLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF8uaXNGdW5jdGlvbigkZWwpID8gJGVsIDogY2FsbGJhY2s7XG4gICAgICAgIGxldCAkd2FpdCA9ICRlbCAmJiAkZWwucXVlcnlTZWxlY3Rvcignd2FpdCcpIHx8IHRoaXMuZWw7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGxldCBlbGVtZW50cyA9ICR3YWl0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLCAubWVzc2FnZScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdwdWxzZScpO1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd3YWl0LWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgJHdhaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgJHdhaXQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGlmICgkZWwpICR3YWl0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHdhaXQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IFdhaXRWaWV3IGZyb20gJy4vdmlld3MvV2FpdFZpZXcnO1xuaW1wb3J0IFBvcHVwVmlldyBmcm9tICcuL3ZpZXdzL1BvcHVwVmlldyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uVmlldyBmcm9tICcuL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcnO1xuaW1wb3J0IEZvcm1WaWV3IGZyb20gJy4vdmlld3MvRm9ybVZpZXcnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL21vZGVscy9FbnRpdHknO1xuXG4vLyBBZGQgdG9rZW4gaW4gUkVTVCByZXF1ZXN0XG5jb25zdCB1c2VKd3QgPSAob3B0aW9ucyA9IHsgdG9rZW4oKSB7fSwgb25VbmF1dGhvcml6ZWQoKSB7fSB9KSA9PiB7XG4gICAgY29uc3Qgc3luYyA9IEJhY2tib25lLnN5bmM7XG4gICAgQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gb3B0aW9ucy50b2tlbigpO1xuICAgICAgICBpZiAodG9rZW4pIG9wdHMuYmVmb3JlU2VuZCA9ICh4aHIpID0+IHsgeGhyLnNldFJlcXVlc3RIZWFkZXIob3B0aW9ucy5oZWFkZXIgfHwgJ2F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7IH07XG4gICAgICAgIGxldCBlcnIgPSBvcHRzLmVycm9yO1xuICAgICAgICBvcHRzLmVycm9yID0gKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW0uc3RhdHVzICYmIHBhcmFtLnN0YXR1cyA9PT0gNDAxKSBvcHRpb25zLm9uVW5hdXRob3JpemVkKCk7XG4gICAgICAgICAgICBlcnIocGFyYW0pO1xuICAgICAgICB9O1xuICAgICAgICBzeW5jKG1ldGhvZCwgbW9kZWwsIG9wdHMpO1xuICAgIH07XG59O1xuXG5jb25zdCB2aWV3VXRpbHMgPSB7XG4gICAgdGFibGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZShgPHRhYmxlIGNsYXNzPVwie3sgY2xhc3NOYW1lIH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwie3sgY29sdW1uLmNsYXNzIH19XCI+e3sgY29sdW1uLmhlYWRlciB8fCBjb2x1bW4ucHJvcGVydHkgfX08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4peyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGNvbHVtbi50cmFuc2Zvcm0gPyBjb2x1bW4udHJhbnNmb3JtKGVudHJ5W2NvbHVtbi5wcm9wZXJ0eV0pIDogZW50cnlbY29sdW1uLnByb3BlcnR5XSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPmApKF8uZGVmYXVsdHMob3B0aW9ucywgeyBjbGFzc05hbWU6IFwiXCIsIGRhdGE6IFtdLCBjb2x1bW5zOiB7fSB9KSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIE5vdGlmaWNhdGlvblZpZXcsXG4gICAgUG9wdXBWaWV3LFxuICAgIEZvcm1WaWV3LFxuICAgIFdhaXRWaWV3LFxuICAgIHZpZXdVdGlscyxcbiAgICBFbnRpdHksXG4gICAgdXNlSnd0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9waXppLWJhY2tib25lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==