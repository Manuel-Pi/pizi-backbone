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
        this.remove();
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
        this.el.getElementsByClassName('.cancel')[0].style.display = this.close ? '' : 'none';
        this.el.getElementsByClassName('.custom')[0].style.display = this.custom ? '' : 'none';
        this.el.getElementsByClassName('.actions')[0].style.display = !this.ok && !this.close && !this.custom ? '' : 'none';
        if (staticActions) {
            this.el.getElementsByClassName('.actions').classList.add("static");
            this.el.classList.add("static-actions");
        } else {
            this.el.getElementsByClassName('.actions').classList.remove("static");
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
            this.el.getElementsByClassName('.content')[0].innerHTML = this.view.$el;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZjU5OTViNDNhNGViMzE4Mzg5ZSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiQmFja2JvbmUiLCJWaWV3IiwiZXh0ZW5kIiwidGFnTmFtZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZXJyb3JDbGFzcyIsInZhbGlkYXRlIiwicGFyYW1zIiwiXyIsInR5cGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY2FjaGUiLCJvbWl0IiwidGVtcGxhdGUiLCJldmVudHMiLCJpbnB1dEVycm9yIiwibmFtZSIsImVycm9yIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwiZ2V0VmFsdWVzIiwiJGVsIiwic2VyaWFsaXplQXJyYXkiLCJnZXRPYmplY3QiLCJvYmplY3QiLCJlYWNoIiwiYXR0cmlidXRlIiwidmFsdWUiLCJjaGVjayIsInZhbGlkIiwicnVsZSIsImxlbmd0aCIsIm1hdGNoIiwicmVnZXgiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInB1c2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlIiwicmVtb3ZlIiwiJG5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc1ZhbGlkIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsInRvVXBwZXJDYXNlIiwiZGF0YSIsIkZvcm1EYXRhIiwiJCIsImFqYXgiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJyZW5kZXIiLCJodG1sIiwiTW9kZWwiLCJkYXRlcyIsImF0dHJzIiwicGljayIsImNvbmNhdCIsImRhdGUiLCJEYXRlIiwic2F2ZSIsInBhcnNlIiwiYWxsIiwic3VjY2VzcyIsIm1vZGVsIiwicmVzcCIsIm9wdHMiLCJyZWxhdGlvbnMiLCJyZWxhdGlvbiIsImtleSIsImNvbGxlY3Rpb24iLCJnZXQiLCJtb2RlbHMiLCJjYWxsIiwicHJvdG90eXBlIiwiZmV0Y2giLCJ0b0pTT04iLCJhdHRyaWJ1dGVzIiwiY2xvbmUiLCJoYXNPd25Qcm9wZXJ0eSIsIkNvbGxlY3Rpb24iLCJjb252ZXJ0ZWQiLCJmb3JFYWNoIiwiYXR0ciIsInNldCIsInZhbCIsImtleXMiLCJkZWZpbml0aW9uIiwiT2JqZWN0IiwiQXJyYXkiLCJjb25zb2xlIiwibG9nIiwiaW5jbHVkZXMiLCJhcHBseSIsIm1vZGVsRGVmaW5pdGlvbiIsImRlZmF1bHRSZWxhdGlvbnMiLCJkZWZhdWx0cyIsIiRub3RpZiIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkdXJhdGlvbiIsImNsb3NlIiwiZXZlbnQiLCJjaGlsZEV2ZW50IiwidGFyZ2V0Iiwic3R5bGUiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic2V0VGltZW91dCIsIndhcm4iLCJub3RpZnkiLCJub3RpZiIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibGFzdENoaWxkIiwicGVybWFuZW50IiwiJHBvcHVwIiwicXVlcnlTZWxlY3RvciIsInNldFBhcmFtIiwib2siLCJjdXN0b20iLCJhZGQiLCJjbGFzcyIsInJlc2l6ZU9mZiIsInZpZXciLCJpc2Zvcm0iLCJQb3B1cEZvcm1WaWV3IiwiRm9ybVZpZXciLCJhcmd1bWVudHMiLCJjbG9zZVBvcHVwIiwiYmFzaWMiLCJmb3JtIiwib25DbG9zZSIsImNhbGxiYWNrQXJncyIsIm9uT2siLCJvbkN1c3RvbSIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkaXNwbGF5IiwiY3VzdG9tTmFtZSIsImRlbGVnYXRlRXZlbnRzIiwiJGJvZHkiLCJzdGFydCIsIkVsZW1lbnQiLCIkdGVtcGxhdGUiLCIkcGFyZW50IiwiJHdhaXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwicGFyZW50Iiwic3RvcCIsImNhbGxiYWNrIiwiaXNGdW5jdGlvbiIsImVsZW1lbnRzIiwiaSIsIm9wYWNpdHkiLCJ1c2VKd3QiLCJ0b2tlbiIsIm9uVW5hdXRob3JpemVkIiwic3luYyIsIm1ldGhvZCIsImJlZm9yZVNlbmQiLCJ4aHIiLCJoZWFkZXIiLCJlcnIiLCJwYXJhbSIsInN0YXR1cyIsInZpZXdVdGlscyIsInRhYmxlIiwiY29sdW1ucyIsIk5vdGlmaWNhdGlvblZpZXciLCJQb3B1cFZpZXciLCJXYWl0VmlldyIsIkVudGl0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLHFDOzs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7O0FDQUE7O0FBRUEsNENBQWUsZ0RBQUFBLENBQVNDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQjtBQUNoQ0MsYUFBUyxNQUR1QjtBQUVoQ0MsY0FGZ0Msd0JBRTRCO0FBQUEsWUFBakRDLE9BQWlELHVFQUF2QyxFQUFFQyxZQUFZLE9BQWQsRUFBdUJDLFVBQVUsRUFBakMsRUFBdUM7O0FBQ3hELGFBQUtDLE1BQUwsR0FBY0MsRUFBRVAsTUFBRixDQUFTO0FBQ25CUSxrQkFBTSxNQURhO0FBRW5CQyx5QkFBYSxLQUZNO0FBR25CQyx5QkFBYSxLQUhNO0FBSW5CQyxtQkFBTztBQUpZLFNBQVQsRUFLWEosRUFBRUssSUFBRixDQUFPVCxPQUFQLEVBQWdCLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsWUFBekIsQ0FBaEIsQ0FMVyxDQUFkO0FBTUEsYUFBS1UsUUFBTCxHQUFnQlYsUUFBUVUsUUFBeEI7QUFDQSxhQUFLUixRQUFMLEdBQWdCRixRQUFRRSxRQUF4QjtBQUNBLGFBQUtELFVBQUwsR0FBa0JELFFBQVFDLFVBQTFCO0FBQ0gsS0FaK0I7O0FBYWhDVSxZQUFRO0FBQ0oseUJBQWlCO0FBRGIsS0Fid0I7QUFnQmhDQyxjQWhCZ0Msc0JBZ0JyQkMsSUFoQnFCLEVBZ0JmQyxLQWhCZSxFQWdCUjtBQUNwQixhQUFLQyxFQUFMLENBQVFDLGdCQUFSLGtCQUF3Q0gsSUFBeEMsU0FBa0RJLFNBQWxELElBQWdFLEtBQUtoQixVQUFyRTtBQUNILEtBbEIrQjtBQW1CaENpQixhQW5CZ0MsdUJBbUJwQjtBQUNSLGVBQU8sS0FBS0MsR0FBTCxDQUFTQyxjQUFULEVBQVA7QUFDSCxLQXJCK0I7QUFzQmhDQyxhQXRCZ0MsdUJBc0JwQjtBQUNSLFlBQUlDLFNBQVMsRUFBYjtBQUNBbEIsVUFBRW1CLElBQUYsQ0FBTyxLQUFLTCxTQUFMLEVBQVAsRUFBeUIsVUFBQ00sU0FBRDtBQUFBLG1CQUFlRixPQUFPRSxVQUFVWCxJQUFqQixJQUF5QlcsVUFBVUMsS0FBbEQ7QUFBQSxTQUF6QjtBQUNBLGVBQU9ILE1BQVA7QUFDSCxLQTFCK0I7QUEyQmhDSSxTQTNCZ0MsbUJBMkJ4QjtBQUNKLFlBQUlDLFFBQVEsSUFBWjtBQUNBLGFBQUssSUFBTUMsSUFBWCxJQUFtQixLQUFLMUIsUUFBeEIsRUFBa0M7QUFDOUIsZ0JBQUlhLEtBQUssS0FBS0EsRUFBTCxDQUFRQyxnQkFBUixDQUF5QixhQUFhWSxLQUFLZixJQUFsQixHQUF5QixJQUFsRCxDQUFUO0FBQ0EsZ0JBQUlFLEdBQUdjLE1BQUgsSUFBYSxDQUFDZCxHQUFHLENBQUgsRUFBTVUsS0FBTixDQUFZSyxLQUFaLENBQWtCRixLQUFLRyxLQUF2QixDQUFsQixFQUFpRDtBQUM3QyxvQkFBSSxDQUFDaEIsR0FBR2lCLFNBQUgsQ0FBYUMsUUFBYixDQUFzQixLQUFLaEMsVUFBM0IsQ0FBTCxFQUE2QztBQUN6Q2MsdUJBQUdpQixTQUFILENBQWFFLElBQWIsQ0FBa0IsS0FBS2pDLFVBQXZCO0FBQ0FjLHVCQUFHb0Isa0JBQUgsQ0FBc0IsVUFBdEIsRUFBa0MsbUJBQW1CLEtBQUtsQyxVQUF4QixHQUFxQyxJQUFyQyxHQUE0QzJCLEtBQUtRLE9BQWpELEdBQTJELFVBQTdGO0FBQ0g7QUFDRFQsd0JBQVEsS0FBUjtBQUNILGFBTkQsTUFNTyxJQUFJWixHQUFHYyxNQUFQLEVBQWU7QUFDbEJkLG1CQUFHaUIsU0FBSCxDQUFhSyxNQUFiLENBQW9CLEtBQUtwQyxVQUF6QjtBQUNBLG9CQUFJcUMsUUFBUXZCLEdBQUd3QixrQkFBZjtBQUNBLG9CQUFJRCxNQUFNeEMsT0FBTixLQUFrQixPQUF0QixFQUErQndDLE1BQU1FLFVBQU4sQ0FBaUJDLFdBQWpCLENBQTZCSCxLQUE3QjtBQUNsQztBQUNKO0FBQ0QsYUFBS0ksT0FBTCxHQUFlZixLQUFmO0FBQ0EsZUFBT0EsS0FBUDtBQUNILEtBN0MrQjtBQThDaENnQixVQTlDZ0Msb0JBOENaO0FBQUEsWUFBYnhDLE1BQWEsdUVBQUosRUFBSTs7QUFDaEJBLGlCQUFTLENBQUNBLE9BQU95QyxhQUFSLEdBQXdCeEMsRUFBRVAsTUFBRixDQUFTLEtBQUtNLE1BQWQsRUFBc0JBLE1BQXRCLENBQXhCLEdBQXdELEtBQUtBLE1BQXRFO0FBQ0EsWUFBSUEsT0FBT0UsSUFBUCxDQUFZd0MsV0FBWixPQUE4QixLQUFsQyxFQUF5QzFDLE9BQU8yQyxJQUFQLEdBQWMsSUFBSUMsUUFBSixDQUFhLEtBQUtoQyxFQUFsQixDQUFkO0FBQ3pDaUMsVUFBRUMsSUFBRixDQUFPOUMsTUFBUDtBQUNBLFlBQUkrQyxVQUFVLElBQUlDLGNBQUosRUFBZDtBQUNBRCxnQkFBUUUsSUFBUixDQUFhakQsT0FBT0UsSUFBcEIsRUFBMEJGLE9BQU9rRCxHQUFqQyxFQUFzQyxJQUF0QztBQUNBSCxnQkFBUUksZ0JBQVIsQ0FBeUIsY0FBekIsRUFBeUMsa0RBQXpDO0FBQ0FKLGdCQUFRSyxJQUFSLENBQWFwRCxPQUFPMkMsSUFBcEI7QUFDSCxLQXREK0I7QUF1RGhDVSxVQXZEZ0Msb0JBdURYO0FBQUEsWUFBZHhELE9BQWMsdUVBQUosRUFBSTtBQUFFLFlBQUksS0FBS1UsUUFBVCxFQUFtQixLQUFLUyxHQUFMLENBQVNzQyxJQUFULENBQWMsS0FBSy9DLFFBQW5CO0FBQStCO0FBdkR6QyxDQUFyQixDQUFmLEM7Ozs7Ozs7Ozs7OztBQ0ZBOztBQUVBOztBQUVBLElBQU1nRCxRQUFRLGdEQUFBL0QsQ0FBUytELEtBQVQsQ0FBZTdELE1BQWYsQ0FBc0I7QUFDaEM4RCxXQUFPLEVBRHlCO0FBRWhDekQsWUFGZ0Msb0JBRXZCMEQsS0FGdUIsRUFFaEI1RCxPQUZnQixFQUVQO0FBQ3JCLFlBQUkyRCxRQUFRdkQsRUFBRXlELElBQUYsQ0FBT0QsS0FBUCxFQUFjLEtBQUtELEtBQUwsQ0FBV0csTUFBWCxDQUFrQixDQUFDLE1BQUQsQ0FBbEIsQ0FBZCxDQUFaO0FBQ0EsYUFBSyxJQUFJQyxJQUFULElBQWlCSixLQUFqQixFQUF3QjtBQUNwQixnQkFBSUEsTUFBTUksSUFBTixLQUFlLEVBQUVKLE1BQU1JLElBQU4sYUFBdUJDLElBQXpCLENBQW5CLEVBQW1EO0FBQy9DLHVCQUFPRCxJQUFQO0FBQ0g7QUFDSjtBQUNKLEtBVCtCO0FBVWhDRSxRQVZnQyxnQkFVM0JMLEtBVjJCLEVBVVE7QUFBQTs7QUFBQSxZQUE1QjVELE9BQTRCLHVFQUFsQixFQUFFa0UsT0FBTyxLQUFULEVBQWtCOztBQUNwQyxZQUFJbEUsUUFBUW1FLEdBQVosRUFBaUI7QUFDYixnQkFBSUMsVUFBVXBFLFFBQVFvRSxPQUF0QjtBQUNBcEUsb0JBQVFvRSxPQUFSLEdBQWtCLFVBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjQyxJQUFkLEVBQXVCO0FBQ3JDbkUsa0JBQUVtQixJQUFGLENBQU8sTUFBS2lELFNBQVosRUFBdUIsVUFBQ0MsUUFBRCxFQUFXQyxHQUFYLEVBQW1CO0FBQ3RDLHdCQUFJRCxTQUFTRSxVQUFULElBQXVCTixNQUFNTyxHQUFOLENBQVVGLEdBQVYsYUFBMEJELFNBQVNFLFVBQTlELEVBQTBFO0FBQ3RFdkUsMEJBQUVtQixJQUFGLENBQU84QyxNQUFNTyxHQUFOLENBQVVGLEdBQVYsRUFBZUcsTUFBdEIsRUFBOEIsVUFBQ1IsS0FBRCxFQUFXO0FBQ3JDQSxrQ0FBTUosSUFBTixDQUFXLElBQVgsRUFBaUIsRUFBRUUsS0FBS25FLFFBQVFtRSxHQUFmLEVBQWpCO0FBQ0gseUJBRkQ7QUFHSDtBQUNKLGlCQU5EO0FBT0Esb0JBQUlDLE9BQUosRUFBYUEsUUFBUVUsSUFBUixRQUFtQlQsS0FBbkIsRUFBMEJDLElBQTFCLEVBQWdDdEUsT0FBaEM7QUFDaEIsYUFURDtBQVVIO0FBQ0Q7QUFDQUwsUUFBQSxnREFBQUEsQ0FBUytELEtBQVQsQ0FBZXFCLFNBQWYsQ0FBeUJkLElBQXpCLENBQThCYSxJQUE5QixDQUFtQyxJQUFuQyxFQUF5Q2xCLEtBQXpDLEVBQWdENUQsT0FBaEQ7QUFDSCxLQTFCK0I7QUEyQmhDZ0YsU0EzQmdDLG1CQTJCWjtBQUFBOztBQUFBLFlBQWRoRixPQUFjLHVFQUFKLEVBQUk7O0FBQ2hCLFlBQUlBLFFBQVFtRSxHQUFaLEVBQWlCO0FBQ2IsZ0JBQUlDLFVBQVVwRSxRQUFRb0UsT0FBdEI7QUFDQXBFLG9CQUFRb0UsT0FBUixHQUFrQixVQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBY0MsSUFBZCxFQUF1QjtBQUNyQ25FLGtCQUFFbUIsSUFBRixDQUFPLE9BQUtpRCxTQUFaLEVBQXVCLFVBQUNDLFFBQUQsRUFBV0MsR0FBWCxFQUFtQjtBQUN0Qyx3QkFBSUQsU0FBU0UsVUFBVCxJQUF1Qk4sTUFBTU8sR0FBTixDQUFVRixHQUFWLGFBQTBCRCxTQUFTRSxVQUE5RCxFQUEwRTtBQUN0RXZFLDBCQUFFbUIsSUFBRixDQUFPOEMsTUFBTU8sR0FBTixDQUFVRixHQUFWLEVBQWVHLE1BQXRCLEVBQThCLFVBQUNSLEtBQUQsRUFBVztBQUNyQ0Esa0NBQU1XLEtBQU4sQ0FBWSxFQUFFYixLQUFLbkUsUUFBUW1FLEdBQWYsRUFBWjtBQUNILHlCQUZEO0FBR0g7QUFDSixpQkFORDtBQU9BLG9CQUFJQyxPQUFKLEVBQWFBLFFBQVFVLElBQVIsU0FBbUJULEtBQW5CLEVBQTBCQyxJQUExQixFQUFnQ3RFLE9BQWhDO0FBQ2hCLGFBVEQ7QUFVSDtBQUNETCxRQUFBLGdEQUFBQSxDQUFTK0QsS0FBVCxDQUFlcUIsU0FBZixDQUF5QkMsS0FBekIsQ0FBK0JGLElBQS9CLENBQW9DLElBQXBDLEVBQTBDOUUsT0FBMUM7QUFDSCxLQTFDK0I7QUEyQ2hDaUYsVUEzQ2dDLG9CQTJDWDtBQUFBLFlBQWRqRixPQUFjLHVFQUFKLEVBQUk7O0FBQ2pCLFlBQUlrRixhQUFhOUUsRUFBRStFLEtBQUYsQ0FBUSxLQUFLRCxVQUFiLENBQWpCO0FBQ0EsYUFBSyxJQUFJMUQsU0FBVCxJQUFzQjBELFVBQXRCLEVBQWtDO0FBQzlCLGdCQUFJQSxXQUFXRSxjQUFYLENBQTBCNUQsU0FBMUIsQ0FBSixFQUEwQztBQUN0QyxvQkFBSTBELFdBQVcxRCxTQUFYLGFBQWlDLGdEQUFBN0IsQ0FBUytELEtBQTlDLEVBQXFEO0FBQ2pEd0IsK0JBQVcxRCxTQUFYLElBQXdCeEIsUUFBUW1FLEdBQVIsR0FBYy9ELEVBQUV5RCxJQUFGLENBQU9xQixXQUFXMUQsU0FBWCxDQUFQLEVBQThCLElBQTlCLENBQWQsR0FBb0QwRCxXQUFXMUQsU0FBWCxFQUFzQnlELE1BQXRCLENBQTZCakYsT0FBN0IsQ0FBNUU7QUFDSCxpQkFGRCxNQUVPLElBQUlrRixXQUFXMUQsU0FBWCxhQUFpQyxnREFBQTdCLENBQVMwRixVQUE5QyxFQUEwRDtBQUM3RCx3QkFBSUMsWUFBWSxFQUFoQjtBQUNBSiwrQkFBVzFELFNBQVgsRUFBc0IrRCxPQUF0QixDQUE4QjtBQUFBLCtCQUFRRCxVQUFVcEQsSUFBVixDQUFlbEMsUUFBUW1FLEdBQVIsR0FBYy9ELEVBQUV5RCxJQUFGLENBQU8yQixJQUFQLEVBQWEsSUFBYixDQUFkLEdBQW1DQSxLQUFLUCxNQUFMLENBQVlqRixPQUFaLENBQWxELENBQVI7QUFBQSxxQkFBOUI7QUFDQWtGLCtCQUFXMUQsU0FBWCxJQUF3QjhELFNBQXhCO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsZUFBT0osVUFBUDtBQUNILEtBekQrQjs7QUEwRGhDTyxTQUFLLGFBQVNmLEdBQVQsRUFBY2dCLEdBQWQsRUFBbUIxRixPQUFuQixFQUE0QjtBQUFBOztBQUM3QixZQUFJMEUsUUFBUSxJQUFaLEVBQWtCLE9BQU8sSUFBUDtBQUNsQixZQUFJUSxVQUFKO0FBQ0EsWUFBSSxRQUFPUixHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBbkIsRUFBNkI7QUFDekJRLHlCQUFhUixHQUFiO0FBQ0ExRSxzQkFBVTBGLEdBQVY7QUFDSCxTQUhELE1BR087QUFDSCxhQUFDUixhQUFhLEVBQWQsRUFBa0JSLEdBQWxCLElBQXlCZ0IsR0FBekI7QUFDSDtBQUNELFlBQUluQixPQUFPbkUsRUFBRVAsTUFBRixDQUFTLEVBQUVLLFVBQVUsSUFBWixFQUFULEVBQTZCRixPQUE3QixDQUFYO0FBQ0EsWUFBSXdFLFlBQVlwRSxFQUFFdUYsSUFBRixDQUFPLEtBQUtuQixTQUFaLENBQWhCO0FBQ0FwRSxVQUFFbUIsSUFBRixDQUFPMkQsVUFBUCxFQUFtQixVQUFDekQsS0FBRCxFQUFRaUQsR0FBUixFQUFnQjtBQUMvQixnQkFBSXRFLEVBQUU2QixRQUFGLENBQVd1QyxTQUFYLEVBQXNCRSxHQUF0QixDQUFKLEVBQWdDO0FBQzVCLG9CQUFJa0IsYUFBYSxPQUFLcEIsU0FBTCxDQUFlRSxHQUFmLENBQWpCO0FBQ0Esb0JBQUlrQixXQUFXdkIsS0FBWCxJQUFvQjVDLGlCQUFpQm9FLE1BQXpDLEVBQWlEO0FBQzdDLDJCQUFLSixHQUFMLENBQVNmLEdBQVQsRUFBYyxJQUFJa0IsV0FBV3ZCLEtBQWYsQ0FBcUI1QyxLQUFyQixFQUE0QjhDLElBQTVCLENBQWQsRUFBaURBLElBQWpEO0FBQ0EsMkJBQU9XLFdBQVdSLEdBQVgsQ0FBUDtBQUNILGlCQUhELE1BR08sSUFBSWtCLFdBQVdqQixVQUFYLElBQXlCbEQsaUJBQWlCcUUsS0FBOUMsRUFBcUQ7QUFDeEQ7QUFDQSwyQkFBS2xCLEdBQUwsQ0FBU0YsR0FBVCxFQUFjZSxHQUFkLENBQWtCLElBQUlHLFdBQVdqQixVQUFmLENBQTBCbEQsS0FBMUIsRUFBaUM4QyxJQUFqQyxDQUFsQjtBQUNBLDJCQUFPVyxXQUFXUixHQUFYLENBQVA7QUFDSCxpQkFKTSxNQUlBLElBQUlrQixXQUFXdkIsS0FBWCxJQUFvQixFQUFFNUMsaUJBQWlCbUUsV0FBV3ZCLEtBQTlCLENBQXBCLElBQTREdUIsV0FBV2pCLFVBQVgsSUFBeUIsRUFBRWxELGlCQUFpQm1FLFdBQVdqQixVQUE5QixDQUF6RixFQUFvSTtBQUN2SW9CLDRCQUFRQyxHQUFSLENBQVksMkJBQTJCLE9BQUtwQixHQUFMLENBQVMsV0FBVCxDQUF2QztBQUNBLDJCQUFPTSxXQUFXUixHQUFYLENBQVA7QUFDSDtBQUNKO0FBQ0QsZ0JBQUksT0FBS2YsS0FBTCxDQUFXRyxNQUFYLENBQWtCLENBQUMsTUFBRCxDQUFsQixFQUE0Qm1DLFFBQTVCLENBQXFDdkIsR0FBckMsS0FBNkMsRUFBRWpELGlCQUFpQnVDLElBQW5CLENBQWpELEVBQTJFO0FBQ3ZFa0IsMkJBQVdSLEdBQVgsSUFBa0IsSUFBSVYsSUFBSixDQUFTdkMsS0FBVCxDQUFsQjtBQUNIO0FBQ0osU0FsQkQsRUFrQkcsSUFsQkg7QUFtQkEsZUFBTyxnREFBQTlCLENBQVMrRCxLQUFULENBQWVxQixTQUFmLENBQXlCVSxHQUF6QixDQUE2QlMsS0FBN0IsQ0FBbUMsSUFBbkMsRUFBeUMsQ0FBQ2hCLFVBQUQsRUFBYWxGLE9BQWIsQ0FBekMsQ0FBUDtBQUNIO0FBekYrQixDQUF0QixDQUFkOztBQTRGQTs7Ozs7QUFLQTBELE1BQU03RCxNQUFOLEdBQWUsVUFBU3NHLGVBQVQsRUFBMEI7QUFDckM7QUFDQSxRQUFJQyxtQkFBbUIsRUFBdkI7QUFDQWhHLE1BQUVtQixJQUFGLENBQU80RSxnQkFBZ0IzQixTQUF2QixFQUFrQyxVQUFDb0IsVUFBRCxFQUFhbEIsR0FBYixFQUFxQjtBQUNuRCxZQUFJa0IsV0FBV2pCLFVBQVgsSUFBeUJ3QixnQkFBZ0JFLFFBQWhCLENBQXlCM0IsR0FBekIsYUFBeUNvQixLQUF0RSxFQUE2RTtBQUN6RU0sNkJBQWlCMUIsR0FBakIsSUFBd0IsSUFBSWtCLFdBQVdqQixVQUFmLENBQTBCd0IsZ0JBQWdCRSxRQUFoQixDQUF5QjNCLEdBQXpCLENBQTFCLENBQXhCO0FBQ0gsU0FGRCxNQUVPLElBQUlrQixXQUFXakIsVUFBWCxJQUF5QixFQUFFd0IsZ0JBQWdCRSxRQUFoQixDQUF5QjNCLEdBQXpCLGFBQXlDb0IsS0FBM0MsQ0FBN0IsRUFBZ0Y7QUFDbkZDLG9CQUFRQyxHQUFSLENBQVksMkJBQTJCdEIsR0FBdkM7QUFDSDtBQUNKLEtBTkQ7QUFPQXRFLE1BQUVQLE1BQUYsQ0FBU3NHLGdCQUFnQkUsUUFBekIsRUFBbUNELGdCQUFuQztBQUNBLFdBQU8sZ0RBQUF6RyxDQUFTK0QsS0FBVCxDQUFlN0QsTUFBZixDQUFzQmlGLElBQXRCLENBQTJCLElBQTNCLEVBQWlDcUIsZUFBakMsQ0FBUDtBQUNILENBWkQ7O0FBY0E7Ozs7QUFJQSxJQUFNZCxhQUFhLGdEQUFBMUYsQ0FBUzBGLFVBQVQsQ0FBb0J4RixNQUFwQixDQUEyQjtBQUMxQztBQUNBd0UsV0FBT1g7QUFGbUMsQ0FBM0IsQ0FBbkI7O0FBS0E7OztBQUdBLDRDQUFlO0FBQ1hBLGdCQURXO0FBRVgyQjtBQUZXLENBQWYsQzs7Ozs7Ozs7OztBQy9IQTs7QUFFQSw0Q0FBZSxnREFBQTFGLENBQVNDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQjtBQUNoQ0MsYUFBUyxjQUR1QjtBQUVoQ21CLGVBQVcsaUJBRnFCO0FBR2hDUCxjQUFVTixFQUFFTSxRQUFGLDBGQUhzQjtBQUloQ1gsY0FKZ0Msd0JBSVA7QUFBQSxZQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQ3JCLFlBQUlzRyxTQUFTQyxTQUFTQyxJQUFULENBQWNDLG9CQUFkLENBQW1DLGNBQW5DLEVBQW1ELENBQW5ELENBQWI7QUFDQSxZQUFJLENBQUNILE1BQUwsRUFBYUMsU0FBU0MsSUFBVCxDQUFjRSxXQUFkLENBQTBCLEtBQUszRixFQUEvQixFQUFiLEtBQ0ssS0FBS0EsRUFBTCxHQUFVdUYsTUFBVjtBQUNMLGFBQUtLLFFBQUwsR0FBZ0IzRyxRQUFRMkcsUUFBUixJQUFvQixJQUFwQztBQUNBLGFBQUtqRyxRQUFMLEdBQWdCVixRQUFRVSxRQUFSLElBQW9CLEtBQUtBLFFBQXpDO0FBQ0gsS0FWK0I7O0FBV2hDQyxZQUFRO0FBQ0osd0JBQWdCO0FBRFosS0FYd0I7QUFjaENpRyxTQWRnQyxpQkFjMUJDLEtBZDBCLEVBY25CQyxVQWRtQixFQWNQO0FBQ3JCLFlBQU1SLFNBQVNPLE1BQU1FLE1BQU4sR0FBZUYsTUFBTUUsTUFBTixDQUFhdkUsVUFBNUIsR0FBeUNxRSxLQUF4RDtBQUNBUCxlQUFPVSxLQUFQLENBQWFDLE1BQWIsR0FBc0IsQ0FBdEI7QUFDQVgsZUFBT1UsS0FBUCxDQUFhRSxTQUFiLEdBQXlCLENBQXpCO0FBQ0FaLGVBQU9VLEtBQVAsQ0FBYUcsWUFBYixHQUE0QixDQUE1QjtBQUNBYixlQUFPVSxLQUFQLENBQWFJLFVBQWIsR0FBMEIsQ0FBMUI7QUFDQWQsZUFBT1UsS0FBUCxDQUFhSyxhQUFiLEdBQTZCLENBQTdCO0FBQ0EsWUFBSUMsU0FBU0MsaUJBQWlCakIsTUFBakIsQ0FBYjtBQUNBLFlBQU1LLFdBQVdXLFVBQVVBLE9BQU9FLGtCQUFqQixHQUFzQ0MsV0FBV0gsT0FBT0Usa0JBQWxCLENBQXRDLEdBQThFLENBQS9GOztBQUVBRSxtQkFBVyxZQUFNO0FBQ2IsZ0JBQUlwQixVQUFVQSxPQUFPOUQsVUFBckIsRUFBaUM4RCxPQUFPOUQsVUFBUCxDQUFrQkMsV0FBbEIsQ0FBOEI2RCxNQUE5QjtBQUNwQyxTQUZELEVBRUdLLFdBQVcsSUFGZDtBQUdILEtBM0IrQjtBQTRCaEN2QyxXQTVCZ0MsbUJBNEJ4QmhDLE9BNUJ3QixFQTRCRDtBQUFBLFlBQWRwQyxPQUFjLHVFQUFKLEVBQUk7QUFBRSxhQUFLd0QsTUFBTCxDQUFZLEVBQUV2QyxXQUFXLFNBQWIsRUFBd0JtQixTQUFTQSxPQUFqQyxFQUFaLEVBQXdEcEMsT0FBeEQ7QUFBbUUsS0E1QnBFO0FBNkJoQ2MsU0E3QmdDLGlCQTZCMUJzQixPQTdCMEIsRUE2Qkg7QUFBQSxZQUFkcEMsT0FBYyx1RUFBSixFQUFJO0FBQUUsYUFBS3dELE1BQUwsQ0FBWSxFQUFFdkMsV0FBVyxPQUFiLEVBQXNCbUIsU0FBU0EsT0FBL0IsRUFBWixFQUFzRHBDLE9BQXREO0FBQWlFLEtBN0JoRTtBQThCaEMySCxRQTlCZ0MsZ0JBOEIzQnZGLE9BOUIyQixFQThCSjtBQUFBLFlBQWRwQyxPQUFjLHVFQUFKLEVBQUk7QUFBRSxhQUFLd0QsTUFBTCxDQUFZLEVBQUV2QyxXQUFXLFNBQWIsRUFBd0JtQixTQUFTQSxPQUFqQyxFQUFaLEVBQXdEcEMsT0FBeEQ7QUFBbUUsS0E5QmpFO0FBK0JoQzRILFVBL0JnQyxrQkErQnpCeEYsT0EvQnlCLEVBK0JGO0FBQUEsWUFBZHBDLE9BQWMsdUVBQUosRUFBSTtBQUFFLGFBQUt3RCxNQUFMLENBQVksRUFBRXBCLFNBQVNBLE9BQVgsRUFBWixFQUFrQ3BDLE9BQWxDO0FBQTZDLEtBL0I3QztBQWdDaEN3RCxVQWhDZ0Msa0JBZ0N6QnFFLEtBaEN5QixFQWdDSjtBQUFBOztBQUFBLFlBQWQ3SCxPQUFjLHVFQUFKLEVBQUk7OztBQUV4QixZQUFNOEgsVUFBVXZCLFNBQVN3QixhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FELGdCQUFRRSxTQUFSLEdBQW9CLEtBQUt0SCxRQUFMLENBQWMsRUFBRU8sV0FBVzRHLE1BQU01RyxTQUFuQixFQUE4Qm1CLFNBQVN5RixNQUFNekYsT0FBN0MsRUFBZCxDQUFwQjtBQUNBLFlBQU1rRSxTQUFTd0IsUUFBUUcsU0FBdkI7QUFDQSxhQUFLbEgsRUFBTCxDQUFRMkYsV0FBUixDQUFvQkosTUFBcEI7QUFDQSxZQUFJLENBQUN0RyxRQUFRa0ksU0FBYixFQUF3QlIsV0FBVyxZQUFNO0FBQUUsa0JBQUtkLEtBQUwsQ0FBV04sTUFBWDtBQUFxQixTQUF4QyxFQUEwQ3RHLFFBQVEyRyxRQUFSLElBQW9CLEtBQUtBLFFBQW5FO0FBQzNCO0FBdkMrQixDQUFyQixDQUFmLEM7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7QUFFQSw0Q0FBZSxnREFBQWhILENBQVNDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQjtBQUNoQ0MsYUFBUyxPQUR1QjtBQUVoQ1ksY0FBVU4sRUFBRU0sUUFBRixzZEFGc0I7QUFjaENYLGNBZGdDLHdCQWNuQjtBQUNULFlBQUlvSSxTQUFTNUIsU0FBU0MsSUFBVCxDQUFjNEIsYUFBZCxDQUE0QixPQUE1QixDQUFiO0FBQ0EsWUFBSSxDQUFDRCxNQUFMLEVBQWE1QixTQUFTQyxJQUFULENBQWNFLFdBQWQsQ0FBMEIsS0FBSzNGLEVBQS9CLEVBQWIsS0FDSyxLQUFLQSxFQUFMLEdBQVVvSCxNQUFWO0FBQ1IsS0FsQitCOztBQW1CaEN4SCxZQUFRO0FBQ0osd0JBQWdCLFNBRFo7QUFFSix5QkFBaUIsU0FGYjtBQUdKLHFCQUFhLE1BSFQ7QUFJSix5QkFBaUI7QUFKYixLQW5Cd0I7QUF5QmhDMEgsWUF6QmdDLG9CQXlCdkJsSSxNQXpCdUIsRUF5QmY7QUFBQTs7QUFDYixhQUFLRSxJQUFMLEdBQVlGLE9BQU9FLElBQW5CO0FBQ0EsYUFBS2lJLEVBQUwsR0FBVW5JLE9BQU9tSSxFQUFqQjtBQUNBLGFBQUsxQixLQUFMLEdBQWF6RyxPQUFPeUcsS0FBcEI7QUFDQSxhQUFLMkIsTUFBTCxHQUFjcEksT0FBT29JLE1BQXJCO0FBQ0EsYUFBS3hILEVBQUwsQ0FBUWlCLFNBQVIsQ0FBa0J3RyxHQUFsQixDQUFzQnJJLE9BQU9zSSxLQUE3QjtBQUNBLGFBQUtDLFNBQUwsR0FBaUJ2SSxPQUFPdUksU0FBeEI7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJeEksT0FBT08sUUFBWCxFQUFxQjtBQUNqQixnQkFBSVAsT0FBT3lJLE1BQVgsRUFBbUI7QUFBQTtBQUNmLHdCQUFNRCxZQUFOO0FBQ0Esd0JBQU1FLGdCQUFnQiwwREFBQUMsQ0FBU2pKLE1BQVQsQ0FBZ0I7QUFDbENFLGtDQURrQyx3QkFDckI7QUFDVCtJLDRCQUFBLDBEQUFBQSxDQUFTL0QsU0FBVCxDQUFtQmhGLFVBQW5CLENBQThCbUcsS0FBOUIsQ0FBb0MsSUFBcEMsRUFBMEM2QyxTQUExQztBQUNILHlCQUhpQztBQUlsQ3BHLDhCQUprQyxvQkFJZDtBQUFBLGdDQUFieEMsTUFBYSx1RUFBSixFQUFJOztBQUNoQjJJLDRCQUFBLDBEQUFBQSxDQUFTL0QsU0FBVCxDQUFtQnBDLE1BQW5CLENBQTBCdUQsS0FBMUIsQ0FBZ0MsSUFBaEMsRUFBc0M2QyxTQUF0QztBQUNBSixpQ0FBS0ssVUFBTDtBQUNIO0FBUGlDLHFCQUFoQixDQUF0QjtBQVNBLDBCQUFLTCxJQUFMLEdBQVksSUFBSUUsYUFBSixDQUFrQjFJLE1BQWxCLENBQVo7QUFYZTtBQVlsQixhQVpELE1BWU8sSUFBSUEsT0FBT08sUUFBUCxZQUEyQixnREFBQWYsQ0FBU0MsSUFBeEMsRUFBOEM7QUFDakQscUJBQUsrSSxJQUFMLEdBQVl4SSxPQUFPTyxRQUFuQjtBQUNIO0FBQ0QsZ0JBQUksS0FBS2lJLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVMLEVBQTNCLEVBQStCO0FBQzNCLG9CQUFJQSxLQUFLbkksT0FBT21JLEVBQWhCO0FBQ0FuSSx1QkFBT21JLEVBQVAsR0FBWTtBQUFBLDJCQUFNSyxLQUFLQSxJQUFMLENBQVVMLEVBQVYsQ0FBYUEsRUFBYixDQUFOO0FBQUEsaUJBQVo7QUFDSDtBQUNELGlCQUFLQSxFQUFMLEdBQVVuSSxPQUFPbUksRUFBUCxJQUFhLEtBQUtBLEVBQTVCO0FBQ0gsU0FyQkQsTUFxQk87QUFDSCxpQkFBS0ssSUFBTCxHQUFZLElBQVo7QUFDSDtBQUNKLEtBekQrQjtBQTBEaENNLFNBMURnQyxtQkEwRFo7QUFBQSxZQUFkakosT0FBYyx1RUFBSixFQUFJOztBQUNoQixhQUFLcUksUUFBTCxDQUFjckksT0FBZDtBQUNBLGFBQUt3RCxNQUFMLENBQVl4RCxPQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0E5RCtCO0FBK0RoQ2tKLFFBL0RnQyxrQkErRGI7QUFBQSxZQUFkbEosT0FBYyx1RUFBSixFQUFJOztBQUNmQSxnQkFBUTRJLE1BQVIsR0FBaUIsSUFBakI7QUFDQSxhQUFLUCxRQUFMLENBQWNySSxPQUFkO0FBQ0EsYUFBS3dELE1BQUwsQ0FBWXhELE9BQVo7QUFDQSxlQUFPLElBQVA7QUFDSCxLQXBFK0I7QUFxRWhDbUosV0FyRWdDLHFCQXFFdEI7QUFDTixZQUFJLEtBQUt2QyxLQUFULEVBQWdCLEtBQUtBLEtBQUwsQ0FBV1YsS0FBWCxDQUFpQixJQUFqQixFQUF1QixDQUFDLEtBQUtrRCxZQUFMLEVBQUQsQ0FBdkI7QUFDaEIsYUFBS0osVUFBTDtBQUNILEtBeEUrQjtBQXlFaENLLFFBekVnQyxrQkF5RXpCO0FBQ0gsWUFBSSxLQUFLZixFQUFULEVBQWEsS0FBS0EsRUFBTCxDQUFRcEMsS0FBUixDQUFjLElBQWQsRUFBb0IsQ0FBQyxLQUFLa0QsWUFBTCxFQUFELENBQXBCO0FBQ2IsWUFBSSxLQUFLL0ksSUFBTCxLQUFjLE1BQWQsSUFBd0IsS0FBS3NJLElBQUwsQ0FBVWpHLE9BQXRDLEVBQStDLEtBQUtzRyxVQUFMO0FBQ2xELEtBNUUrQjtBQTZFaENNLFlBN0VnQyxzQkE2RXJCO0FBQ1AsWUFBSSxLQUFLZixNQUFULEVBQWlCLEtBQUtBLE1BQUwsQ0FBWXJDLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0IsQ0FBQyxLQUFLa0QsWUFBTCxFQUFELENBQXhCO0FBQ2pCLGFBQUtKLFVBQUw7QUFDSCxLQWhGK0I7QUFpRmhDQSxjQWpGZ0Msd0JBaUZuQjtBQUNULFlBQUksS0FBS0wsSUFBVCxFQUFlLEtBQUtBLElBQUwsQ0FBVXRHLE1BQVY7QUFDZixhQUFLQSxNQUFMO0FBQ0gsS0FwRitCO0FBcUZoQytHLGdCQXJGZ0MsMEJBcUZqQjtBQUNYLFlBQUl6SCxRQUFRLElBQVo7QUFDQSxZQUFJNEgsT0FBTyxFQUFYO0FBQ0EsWUFBSSxLQUFLbEosSUFBTCxLQUFjLE1BQWxCLEVBQTBCO0FBQ3RCc0Isb0JBQVEsS0FBS2dILElBQUwsQ0FBVWpILEtBQVYsRUFBUjtBQUNBNkgsaUJBQUtySCxJQUFMLENBQVUsS0FBS3lHLElBQUwsQ0FBVXpILFNBQVYsRUFBVjtBQUNBcUksaUJBQUtySCxJQUFMLENBQVVQLEtBQVY7QUFDSDtBQUNENEgsYUFBS3JILElBQUwsQ0FBVSxJQUFWO0FBQ0EsZUFBT3FILElBQVA7QUFDSCxLQS9GK0I7QUFnR2hDQyxpQkFoR2dDLHlCQWdHbEJDLGFBaEdrQixFQWdHSDtBQUN6QixhQUFLMUksRUFBTCxDQUFRMkksc0JBQVIsQ0FBK0IsSUFBL0IsRUFBcUMsQ0FBckMsRUFBd0MxQyxLQUF4QyxDQUE4QzJDLE9BQTlDLEdBQXdELEtBQUtyQixFQUFMLEdBQVUsRUFBVixHQUFlLE1BQXZFO0FBQ0EsYUFBS3ZILEVBQUwsQ0FBUTJJLHNCQUFSLENBQStCLFNBQS9CLEVBQTBDLENBQTFDLEVBQTZDMUMsS0FBN0MsQ0FBbUQyQyxPQUFuRCxHQUE2RCxLQUFLL0MsS0FBTCxHQUFhLEVBQWIsR0FBa0IsTUFBL0U7QUFDQSxhQUFLN0YsRUFBTCxDQUFRMkksc0JBQVIsQ0FBK0IsU0FBL0IsRUFBMEMsQ0FBMUMsRUFBNkMxQyxLQUE3QyxDQUFtRDJDLE9BQW5ELEdBQTZELEtBQUtwQixNQUFMLEdBQWMsRUFBZCxHQUFtQixNQUFoRjtBQUNBLGFBQUt4SCxFQUFMLENBQVEySSxzQkFBUixDQUErQixVQUEvQixFQUEyQyxDQUEzQyxFQUE4QzFDLEtBQTlDLENBQW9EMkMsT0FBcEQsR0FBOEQsQ0FBQyxLQUFLckIsRUFBTixJQUFZLENBQUMsS0FBSzFCLEtBQWxCLElBQTJCLENBQUMsS0FBSzJCLE1BQWpDLEdBQTBDLEVBQTFDLEdBQStDLE1BQTdHO0FBQ0EsWUFBSWtCLGFBQUosRUFBbUI7QUFDZixpQkFBSzFJLEVBQUwsQ0FBUTJJLHNCQUFSLENBQStCLFVBQS9CLEVBQTJDMUgsU0FBM0MsQ0FBcUR3RyxHQUFyRCxDQUF5RCxRQUF6RDtBQUNBLGlCQUFLekgsRUFBTCxDQUFRaUIsU0FBUixDQUFrQndHLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNILFNBSEQsTUFHTztBQUNILGlCQUFLekgsRUFBTCxDQUFRMkksc0JBQVIsQ0FBK0IsVUFBL0IsRUFBMkMxSCxTQUEzQyxDQUFxREssTUFBckQsQ0FBNEQsUUFBNUQ7QUFDQSxpQkFBS3RCLEVBQUwsQ0FBUWlCLFNBQVIsQ0FBa0JLLE1BQWxCLENBQXlCLGdCQUF6QjtBQUNIO0FBQ0osS0E1RytCO0FBNkdoQ21CLFVBN0dnQyxvQkE2R2Q7QUFBQSxZQUFYVixJQUFXLHVFQUFKLEVBQUk7O0FBQ2RBLGVBQU8xQyxFQUFFUCxNQUFGLENBQVM7QUFDWnVDLHFCQUFTLEVBREc7QUFFWndILHdCQUFZLEVBRkE7QUFHWmxKLHNCQUFVO0FBSEUsU0FBVCxFQUlKTixFQUFFeUQsSUFBRixDQUFPZixJQUFQLEVBQWEsQ0FBQyxTQUFELEVBQVksWUFBWixFQUEwQixVQUExQixFQUFzQyxlQUF0QyxDQUFiLENBSkksQ0FBUDtBQUtBLGFBQUsvQixFQUFMLENBQVFpRyxLQUFSLENBQWMyQyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0EsYUFBSzVJLEVBQUwsQ0FBUWlILFNBQVIsR0FBb0IsS0FBS3RILFFBQUwsQ0FBY29DLElBQWQsQ0FBcEI7QUFDQSxhQUFLMEcsYUFBTCxDQUFtQjFHLEtBQUsyRyxhQUF4QjtBQUNBLFlBQUksS0FBS2QsSUFBVCxFQUFlO0FBQ1gsaUJBQUtBLElBQUwsQ0FBVW5GLE1BQVY7QUFDQSxpQkFBS3pDLEVBQUwsQ0FBUTJJLHNCQUFSLENBQStCLFVBQS9CLEVBQTJDLENBQTNDLEVBQThDMUIsU0FBOUMsR0FBMEQsS0FBS1csSUFBTCxDQUFVeEgsR0FBcEU7QUFDSDtBQUNELGFBQUswSSxjQUFMO0FBQ0g7QUEzSCtCLENBQXJCLENBQWYsQzs7Ozs7Ozs7OztBQ0hBOztBQUVBLDRDQUFlLGdEQUFBbEssQ0FBU0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCO0FBQ2hDYSxjQUFVTixFQUFFTSxRQUFGLCtIQURzQjtBQUVoQ1osYUFBUyxNQUZ1QjtBQUdoQ0MsY0FIZ0Msd0JBR25CO0FBQ1QsWUFBSStKLFFBQVF2RCxTQUFTQyxJQUFyQjtBQUNBLFlBQUlzRCxNQUFNOUksZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0JhLE1BQS9CLEtBQTBDLENBQTlDLEVBQWlEaUksTUFBTXBELFdBQU4sQ0FBa0IsS0FBSzNGLEVBQXZCLEVBQWpELEtBQ0ssS0FBS0EsRUFBTCxHQUFVK0ksTUFBTTFCLGFBQU4sQ0FBb0IsTUFBcEIsQ0FBVjtBQUNSLEtBUCtCO0FBUWhDMkIsU0FSZ0MsaUJBUTFCM0gsT0FSMEIsRUFRakJqQixHQVJpQixFQVFaO0FBQUE7O0FBQ2hCLFlBQUlpQixtQkFBbUI0SCxPQUF2QixFQUFnQztBQUM1QjdJLGtCQUFNaUIsT0FBTjtBQUNBQSxzQkFBVSxJQUFWO0FBQ0g7QUFDRCxZQUFJNkgsWUFBWSxLQUFLdkosUUFBTCxDQUFjLEVBQUUwQixTQUFTQSxXQUFXLFlBQXRCLEVBQWQsQ0FBaEI7QUFDQSxZQUFJOEgsVUFBVS9JLE9BQU9vRixTQUFTQyxJQUE5QjtBQUNBMEQsZ0JBQVFsSSxTQUFSLENBQWtCd0csR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0EwQixnQkFBUWxJLFNBQVIsQ0FBa0J3RyxHQUFsQixDQUFzQixZQUF0QjtBQUNBLFlBQUlySCxHQUFKLEVBQVM7QUFDTCxnQkFBSWdKLFFBQVEsSUFBSUgsT0FBSixDQUFZLE1BQVosQ0FBWjtBQUNBRyxrQkFBTW5ELEtBQU4sQ0FBWTJDLE9BQVosR0FBc0IsT0FBdEI7QUFDQVEsa0JBQU1DLFlBQU4sQ0FBbUJILFNBQW5CLEVBQThCRSxNQUFNRSxVQUFwQztBQUNBSCxvQkFBUUUsWUFBUixDQUFxQkQsS0FBckIsRUFBNEJHLE9BQU9ELFVBQW5DO0FBQ0gsU0FMRCxNQUtPO0FBQ0gsaUJBQUt0SixFQUFMLENBQVFpSCxTQUFSLEdBQW9CaUMsU0FBcEI7QUFDQSxpQkFBS2xKLEVBQUwsQ0FBUWlHLEtBQVIsQ0FBYzJDLE9BQWQsR0FBd0IsT0FBeEI7QUFDSDtBQUNELGVBQU87QUFDSFksa0JBQU0sY0FBQ0MsUUFBRDtBQUFBLHVCQUFjLE1BQUtELElBQUwsQ0FBVXBKLEdBQVYsRUFBZXFKLFFBQWYsQ0FBZDtBQUFBO0FBREgsU0FBUDtBQUdILEtBN0IrQjtBQThCaENELFFBOUJnQyxnQkE4QjNCcEosR0E5QjJCLEVBOEJ0QnFKLFFBOUJzQixFQThCWjtBQUNoQkEsbUJBQVdwSyxFQUFFcUssVUFBRixDQUFhdEosR0FBYixJQUFvQkEsR0FBcEIsR0FBMEJxSixRQUFyQztBQUNBLFlBQUlMLFFBQVFoSixPQUFPQSxJQUFJaUgsYUFBSixDQUFrQixNQUFsQixDQUFQLElBQW9DLEtBQUtySCxFQUFyRDtBQUNBLFlBQUltSixVQUFVL0ksT0FBT29GLFNBQVNDLElBQTlCO0FBQ0EsWUFBSWtFLFdBQVdQLE1BQU1uSixnQkFBTixDQUF1Qix1QkFBdkIsQ0FBZjtBQUNBLGFBQUssSUFBSTJKLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsU0FBUzdJLE1BQTdCLEVBQXFDOEksR0FBckMsRUFBMEM7QUFDdENELHFCQUFTQyxDQUFULEVBQVkzSSxTQUFaLENBQXNCSyxNQUF0QixDQUE2QixPQUE3QjtBQUNBcUkscUJBQVNDLENBQVQsRUFBWTNELEtBQVosQ0FBa0I0RCxPQUFsQixHQUE0QixDQUE1QjtBQUNIO0FBQ0RWLGdCQUFRbEksU0FBUixDQUFrQkssTUFBbEIsQ0FBeUIsWUFBekI7QUFDQXFGLG1CQUFXLFlBQU07QUFDYndDLG9CQUFRbEksU0FBUixDQUFrQkssTUFBbEIsQ0FBeUIsZ0JBQXpCO0FBQ0E4SCxrQkFBTW5ELEtBQU4sQ0FBWTJDLE9BQVosR0FBc0IsTUFBdEI7QUFDQVEsa0JBQU1uQyxTQUFOLEdBQWtCLEVBQWxCO0FBQ0EsZ0JBQUk3RyxHQUFKLEVBQVNnSixNQUFNM0gsVUFBTixDQUFpQkMsV0FBakIsQ0FBNkIwSCxLQUE3QjtBQUNULGdCQUFJSyxRQUFKLEVBQWNBO0FBQ2pCLFNBTkQsRUFNRyxJQU5IO0FBT0g7QUEvQytCLENBQXJCLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQU1LLFNBQVMsU0FBVEEsTUFBUyxHQUFtRDtBQUFBLFFBQWxEN0ssT0FBa0QsdUVBQXhDO0FBQUU4SyxhQUFGLG1CQUFVLENBQUUsQ0FBWjtBQUFjQyxzQkFBZCw0QkFBK0IsQ0FBRTtBQUFqQyxLQUF3Qzs7QUFDOUQsUUFBTUMsT0FBTyxnREFBQXJMLENBQVNxTCxJQUF0QjtBQUNBckwsSUFBQSxnREFBQUEsQ0FBU3FMLElBQVQsR0FBZ0IsVUFBQ0MsTUFBRCxFQUFTNUcsS0FBVCxFQUFnQkUsSUFBaEIsRUFBeUI7QUFDckMsWUFBTXVHLFFBQVE5SyxRQUFROEssS0FBUixFQUFkO0FBQ0EsWUFBSUEsS0FBSixFQUFXdkcsS0FBSzJHLFVBQUwsR0FBa0IsVUFBQ0MsR0FBRCxFQUFTO0FBQUVBLGdCQUFJN0gsZ0JBQUosQ0FBcUJ0RCxRQUFRb0wsTUFBUixJQUFrQixlQUF2QyxFQUF3RCxZQUFZTixLQUFwRTtBQUE2RSxTQUExRztBQUNYLFlBQUlPLE1BQU05RyxLQUFLekQsS0FBZjtBQUNBeUQsYUFBS3pELEtBQUwsR0FBYSxVQUFDd0ssS0FBRCxFQUFXO0FBQ3BCLGdCQUFJQSxNQUFNQyxNQUFOLElBQWdCRCxNQUFNQyxNQUFOLEtBQWlCLEdBQXJDLEVBQTBDdkwsUUFBUStLLGNBQVI7QUFDMUNNLGdCQUFJQyxLQUFKO0FBQ0gsU0FIRDtBQUlBTixhQUFLQyxNQUFMLEVBQWE1RyxLQUFiLEVBQW9CRSxJQUFwQjtBQUNILEtBVEQ7QUFVSCxDQVpEOztBQWNBLElBQU1pSCxZQUFZO0FBQ2RDLFNBRGMsaUJBQ1J6TCxPQURRLEVBQ0M7QUFDWCxlQUFPSSxFQUFFTSxRQUFGLGdrQ0FpQndCTixFQUFFaUcsUUFBRixDQUFXckcsT0FBWCxFQUFvQixFQUFFaUIsV0FBVyxFQUFiLEVBQWlCNkIsTUFBTSxFQUF2QixFQUEyQjRJLFNBQVMsRUFBcEMsRUFBcEIsQ0FqQnhCLENBQVA7QUFrQkg7QUFwQmEsQ0FBbEI7O0FBdUJBLGtEQUFlO0FBQ1hDLHNCQUFBLHdFQURXO0FBRVhDLGVBQUEsaUVBRlc7QUFHWDlDLGNBQUEsZ0VBSFc7QUFJWCtDLGNBQUEsZ0VBSlc7QUFLWEwsd0JBTFc7QUFNWE0sWUFBQSwrREFOVztBQU9YakI7QUFQVyxDQUFmLEMiLCJmaWxlIjoicGl6aS1iYWNrYm9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhY2tib25lXCIpLCByZXF1aXJlKFwidW5kZXJzY29yZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInBpemktYmFja2JvbmVcIiwgW1wiYmFja2JvbmVcIiwgXCJ1bmRlcnNjb3JlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInBpemktYmFja2JvbmVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWNrYm9uZVwiKSwgcmVxdWlyZShcInVuZGVyc2NvcmVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInBpemktYmFja2JvbmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJiYWNrYm9uZVwiXSwgcm9vdFtcInVuZGVyc2NvcmVcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZmNTk5NWI0M2E0ZWIzMTgzODllIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFja2JvbmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWNrYm9uZVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bmRlcnNjb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwiZm9ybVwiLFxuICAgIGluaXRpYWxpemUob3B0aW9ucyA9IHsgZXJyb3JDbGFzczogJ2Vycm9yJywgdmFsaWRhdGU6IFtdIH0pIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgfSwgXy5vbWl0KG9wdGlvbnMsIFsndGVtcGxhdGUnLCAndmFsaWRhdGUnLCAnZXJyb3JDbGFzcyddKSk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgICB0aGlzLnZhbGlkYXRlID0gb3B0aW9ucy52YWxpZGF0ZTtcbiAgICAgICAgdGhpcy5lcnJvckNsYXNzID0gb3B0aW9ucy5lcnJvckNsYXNzO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuc3VibWl0JzogJ3N1Ym1pdCdcbiAgICB9LFxuICAgIGlucHV0RXJyb3IobmFtZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVwiXWApLmNsYXNzTmFtZSArPSAodGhpcy5lcnJvckNsYXNzKTtcbiAgICB9LFxuICAgIGdldFZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgfSxcbiAgICBnZXRPYmplY3QoKSB7XG4gICAgICAgIGxldCBvYmplY3QgPSB7fTtcbiAgICAgICAgXy5lYWNoKHRoaXMuZ2V0VmFsdWVzKCksIChhdHRyaWJ1dGUpID0+IG9iamVjdFthdHRyaWJ1dGUubmFtZV0gPSBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBpbiB0aGlzLnZhbGlkYXRlKSB7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJypbbmFtZT1cIicgKyBydWxlLm5hbWUgKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoZWwubGVuZ3RoICYmICFlbFswXS52YWx1ZS5tYXRjaChydWxlLnJlZ2V4KSkge1xuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZXJyb3JDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnB1c2godGhpcy5lcnJvckNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsICc8c21hbGwgY2xhc3M9XCInICsgdGhpcy5lcnJvckNsYXNzICsgJ1wiPicgKyBydWxlLm1lc3NhZ2UgKyAnPC9zbWFsbD4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVycm9yQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGxldCAkbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoJG5leHQudGFnTmFtZSA9PT0gXCJzbWFsbFwiKSAkbmV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSB2YWxpZDtcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG4gICAgc3VibWl0KHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHBhcmFtcyA9ICFwYXJhbXMuY3VycmVudFRhcmdldCA/IF8uZXh0ZW5kKHRoaXMucGFyYW1zLCBwYXJhbXMpIDogdGhpcy5wYXJhbXM7XG4gICAgICAgIGlmIChwYXJhbXMudHlwZS50b1VwcGVyQ2FzZSgpICE9PSAnR0VUJykgcGFyYW1zLmRhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lbCk7XG4gICAgICAgICQuYWpheChwYXJhbXMpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4ocGFyYW1zLnR5cGUsIHBhcmFtcy51cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtcy5kYXRhKTtcbiAgICB9LFxuICAgIHJlbmRlcihvcHRpb25zID0ge30pIHsgaWYgKHRoaXMudGVtcGxhdGUpIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSk7IH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Gb3JtVmlldy5qcyIsIi8qanNoaW50IGxvb3BmdW5jOiB0cnVlICovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcblxuY29uc3QgTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICAgIGRhdGVzOiBbXSxcbiAgICB2YWxpZGF0ZShhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZGF0ZXMgPSBfLnBpY2soYXR0cnMsIHRoaXMuZGF0ZXMuY29uY2F0KFsnZGF0ZSddKSk7XG4gICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0ZXMpIHtcbiAgICAgICAgICAgIGlmIChkYXRlc1tkYXRlXSAmJiAhKGRhdGVzW2RhdGVdIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2F2ZShhdHRycywgb3B0aW9ucyA9IHsgcGFyc2U6IGZhbHNlIH0pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IChtb2RlbCwgcmVzcCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnJlbGF0aW9ucywgKHJlbGF0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWwuZ2V0KGtleSkgaW5zdGFuY2VvZiByZWxhdGlvbi5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobW9kZWwuZ2V0KGtleSkubW9kZWxzLCAobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zYXZlKG51bGwsIHsgYWxsOiBvcHRpb25zLmFsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MuY2FsbCh0aGlzLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3h5IHRoZSBjYWxsIHRvIHRoZSBvcmlnaW5hbCBzYXZlIGZ1bmN0aW9uXG4gICAgICAgIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5zYXZlLmNhbGwodGhpcywgYXR0cnMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgZmV0Y2gob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSAobW9kZWwsIHJlc3AsIG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5yZWxhdGlvbnMsIChyZWxhdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsLmdldChrZXkpIGluc3RhbmNlb2YgcmVsYXRpb24uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG1vZGVsLmdldChrZXkpLm1vZGVscywgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmV0Y2goeyBhbGw6IG9wdGlvbnMuYWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcy5jYWxsKHRoaXMsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLmZldGNoLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfSxcbiAgICB0b0pTT04ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gaW5zdGFuY2VvZiBCYWNrYm9uZS5Nb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBvcHRpb25zLmFsbCA/IF8ucGljayhhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sIFwiaWRcIikgOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0udG9KU09OKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdIGluc3RhbmNlb2YgQmFja2JvbmUuQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udmVydGVkID0gW107XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5mb3JFYWNoKGF0dHIgPT4gY29udmVydGVkLnB1c2gob3B0aW9ucy5hbGwgPyBfLnBpY2soYXR0ciwgJ2lkJykgOiBhdHRyLnRvSlNPTihvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBjb252ZXJ0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXM7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGtleTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB2YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoYXR0cmlidXRlcyA9IHt9KVtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRzID0gXy5leHRlbmQoeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHJlbGF0aW9ucyA9IF8ua2V5cyh0aGlzLnJlbGF0aW9ucyk7XG4gICAgICAgIF8uZWFjaChhdHRyaWJ1dGVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uY29udGFpbnMocmVsYXRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmluaXRpb24gPSB0aGlzLnJlbGF0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1vZGVsICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3IGRlZmluaXRpb24ubW9kZWwodmFsdWUsIG9wdHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFycmF5IGlzIGEgcmVhbCBhcnJheSAoa2V5ID0gbnVtYmVyKSwgaWYgaXQgaXMgaXQgbXVzdCBiZSBpZCdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0KGtleSkuc2V0KG5ldyBkZWZpbml0aW9uLmNvbGxlY3Rpb24odmFsdWUsIG9wdHMpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24ubW9kZWwgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb24ubW9kZWwpIHx8IGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmFkIG1vZGVsIGRlZmluaXRpb246ICcgKyB0aGlzLmdldCgnY2xhc3NOYW1lJykpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLmNvbmNhdChbJ2RhdGUnXSkuaW5jbHVkZXMoa2V5KSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0gPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNldC5hcHBseSh0aGlzLCBbYXR0cmlidXRlcywgb3B0aW9uc10pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEV4dGVuZCB0aGUgQmFja2JvbmUuTW9kZWwuZXh0ZW5kIG1ldGhvZCwgdG8gYWRkIHNvbWUgdHJlYXRlbWVudCBvbiBpbnN0YW5jZSBjcmVhdGlvblxuICogQHBhcmFtICB7T2JqZWN0fSBtb2RlbERlZmluaXRpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgbW9kZWwgY29uc3RydWN0b3JcbiAqL1xuTW9kZWwuZXh0ZW5kID0gZnVuY3Rpb24obW9kZWxEZWZpbml0aW9uKSB7XG4gICAgLy8gU2V0IGRlZmF1bHRzIGNvbGxlY3Rpb25zIGZvciByZWxhdGlvbnNcbiAgICB2YXIgZGVmYXVsdFJlbGF0aW9ucyA9IHt9O1xuICAgIF8uZWFjaChtb2RlbERlZmluaXRpb24ucmVsYXRpb25zLCAoZGVmaW5pdGlvbiwga2V5KSA9PiB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZGVmYXVsdFJlbGF0aW9uc1trZXldID0gbmV3IGRlZmluaXRpb24uY29sbGVjdGlvbihtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmICEobW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIGRlZmF1bHQgdmFsdWUgZm9yIFwiICsga2V5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF8uZXh0ZW5kKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0cywgZGVmYXVsdFJlbGF0aW9ucyk7XG4gICAgcmV0dXJuIEJhY2tib25lLk1vZGVsLmV4dGVuZC5jYWxsKHRoaXMsIG1vZGVsRGVmaW5pdGlvbik7XG59O1xuXG4vKipcbiAqIFRoZSBDb2xsZWN0aW9uXG4gKiBAdHlwZSB7QmFja2JvbmUuQ29sbGVjdGlvbn1cbiAqL1xuY29uc3QgQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICAvKiBVc2VkIHRvIGluc3RhbmNpYXRlIGEgbmV3IE1vZGVsIGZyb20gSnNvbiAobmVlZCB0byBvdmVycmlkZSBpZiBzdWJ0eXBlcykqL1xuICAgIG1vZGVsOiBNb2RlbFxufSk7XG5cbi8qKlxuICogRXhwb3J0aW5nIHRoZSBNb2RlbCBhbmQgdGhlIENvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIE1vZGVsLFxuICAgIENvbGxlY3Rpb25cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJub3RpZmljYXRpb25cIixcbiAgICBjbGFzc05hbWU6IFwiY29udGFpbmVyLWZsdWlkXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxoMyBjbGFzcz1cIm5vdGlmIDwlPSBjbGFzc05hbWUgJT5cIj48JT0gbWVzc2FnZSAlPjxhIGNsYXNzPVwiY2xvc2VcIj4mdGltZXM7PC9hPjwvaDM+YCksXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0ICRub3RpZiA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ25vdGlmaWNhdGlvbicpWzBdO1xuICAgICAgICBpZiAoISRub3RpZikgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJG5vdGlmO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAzMDAwO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuY2xvc2UnOiAnY2xvc2UnXG4gICAgfSxcbiAgICBjbG9zZShldmVudCwgY2hpbGRFdmVudCkge1xuICAgICAgICBjb25zdCAkbm90aWYgPSBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQucGFyZW50Tm9kZSA6IGV2ZW50O1xuICAgICAgICAkbm90aWYuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUucGFkZGluZ1RvcCA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoJG5vdGlmKTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBzdHlsZXMgJiYgc3R5bGVzLnRyYW5zaXRpb25EdXJhdGlvbiA/IHBhcnNlRmxvYXQoc3R5bGVzLnRyYW5zaXRpb25EdXJhdGlvbikgOiAwO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCRub3RpZiAmJiAkbm90aWYucGFyZW50Tm9kZSkgJG5vdGlmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJG5vdGlmKTtcbiAgICAgICAgfSwgZHVyYXRpb24gKiAxMDAwKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcInN1Y2Nlc3NcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICBlcnJvcihtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwiYWxlcnRcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICB3YXJuKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJ3YXJuaW5nXCIsIG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgbm90aWZ5KG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IG1lc3NhZ2U6IG1lc3NhZ2UgfSwgb3B0aW9ucyk7IH0sXG4gICAgcmVuZGVyKG5vdGlmLCBvcHRpb25zID0ge30pIHtcblxuICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgd3JhcHBlci5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKHsgY2xhc3NOYW1lOiBub3RpZi5jbGFzc05hbWUsIG1lc3NhZ2U6IG5vdGlmLm1lc3NhZ2UgfSk7XG4gICAgICAgIGNvbnN0ICRub3RpZiA9IHdyYXBwZXIubGFzdENoaWxkO1xuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKCRub3RpZik7XG4gICAgICAgIGlmICghb3B0aW9ucy5wZXJtYW5lbnQpIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmNsb3NlKCRub3RpZik7IH0sIG9wdGlvbnMuZHVyYXRpb24gfHwgdGhpcy5kdXJhdGlvbik7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IEZvcm1WaWV3IGZyb20gJy4vRm9ybVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJwb3B1cFwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuXHRcdFx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQgIFx0PGEgY2xhc3M9XCJjbG9zZVwiPiYjMjE1OzwvYT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0XHQ8JSB0ZW1wbGF0ZSA/IHByaW50KHRlbXBsYXRlKSA6IHByaW50KG1lc3NhZ2UpICU+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJhY3Rpb25zXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwib2tcIj5PazwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiY3VzdG9tXCI+PCU9IGN1c3RvbU5hbWUgJT48L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvbGk+XG5cdFx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHQgIDwvZGl2PmApLFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGxldCAkcG9wdXAgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCJwb3B1cFwiKTtcbiAgICAgICAgaWYgKCEkcG9wdXApIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRwb3B1cDtcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLmNsb3NlJzogJ29uQ2xvc2UnLFxuICAgICAgICAnY2xpY2sgLmNhbmNlbCc6ICdvbkNsb3NlJyxcbiAgICAgICAgJ2NsaWNrIC5vayc6ICdvbk9rJyxcbiAgICAgICAgJ2NsaWNrIC5jdXN0b20nOiAnb25DdXN0b20nXG4gICAgfSxcbiAgICBzZXRQYXJhbShwYXJhbXMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGU7XG4gICAgICAgIHRoaXMub2sgPSBwYXJhbXMub2s7XG4gICAgICAgIHRoaXMuY2xvc2UgPSBwYXJhbXMuY2xvc2U7XG4gICAgICAgIHRoaXMuY3VzdG9tID0gcGFyYW1zLmN1c3RvbTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5jbGFzcyk7XG4gICAgICAgIHRoaXMucmVzaXplT2ZmID0gcGFyYW1zLnJlc2l6ZU9mZjtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICBpZiAocGFyYW1zLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmlzZm9ybSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IFBvcHVwRm9ybVZpZXcgPSBGb3JtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybVZpZXcucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0KHBhcmFtcyA9IHt9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtVmlldy5wcm90b3R5cGUuc3VibWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBQb3B1cEZvcm1WaWV3KHBhcmFtcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIEJhY2tib25lLlZpZXcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBwYXJhbXMudGVtcGxhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ICYmIHRoaXMudmlldy5vaykge1xuICAgICAgICAgICAgICAgIHZhciBvayA9IHBhcmFtcy5vaztcbiAgICAgICAgICAgICAgICBwYXJhbXMub2sgPSAoKSA9PiB2aWV3LnZpZXcub2sob2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vayA9IHBhcmFtcy5vayB8fCB0aGlzLm9rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmFzaWMob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW0ob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGZvcm0ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMuaXNmb3JtID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2UpIHRoaXMuY2xvc2UuYXBwbHkodGhpcywgW3RoaXMuY2FsbGJhY2tBcmdzKCldKTtcbiAgICAgICAgdGhpcy5jbG9zZVBvcHVwKCk7XG4gICAgfSxcbiAgICBvbk9rKCkge1xuICAgICAgICBpZiAodGhpcy5vaykgdGhpcy5vay5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICBpZiAodGhpcy50eXBlICE9PSAnZm9ybScgfHwgdGhpcy52aWV3LmlzVmFsaWQpIHRoaXMuY2xvc2VQb3B1cCgpO1xuICAgIH0sXG4gICAgb25DdXN0b20oKSB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbSkgdGhpcy5jdXN0b20uYXBwbHkodGhpcywgW3RoaXMuY2FsbGJhY2tBcmdzKCldKTtcbiAgICAgICAgdGhpcy5jbG9zZVBvcHVwKCk7XG4gICAgfSxcbiAgICBjbG9zZVBvcHVwKCkge1xuICAgICAgICBpZiAodGhpcy52aWV3KSB0aGlzLnZpZXcucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSxcbiAgICBjYWxsYmFja0FyZ3MoKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLnZpZXcuY2hlY2soKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLnZpZXcuZ2V0VmFsdWVzKCkpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH0sXG4gICAgcmVuZGVyQWN0aW9ucyhzdGF0aWNBY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb2snKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vayA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJy5jYW5jZWwnKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5jbG9zZSA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJy5jdXN0b20nKVswXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5jdXN0b20gPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCcuYWN0aW9ucycpWzBdLnN0eWxlLmRpc3BsYXkgPSAhdGhpcy5vayAmJiAhdGhpcy5jbG9zZSAmJiAhdGhpcy5jdXN0b20gPyAnJyA6ICdub25lJztcbiAgICAgICAgaWYgKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnLmFjdGlvbnMnKS5jbGFzc0xpc3QuYWRkKFwic3RhdGljXCIpO1xuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKFwic3RhdGljLWFjdGlvbnNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJy5hY3Rpb25zJykuY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcInN0YXRpYy1hY3Rpb25zXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXIoZGF0YSA9IHt9KSB7XG4gICAgICAgIGRhdGEgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgY3VzdG9tTmFtZTogXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgIH0sIF8ucGljayhkYXRhLCBbJ21lc3NhZ2UnLCAnY3VzdG9tTmFtZScsICd0ZW1wbGF0ZScsICdzdGF0aWNBY3Rpb25zJ10pKTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoZGF0YSk7XG4gICAgICAgIHRoaXMucmVuZGVyQWN0aW9ucyhkYXRhLnN0YXRpY0FjdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJy5jb250ZW50JylbMF0uaW5uZXJIVE1MID0gdGhpcy52aWV3LiRlbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWVzc2FnZSBwdWxzZVwiPjwlPSBtZXNzYWdlICU+PGRpdiBjbGFzcz1cImFuaW1cIj48L2Rpdj48L2Rpdj5gKSxcbiAgICB0YWdOYW1lOiBcIndhaXRcIixcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBsZXQgJGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICBpZiAoJGJvZHkucXVlcnlTZWxlY3RvckFsbCgnd2FpdCcpLmxlbmd0aCA9PT0gMCkgJGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGVsc2UgdGhpcy5lbCA9ICRib2R5LnF1ZXJ5U2VsZWN0b3IoJ3dhaXQnKTtcbiAgICB9LFxuICAgIHN0YXJ0KG1lc3NhZ2UsICRlbCkge1xuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICAgICRlbCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgJHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7IG1lc3NhZ2U6IG1lc3NhZ2UgfHwgJ2xvYWRpbmcuLi4nIH0pO1xuICAgICAgICBsZXQgJHBhcmVudCA9ICRlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3dhaXQtY29udGFpbmVyJyk7XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnaGlkZS1jaGlsZCcpO1xuICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgICBsZXQgJHdhaXQgPSBuZXcgRWxlbWVudChcIndhaXRcIik7XG4gICAgICAgICAgICAkd2FpdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgJHdhaXQuaW5zZXJ0QmVmb3JlKCR0ZW1wbGF0ZSwgJHdhaXQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAkcGFyZW50Lmluc2VydEJlZm9yZSgkd2FpdCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSAkdGVtcGxhdGU7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0b3A6IChjYWxsYmFjaykgPT4gdGhpcy5zdG9wKCRlbCwgY2FsbGJhY2spXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBzdG9wKCRlbCwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfLmlzRnVuY3Rpb24oJGVsKSA/ICRlbCA6IGNhbGxiYWNrO1xuICAgICAgICBsZXQgJHdhaXQgPSAkZWwgJiYgJGVsLnF1ZXJ5U2VsZWN0b3IoJ3dhaXQnKSB8fCB0aGlzLmVsO1xuICAgICAgICBsZXQgJHBhcmVudCA9ICRlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICBsZXQgZWxlbWVudHMgPSAkd2FpdC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZCwgLm1lc3NhZ2UnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgncHVsc2UnKTtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1jaGlsZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnd2FpdC1jb250YWluZXInKTtcbiAgICAgICAgICAgICR3YWl0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICR3YWl0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAoJGVsKSAkd2FpdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCR3YWl0KTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL1dhaXRWaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBXYWl0VmlldyBmcm9tICcuL3ZpZXdzL1dhaXRWaWV3JztcbmltcG9ydCBQb3B1cFZpZXcgZnJvbSAnLi92aWV3cy9Qb3B1cFZpZXcnO1xuaW1wb3J0IE5vdGlmaWNhdGlvblZpZXcgZnJvbSAnLi92aWV3cy9Ob3RpZmljYXRpb25WaWV3JztcbmltcG9ydCBGb3JtVmlldyBmcm9tICcuL3ZpZXdzL0Zvcm1WaWV3JztcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9tb2RlbHMvRW50aXR5JztcblxuLy8gQWRkIHRva2VuIGluIFJFU1QgcmVxdWVzdFxuY29uc3QgdXNlSnd0ID0gKG9wdGlvbnMgPSB7IHRva2VuKCkge30sIG9uVW5hdXRob3JpemVkKCkge30gfSkgPT4ge1xuICAgIGNvbnN0IHN5bmMgPSBCYWNrYm9uZS5zeW5jO1xuICAgIEJhY2tib25lLnN5bmMgPSAobWV0aG9kLCBtb2RlbCwgb3B0cykgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IG9wdGlvbnMudG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuKSBvcHRzLmJlZm9yZVNlbmQgPSAoeGhyKSA9PiB7IHhoci5zZXRSZXF1ZXN0SGVhZGVyKG9wdGlvbnMuaGVhZGVyIHx8ICdhdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pOyB9O1xuICAgICAgICBsZXQgZXJyID0gb3B0cy5lcnJvcjtcbiAgICAgICAgb3B0cy5lcnJvciA9IChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtLnN0YXR1cyAmJiBwYXJhbS5zdGF0dXMgPT09IDQwMSkgb3B0aW9ucy5vblVuYXV0aG9yaXplZCgpO1xuICAgICAgICAgICAgZXJyKHBhcmFtKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3luYyhtZXRob2QsIG1vZGVsLCBvcHRzKTtcbiAgICB9O1xufTtcblxuY29uc3Qgdmlld1V0aWxzID0ge1xuICAgIHRhYmxlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUoYDx0YWJsZSBjbGFzcz1cInt7IGNsYXNzTmFtZSB9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInt7IGNvbHVtbi5jbGFzcyB9fVwiPnt7IGNvbHVtbi5oZWFkZXIgfHwgY29sdW1uLnByb3BlcnR5IH19PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGRhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyeSl7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyBjb2x1bW4udHJhbnNmb3JtID8gY29sdW1uLnRyYW5zZm9ybShlbnRyeVtjb2x1bW4ucHJvcGVydHldKSA6IGVudHJ5W2NvbHVtbi5wcm9wZXJ0eV0gfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5gKShfLmRlZmF1bHRzKG9wdGlvbnMsIHsgY2xhc3NOYW1lOiBcIlwiLCBkYXRhOiBbXSwgY29sdW1uczoge30gfSkpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBOb3RpZmljYXRpb25WaWV3LFxuICAgIFBvcHVwVmlldyxcbiAgICBGb3JtVmlldyxcbiAgICBXYWl0VmlldyxcbiAgICB2aWV3VXRpbHMsXG4gICAgRW50aXR5LFxuICAgIHVzZUp3dFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGl6aS1iYWNrYm9uZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=