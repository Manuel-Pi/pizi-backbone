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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NThmOTA0M2U3N2Q0NTg2YTVjYiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiQmFja2JvbmUiLCJWaWV3IiwiZXh0ZW5kIiwidGFnTmFtZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZXJyb3JDbGFzcyIsInZhbGlkYXRlIiwicGFyYW1zIiwiXyIsInR5cGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY2FjaGUiLCJvbWl0IiwidGVtcGxhdGUiLCJldmVudHMiLCJpbnB1dEVycm9yIiwibmFtZSIsImVycm9yIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwiZ2V0VmFsdWVzIiwiJGVsIiwic2VyaWFsaXplQXJyYXkiLCJnZXRPYmplY3QiLCJvYmplY3QiLCJlYWNoIiwiYXR0cmlidXRlIiwidmFsdWUiLCJjaGVjayIsInZhbGlkIiwicnVsZSIsImxlbmd0aCIsIm1hdGNoIiwicmVnZXgiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInB1c2giLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlIiwicmVtb3ZlIiwiJG5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc1ZhbGlkIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsInRvVXBwZXJDYXNlIiwiZGF0YSIsIkZvcm1EYXRhIiwiJCIsImFqYXgiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJyZW5kZXIiLCJodG1sIiwiTW9kZWwiLCJkYXRlcyIsImF0dHJzIiwicGljayIsImNvbmNhdCIsImRhdGUiLCJEYXRlIiwic2F2ZSIsInBhcnNlIiwiYWxsIiwic3VjY2VzcyIsIm1vZGVsIiwicmVzcCIsIm9wdHMiLCJyZWxhdGlvbnMiLCJyZWxhdGlvbiIsImtleSIsImNvbGxlY3Rpb24iLCJnZXQiLCJtb2RlbHMiLCJjYWxsIiwicHJvdG90eXBlIiwiZmV0Y2giLCJ0b0pTT04iLCJhdHRyaWJ1dGVzIiwiY2xvbmUiLCJoYXNPd25Qcm9wZXJ0eSIsIkNvbGxlY3Rpb24iLCJjb252ZXJ0ZWQiLCJmb3JFYWNoIiwiYXR0ciIsInNldCIsInZhbCIsImtleXMiLCJkZWZpbml0aW9uIiwiT2JqZWN0IiwiQXJyYXkiLCJjb25zb2xlIiwibG9nIiwiaW5jbHVkZXMiLCJhcHBseSIsIm1vZGVsRGVmaW5pdGlvbiIsImRlZmF1bHRSZWxhdGlvbnMiLCJkZWZhdWx0cyIsIiRub3RpZiIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkdXJhdGlvbiIsImNsb3NlIiwiZXZlbnQiLCJjaGlsZEV2ZW50IiwidGFyZ2V0Iiwic3R5bGUiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic2V0VGltZW91dCIsIndhcm4iLCJub3RpZnkiLCJub3RpZiIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibGFzdENoaWxkIiwicGVybWFuZW50IiwiJHBvcHVwIiwicXVlcnlTZWxlY3RvciIsInNldFBhcmFtIiwib2siLCJjdXN0b20iLCJhZGQiLCJjbGFzcyIsInJlc2l6ZU9mZiIsInZpZXciLCJpc2Zvcm0iLCJQb3B1cEZvcm1WaWV3IiwiRm9ybVZpZXciLCJhcmd1bWVudHMiLCJjbG9zZVBvcHVwIiwiYmFzaWMiLCJmb3JtIiwib25DbG9zZSIsImNhbGxiYWNrQXJncyIsIm9uT2siLCJvbkN1c3RvbSIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkaXNwbGF5IiwiY3VzdG9tTmFtZSIsImNzcyIsImZpbmQiLCJkZWxlZ2F0ZUV2ZW50cyIsIiRib2R5Iiwic3RhcnQiLCJFbGVtZW50IiwiJHRlbXBsYXRlIiwiJHBhcmVudCIsIiR3YWl0IiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsInBhcmVudCIsInN0b3AiLCJjYWxsYmFjayIsImlzRnVuY3Rpb24iLCJlbGVtZW50cyIsImkiLCJvcGFjaXR5IiwidXNlSnd0IiwidG9rZW4iLCJvblVuYXV0aG9yaXplZCIsInN5bmMiLCJtZXRob2QiLCJiZWZvcmVTZW5kIiwieGhyIiwiaGVhZGVyIiwiZXJyIiwicGFyYW0iLCJzdGF0dXMiLCJ2aWV3VXRpbHMiLCJ0YWJsZSIsImNvbHVtbnMiLCJOb3RpZmljYXRpb25WaWV3IiwiUG9wdXBWaWV3IiwiV2FpdFZpZXciLCJFbnRpdHkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QUkvSCxnQkFBSixDQUFxQnRELFFBQVFzTCxNQUFSLElBQWtCLGVBQXZDLEVBQXdELFlBQVlOLEtBQXBFO0FBQTZFLFNBQTFHO0FBQ1gsWUFBSU8sTUFBTWhILEtBQUt6RCxLQUFmO0FBQ0F5RCxhQUFLekQsS0FBTCxHQUFhLFVBQUMwSyxLQUFELEVBQVc7QUFDcEIsZ0JBQUlBLE1BQU1DLE1BQU4sSUFBZ0JELE1BQU1DLE1BQU4sS0FBaUIsR0FBckMsRUFBMEN6TCxRQUFRaUwsY0FBUjtBQUMxQ00sZ0JBQUlDLEtBQUo7QUFDSCxTQUhEO0FBSUFOLGFBQUtDLE1BQUwsRUFBYTlHLEtBQWIsRUFBb0JFLElBQXBCO0FBQ0gsS0FURDtBQVVILENBWkQ7O0FBY0EsSUFBTW1ILFlBQVk7QUFDZEMsU0FEYyxpQkFDUjNMLE9BRFEsRUFDQztBQUNYLGVBQU9JLEVBQUVNLFFBQUYsZ2tDQWlCd0JOLEVBQUVpRyxRQUFGLENBQVdyRyxPQUFYLEVBQW9CLEVBQUVpQixXQUFXLEVBQWIsRUFBaUI2QixNQUFNLEVBQXZCLEVBQTJCOEksU0FBUyxFQUFwQyxFQUFwQixDQWpCeEIsQ0FBUDtBQWtCSDtBQXBCYSxDQUFsQjs7QUF1QkEsa0RBQWU7QUFDWEMsc0JBQUEsd0VBRFc7QUFFWEMsZUFBQSxpRUFGVztBQUdYaEQsY0FBQSxnRUFIVztBQUlYaUQsY0FBQSxnRUFKVztBQUtYTCx3QkFMVztBQU1YTSxZQUFBLCtEQU5XO0FBT1hqQjtBQVBXLENBQWYsQyIsImZpbGUiOiJwaXppLWJhY2tib25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFja2JvbmVcIiksIHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwicGl6aS1iYWNrYm9uZVwiLCBbXCJiYWNrYm9uZVwiLCBcInVuZGVyc2NvcmVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicGl6aS1iYWNrYm9uZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhY2tib25lXCIpLCByZXF1aXJlKFwidW5kZXJzY29yZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wicGl6aS1iYWNrYm9uZVwiXSA9IGZhY3Rvcnkocm9vdFtcImJhY2tib25lXCJdLCByb290W1widW5kZXJzY29yZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjU4ZjkwNDNlNzdkNDU4NmE1Y2IiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhY2tib25lXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuZGVyc2NvcmVcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJmb3JtXCIsXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zID0geyBlcnJvckNsYXNzOiAnZXJyb3InLCB2YWxpZGF0ZTogW10gfSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IF8uZXh0ZW5kKHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICB9LCBfLm9taXQob3B0aW9ucywgWyd0ZW1wbGF0ZScsICd2YWxpZGF0ZScsICdlcnJvckNsYXNzJ10pKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBvcHRpb25zLnZhbGlkYXRlO1xuICAgICAgICB0aGlzLmVycm9yQ2xhc3MgPSBvcHRpb25zLmVycm9yQ2xhc3M7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5zdWJtaXQnOiAnc3VibWl0J1xuICAgIH0sXG4gICAgaW5wdXRFcnJvcihuYW1lLCBlcnJvcikge1xuICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoYGlucHV0W25hbWU9XCIke25hbWV9XCJdYCkuY2xhc3NOYW1lICs9ICh0aGlzLmVycm9yQ2xhc3MpO1xuICAgIH0sXG4gICAgZ2V0VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWwuc2VyaWFsaXplQXJyYXkoKTtcbiAgICB9LFxuICAgIGdldE9iamVjdCgpIHtcbiAgICAgICAgbGV0IG9iamVjdCA9IHt9O1xuICAgICAgICBfLmVhY2godGhpcy5nZXRWYWx1ZXMoKSwgKGF0dHJpYnV0ZSkgPT4gb2JqZWN0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfSxcbiAgICBjaGVjaygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBydWxlIGluIHRoaXMudmFsaWRhdGUpIHtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnKltuYW1lPVwiJyArIHJ1bGUubmFtZSArICdcIl0nKTtcbiAgICAgICAgICAgIGlmIChlbC5sZW5ndGggJiYgIWVsWzBdLnZhbHVlLm1hdGNoKHJ1bGUucmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5lcnJvckNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucHVzaCh0aGlzLmVycm9yQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgJzxzbWFsbCBjbGFzcz1cIicgKyB0aGlzLmVycm9yQ2xhc3MgKyAnXCI+JyArIHJ1bGUubWVzc2FnZSArICc8L3NtYWxsPicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZXJyb3JDbGFzcyk7XG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmICgkbmV4dC50YWdOYW1lID09PSBcInNtYWxsXCIpICRuZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IHZhbGlkO1xuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfSxcbiAgICBzdWJtaXQocGFyYW1zID0ge30pIHtcbiAgICAgICAgcGFyYW1zID0gIXBhcmFtcy5jdXJyZW50VGFyZ2V0ID8gXy5leHRlbmQodGhpcy5wYXJhbXMsIHBhcmFtcykgOiB0aGlzLnBhcmFtcztcbiAgICAgICAgaWYgKHBhcmFtcy50eXBlLnRvVXBwZXJDYXNlKCkgIT09ICdHRVQnKSBwYXJhbXMuZGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmVsKTtcbiAgICAgICAgJC5hamF4KHBhcmFtcyk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbihwYXJhbXMudHlwZSwgcGFyYW1zLnVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICAgICAgICByZXF1ZXN0LnNlbmQocGFyYW1zLmRhdGEpO1xuICAgIH0sXG4gICAgcmVuZGVyKG9wdGlvbnMgPSB7fSkgeyBpZiAodGhpcy50ZW1wbGF0ZSkgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKTsgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL0Zvcm1WaWV3LmpzIiwiLypqc2hpbnQgbG9vcGZ1bmM6IHRydWUgKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gXCJiYWNrYm9uZVwiO1xuXG5jb25zdCBNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG4gICAgZGF0ZXM6IFtdLFxuICAgIHZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkYXRlcyA9IF8ucGljayhhdHRycywgdGhpcy5kYXRlcy5jb25jYXQoWydkYXRlJ10pKTtcbiAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRlcykge1xuICAgICAgICAgICAgaWYgKGRhdGVzW2RhdGVdICYmICEoZGF0ZXNbZGF0ZV0gaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzYXZlKGF0dHJzLCBvcHRpb25zID0geyBwYXJzZTogZmFsc2UgfSkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbGwpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzID0gKG1vZGVsLCByZXNwLCBvcHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMucmVsYXRpb25zLCAocmVsYXRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbC5nZXQoa2V5KSBpbnN0YW5jZW9mIHJlbGF0aW9uLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChtb2RlbC5nZXQoa2V5KS5tb2RlbHMsIChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNhdmUobnVsbCwgeyBhbGw6IG9wdGlvbnMuYWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcy5jYWxsKHRoaXMsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJveHkgdGhlIGNhbGwgdG8gdGhlIG9yaWdpbmFsIHNhdmUgZnVuY3Rpb25cbiAgICAgICAgQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNhdmUuY2FsbCh0aGlzLCBhdHRycywgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBmZXRjaChvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IChtb2RlbCwgcmVzcCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnJlbGF0aW9ucywgKHJlbGF0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLmNvbGxlY3Rpb24gJiYgbW9kZWwuZ2V0KGtleSkgaW5zdGFuY2VvZiByZWxhdGlvbi5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobW9kZWwuZ2V0KGtleSkubW9kZWxzLCAobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5mZXRjaCh7IGFsbDogb3B0aW9ucy5hbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzLmNhbGwodGhpcywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuZmV0Y2guY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIHRvSlNPTihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBfLmNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSBpbnN0YW5jZW9mIEJhY2tib25lLk1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IG9wdGlvbnMuYWxsID8gXy5waWNrKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSwgXCJpZFwiKSA6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXS50b0pTT04ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gaW5zdGFuY2VvZiBCYWNrYm9uZS5Db2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb252ZXJ0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdLmZvckVhY2goYXR0ciA9PiBjb252ZXJ0ZWQucHVzaChvcHRpb25zLmFsbCA/IF8ucGljayhhdHRyLCAnaWQnKSA6IGF0dHIudG9KU09OKG9wdGlvbnMpKSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IGNvbnZlcnRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChrZXkgPT09IG51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgYXR0cmlidXRlcztcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzID0ga2V5O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIChhdHRyaWJ1dGVzID0ge30pW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wdHMgPSBfLmV4dGVuZCh7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdGlvbnMpO1xuICAgICAgICB2YXIgcmVsYXRpb25zID0gXy5rZXlzKHRoaXMucmVsYXRpb25zKTtcbiAgICAgICAgXy5lYWNoKGF0dHJpYnV0ZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5jb250YWlucyhyZWxhdGlvbnMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHRoaXMucmVsYXRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubW9kZWwgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBuZXcgZGVmaW5pdGlvbi5tb2RlbCh2YWx1ZSwgb3B0cyksIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYXJyYXkgaXMgYSByZWFsIGFycmF5IChrZXkgPSBudW1iZXIpLCBpZiBpdCBpcyBpdCBtdXN0IGJlIGlkJ3MgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoa2V5KS5zZXQobmV3IGRlZmluaXRpb24uY29sbGVjdGlvbih2YWx1ZSwgb3B0cykpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi5tb2RlbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbi5tb2RlbCkgfHwgZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmICEodmFsdWUgaW5zdGFuY2VvZiBkZWZpbml0aW9uLmNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCYWQgbW9kZWwgZGVmaW5pdGlvbjogJyArIHRoaXMuZ2V0KCdjbGFzc05hbWUnKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMuY29uY2F0KFsnZGF0ZSddKS5pbmNsdWRlcyhrZXkpICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNba2V5XSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuc2V0LmFwcGx5KHRoaXMsIFthdHRyaWJ1dGVzLCBvcHRpb25zXSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogRXh0ZW5kIHRoZSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQgbWV0aG9kLCB0byBhZGQgc29tZSB0cmVhdGVtZW50IG9uIGluc3RhbmNlIGNyZWF0aW9uXG4gKiBAcGFyYW0gIHtPYmplY3R9IG1vZGVsRGVmaW5pdGlvblxuICogQHJldHVybiB7ZnVuY3Rpb259IHRoZSBtb2RlbCBjb25zdHJ1Y3RvclxuICovXG5Nb2RlbC5leHRlbmQgPSBmdW5jdGlvbihtb2RlbERlZmluaXRpb24pIHtcbiAgICAvLyBTZXQgZGVmYXVsdHMgY29sbGVjdGlvbnMgZm9yIHJlbGF0aW9uc1xuICAgIHZhciBkZWZhdWx0UmVsYXRpb25zID0ge307XG4gICAgXy5lYWNoKG1vZGVsRGVmaW5pdGlvbi5yZWxhdGlvbnMsIChkZWZpbml0aW9uLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBkZWZhdWx0UmVsYXRpb25zW2tleV0gPSBuZXcgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgIShtb2RlbERlZmluaXRpb24uZGVmYXVsdHNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYWQgZGVmYXVsdCB2YWx1ZSBmb3IgXCIgKyBrZXkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXy5leHRlbmQobW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzLCBkZWZhdWx0UmVsYXRpb25zKTtcbiAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwuZXh0ZW5kLmNhbGwodGhpcywgbW9kZWxEZWZpbml0aW9uKTtcbn07XG5cbi8qKlxuICogVGhlIENvbGxlY3Rpb25cbiAqIEB0eXBlIHtCYWNrYm9uZS5Db2xsZWN0aW9ufVxuICovXG5jb25zdCBDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIC8qIFVzZWQgdG8gaW5zdGFuY2lhdGUgYSBuZXcgTW9kZWwgZnJvbSBKc29uIChuZWVkIHRvIG92ZXJyaWRlIGlmIHN1YnR5cGVzKSovXG4gICAgbW9kZWw6IE1vZGVsXG59KTtcblxuLyoqXG4gKiBFeHBvcnRpbmcgdGhlIE1vZGVsIGFuZCB0aGUgQ29sbGVjdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgTW9kZWwsXG4gICAgQ29sbGVjdGlvblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL0VudGl0eS5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgIGNsYXNzTmFtZTogXCJjb250YWluZXItZmx1aWRcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGgzIGNsYXNzPVwibm90aWYgPCU9IGNsYXNzTmFtZSAlPlwiPjwlPSBtZXNzYWdlICU+PGEgY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L2E+PC9oMz5gKSxcbiAgICBpbml0aWFsaXplKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgJG5vdGlmID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbm90aWZpY2F0aW9uJylbMF07XG4gICAgICAgIGlmICghJG5vdGlmKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkbm90aWY7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IDMwMDA7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5jbG9zZSc6ICdjbG9zZSdcbiAgICB9LFxuICAgIGNsb3NlKGV2ZW50LCBjaGlsZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRub3RpZiA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlIDogZXZlbnQ7XG4gICAgICAgICRub3RpZi5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSgkbm90aWYpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHN0eWxlcyAmJiBzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uID8gcGFyc2VGbG9hdChzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uKSA6IDA7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJG5vdGlmICYmICRub3RpZi5wYXJlbnROb2RlKSAkbm90aWYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkbm90aWYpO1xuICAgICAgICB9LCBkdXJhdGlvbiAqIDEwMDApO1xuICAgIH0sXG4gICAgc3VjY2VzcyhtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwic3VjY2Vzc1wiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIGVycm9yKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJhbGVydFwiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIHdhcm4obWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcIndhcm5pbmdcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICBub3RpZnkobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICByZW5kZXIobm90aWYsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3cmFwcGVyLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoeyBjbGFzc05hbWU6IG5vdGlmLmNsYXNzTmFtZSwgbWVzc2FnZTogbm90aWYubWVzc2FnZSB9KTtcbiAgICAgICAgY29uc3QgJG5vdGlmID0gd3JhcHBlci5sYXN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoJG5vdGlmKTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBlcm1hbmVudCkgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2xvc2UoJG5vdGlmKTsgfSwgb3B0aW9ucy5kdXJhdGlvbiB8fCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvTm90aWZpY2F0aW9uVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgRm9ybVZpZXcgZnJvbSAnLi9Gb3JtVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcInBvcHVwXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cdFx0XHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cblx0XHRcdFx0XHRcdCAgXHQ8YSBjbGFzcz1cImNsb3NlXCI+JiMyMTU7PC9hPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHRcdDwlIHRlbXBsYXRlID8gcHJpbnQodGVtcGxhdGUpIDogcHJpbnQobWVzc2FnZSkgJT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cImFjdGlvbnNcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJva1wiPk9rPC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJjdXN0b21cIj48JT0gY3VzdG9tTmFtZSAlPjwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9saT5cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdCAgPC9kaXY+YCksXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgbGV0ICRwb3B1cCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcInBvcHVwXCIpO1xuICAgICAgICBpZiAoISRwb3B1cCkgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJHBvcHVwO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuY2xvc2UnOiAnb25DbG9zZScsXG4gICAgICAgICdjbGljayAuY2FuY2VsJzogJ29uQ2xvc2UnLFxuICAgICAgICAnY2xpY2sgLm9rJzogJ29uT2snLFxuICAgICAgICAnY2xpY2sgLmN1c3RvbSc6ICdvbkN1c3RvbSdcbiAgICB9LFxuICAgIHNldFBhcmFtKHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZTtcbiAgICAgICAgdGhpcy5vayA9IHBhcmFtcy5vaztcbiAgICAgICAgdGhpcy5jbG9zZSA9IHBhcmFtcy5jbG9zZTtcbiAgICAgICAgdGhpcy5jdXN0b20gPSBwYXJhbXMuY3VzdG9tO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLmNsYXNzKTtcbiAgICAgICAgdGhpcy5yZXNpemVPZmYgPSBwYXJhbXMucmVzaXplT2ZmO1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIGlmIChwYXJhbXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaXNmb3JtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgUG9wdXBGb3JtVmlldyA9IEZvcm1WaWV3LmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQocGFyYW1zID0ge30pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1WaWV3LnByb3RvdHlwZS5zdWJtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvcHVwRm9ybVZpZXcocGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnRlbXBsYXRlIGluc3RhbmNlb2YgQmFja2JvbmUuVmlldykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IHBhcmFtcy50ZW1wbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgJiYgdGhpcy52aWV3Lm9rKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9rID0gcGFyYW1zLm9rO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5vayA9ICgpID0+IHZpZXcudmlldy5vayhvayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9rID0gcGFyYW1zLm9rIHx8IHRoaXMub2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYXNpYyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZm9ybShvcHRpb25zID0ge30pIHtcbiAgICAgICAgb3B0aW9ucy5pc2Zvcm0gPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFBhcmFtKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZSkgdGhpcy5jbG9zZS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uT2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9rKSB0aGlzLm9rLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdmb3JtJyB8fCB0aGlzLnZpZXcuaXNWYWxpZCkgdGhpcy5jbG9zZVBvcHVwKCk7XG4gICAgfSxcbiAgICBvbkN1c3RvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tKSB0aGlzLmN1c3RvbS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHRoaXMudmlldy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9LFxuICAgIGNhbGxiYWNrQXJncygpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Zvcm0nKSB7XG4gICAgICAgICAgICB2YWxpZCA9IHRoaXMudmlldy5jaGVjaygpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMudmlldy5nZXRWYWx1ZXMoKSk7XG4gICAgICAgICAgICBhcmdzLnB1c2godmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgfSxcbiAgICByZW5kZXJBY3Rpb25zKHN0YXRpY0FjdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvaycpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9rID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnLmNhbmNlbCcpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmNsb3NlID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnLmN1c3RvbScpWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmN1c3RvbSA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJy5hY3Rpb25zJylbMF0uc3R5bGUuZGlzcGxheSA9ICF0aGlzLm9rICYmICF0aGlzLmNsb3NlICYmICF0aGlzLmN1c3RvbSA/ICcnIDogJ25vbmUnO1xuICAgICAgICBpZiAoc3RhdGljQWN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCcuYWN0aW9ucycpLmNsYXNzTGlzdC5hZGQoXCJzdGF0aWNcIik7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJzdGF0aWMtYWN0aW9uc1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnLmFjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKFwic3RhdGljXCIpO1xuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFwic3RhdGljLWFjdGlvbnNcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcihkYXRhID0ge30pIHtcbiAgICAgICAgZGF0YSA9IF8uZXh0ZW5kKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgICAgICBjdXN0b21OYW1lOiBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgfSwgXy5waWNrKGRhdGEsIFsnbWVzc2FnZScsICdjdXN0b21OYW1lJywgJ3RlbXBsYXRlJywgJ3N0YXRpY0FjdGlvbnMnXSkpO1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoZGF0YSkpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyQWN0aW9ucyhkYXRhLnN0YXRpY0FjdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLiRlbC5maW5kKCcuY29udGVudCcpLmh0bWwodGhpcy52aWV3LiRlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Qb3B1cFZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9kaXY+PGRpdiBjbGFzcz1cIm1lc3NhZ2UgcHVsc2VcIj48JT0gbWVzc2FnZSAlPjxkaXYgY2xhc3M9XCJhbmltXCI+PC9kaXY+PC9kaXY+YCksXG4gICAgdGFnTmFtZTogXCJ3YWl0XCIsXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgbGV0ICRib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgaWYgKCRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3dhaXQnKS5sZW5ndGggPT09IDApICRib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkYm9keS5xdWVyeVNlbGVjdG9yKCd3YWl0Jyk7XG4gICAgfSxcbiAgICBzdGFydChtZXNzYWdlLCAkZWwpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAkZWwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0ICR0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoeyBtZXNzYWdlOiBtZXNzYWdlIHx8ICdsb2FkaW5nLi4uJyB9KTtcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkZWwgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QuYWRkKCd3YWl0LWNvbnRhaW5lcicpO1xuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUtY2hpbGQnKTtcbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgICAgbGV0ICR3YWl0ID0gbmV3IEVsZW1lbnQoXCJ3YWl0XCIpO1xuICAgICAgICAgICAgJHdhaXQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICR3YWl0Lmluc2VydEJlZm9yZSgkdGVtcGxhdGUsICR3YWl0LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgJHBhcmVudC5pbnNlcnRCZWZvcmUoJHdhaXQsIHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJHRlbXBsYXRlO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdG9wOiAoY2FsbGJhY2spID0+IHRoaXMuc3RvcCgkZWwsIGNhbGxiYWNrKVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgc3RvcCgkZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gXy5pc0Z1bmN0aW9uKCRlbCkgPyAkZWwgOiBjYWxsYmFjaztcbiAgICAgICAgbGV0ICR3YWl0ID0gJGVsICYmICRlbC5xdWVyeVNlbGVjdG9yKCd3YWl0JykgfHwgdGhpcy5lbDtcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkZWwgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHdhaXQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQsIC5tZXNzYWdlJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3B1bHNlJyk7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtY2hpbGQnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3dhaXQtY29udGFpbmVyJyk7XG4gICAgICAgICAgICAkd2FpdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAkd2FpdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKCRlbCkgJHdhaXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkd2FpdCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9XYWl0Vmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgV2FpdFZpZXcgZnJvbSAnLi92aWV3cy9XYWl0Vmlldyc7XG5pbXBvcnQgUG9wdXBWaWV3IGZyb20gJy4vdmlld3MvUG9wdXBWaWV3JztcbmltcG9ydCBOb3RpZmljYXRpb25WaWV3IGZyb20gJy4vdmlld3MvTm90aWZpY2F0aW9uVmlldyc7XG5pbXBvcnQgRm9ybVZpZXcgZnJvbSAnLi92aWV3cy9Gb3JtVmlldyc7XG5pbXBvcnQgRW50aXR5IGZyb20gJy4vbW9kZWxzL0VudGl0eSc7XG5cbi8vIEFkZCB0b2tlbiBpbiBSRVNUIHJlcXVlc3RcbmNvbnN0IHVzZUp3dCA9IChvcHRpb25zID0geyB0b2tlbigpIHt9LCBvblVuYXV0aG9yaXplZCgpIHt9IH0pID0+IHtcbiAgICBjb25zdCBzeW5jID0gQmFja2JvbmUuc3luYztcbiAgICBCYWNrYm9uZS5zeW5jID0gKG1ldGhvZCwgbW9kZWwsIG9wdHMpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBvcHRpb25zLnRva2VuKCk7XG4gICAgICAgIGlmICh0b2tlbikgb3B0cy5iZWZvcmVTZW5kID0gKHhocikgPT4geyB4aHIuc2V0UmVxdWVzdEhlYWRlcihvcHRpb25zLmhlYWRlciB8fCAnYXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTsgfTtcbiAgICAgICAgbGV0IGVyciA9IG9wdHMuZXJyb3I7XG4gICAgICAgIG9wdHMuZXJyb3IgPSAocGFyYW0pID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbS5zdGF0dXMgJiYgcGFyYW0uc3RhdHVzID09PSA0MDEpIG9wdGlvbnMub25VbmF1dGhvcml6ZWQoKTtcbiAgICAgICAgICAgIGVycihwYXJhbSk7XG4gICAgICAgIH07XG4gICAgICAgIHN5bmMobWV0aG9kLCBtb2RlbCwgb3B0cyk7XG4gICAgfTtcbn07XG5cbmNvbnN0IHZpZXdVdGlscyA9IHtcbiAgICB0YWJsZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfLnRlbXBsYXRlKGA8dGFibGUgY2xhc3M9XCJ7eyBjbGFzc05hbWUgfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4peyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ7eyBjb2x1bW4uY2xhc3MgfX1cIj57eyBjb2x1bW4uaGVhZGVyIHx8IGNvbHVtbi5wcm9wZXJ0eSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBkYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cnkpeyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7ICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgY29sdW1uLnRyYW5zZm9ybSA/IGNvbHVtbi50cmFuc2Zvcm0oZW50cnlbY29sdW1uLnByb3BlcnR5XSkgOiBlbnRyeVtjb2x1bW4ucHJvcGVydHldIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIH0pICU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+YCkoXy5kZWZhdWx0cyhvcHRpb25zLCB7IGNsYXNzTmFtZTogXCJcIiwgZGF0YTogW10sIGNvbHVtbnM6IHt9IH0pKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgTm90aWZpY2F0aW9uVmlldyxcbiAgICBQb3B1cFZpZXcsXG4gICAgRm9ybVZpZXcsXG4gICAgV2FpdFZpZXcsXG4gICAgdmlld1V0aWxzLFxuICAgIEVudGl0eSxcbiAgICB1c2VKd3Rcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BpemktYmFja2JvbmUuanMiXSwic291cmNlUm9vdCI6IiJ9