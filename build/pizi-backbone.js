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
    table: function table() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { className: "", columns: [], data: [] };

        return _.template('<table class="{{ className }}">\n                                <thead>\n                                    <tr>\n                                        <% columns.forEach(function(column){ %>\n                                            <th class="{{ column.class }}">{{ column.header || column.property }}</th>\n                                            <% }) %>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <% data.forEach(function(entry){ %>\n                                        <tr>\n                                            <% columns.forEach(function(column){ %>\n                                                <td>{{ column.transform ? column.transform(entry[column.property]) : entry[column.property] }}</td>\n                                                <% }) %>\n                                        </tr>\n                                        <% }) %>\n                                </tbody>\n                            </table>')(options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiODg1YjI1NTczZWUxYjhiMzQ5YSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrYm9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuZGVyc2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvRm9ybVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1BvcHVwVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BpemktYmFja2JvbmUuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJCYWNrYm9uZSIsImV4dGVuZCIsImRhdGVzIiwidmFsaWRhdGUiLCJhdHRycyIsIm9wdGlvbnMiLCJfIiwicGljayIsImNvbmNhdCIsImRhdGUiLCJEYXRlIiwic2F2ZSIsInBhcnNlIiwiYWxsIiwic3VjY2VzcyIsIm1vZGVsIiwicmVzcCIsIm9wdHMiLCJlYWNoIiwicmVsYXRpb25zIiwicmVsYXRpb24iLCJrZXkiLCJjb2xsZWN0aW9uIiwiZ2V0IiwibW9kZWxzIiwiY2FsbCIsInByb3RvdHlwZSIsImZldGNoIiwidG9KU09OIiwiYXR0cmlidXRlcyIsImNsb25lIiwiYXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJDb2xsZWN0aW9uIiwiY29udmVydGVkIiwiZm9yRWFjaCIsInB1c2giLCJhdHRyIiwic2V0IiwidmFsIiwia2V5cyIsInZhbHVlIiwiY29udGFpbnMiLCJkZWZpbml0aW9uIiwiT2JqZWN0IiwiQXJyYXkiLCJjb25zb2xlIiwibG9nIiwiaW5jbHVkZXMiLCJhcHBseSIsIm1vZGVsRGVmaW5pdGlvbiIsImRlZmF1bHRSZWxhdGlvbnMiLCJkZWZhdWx0cyIsIlZpZXciLCJ0YWdOYW1lIiwiaW5pdGlhbGl6ZSIsImVycm9yQ2xhc3MiLCJwYXJhbXMiLCJ0eXBlIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsImNhY2hlIiwib21pdCIsInRlbXBsYXRlIiwiZXZlbnRzIiwiaW5wdXRFcnJvciIsIm5hbWUiLCJlcnJvciIsImVsIiwicXVlcnlTZWxlY3RvckFsbCIsImNsYXNzTmFtZSIsImdldFZhbHVlcyIsIiRlbCIsInNlcmlhbGl6ZUFycmF5IiwiZ2V0T2JqZWN0Iiwib2JqZWN0IiwiY2hlY2siLCJ2YWxpZCIsInJ1bGUiLCJsZW5ndGgiLCJtYXRjaCIsInJlZ2V4IiwiY2xhc3NMaXN0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwibWVzc2FnZSIsInJlbW92ZSIsIiRuZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaXNWYWxpZCIsInN1Ym1pdCIsImN1cnJlbnRUYXJnZXQiLCJ0b1VwcGVyQ2FzZSIsImRhdGEiLCJGb3JtRGF0YSIsIiQiLCJhamF4IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInVybCIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicmVuZGVyIiwiaHRtbCIsIiRub3RpZiIsImRvY3VtZW50IiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkdXJhdGlvbiIsImNsb3NlIiwiZXZlbnQiLCJjaGlsZEV2ZW50IiwidGFyZ2V0Iiwic3R5bGUiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic2V0VGltZW91dCIsIndhcm4iLCJub3RpZnkiLCJub3RpZiIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibGFzdENoaWxkIiwicGVybWFuZW50IiwiJHBvcHVwIiwicXVlcnlTZWxlY3RvciIsInNldFBhcmFtIiwib2siLCJjdXN0b20iLCJhZGQiLCJjbGFzcyIsInJlc2l6ZU9mZiIsInZpZXciLCJpc2Zvcm0iLCJQb3B1cEZvcm1WaWV3IiwiRm9ybVZpZXciLCJhcmd1bWVudHMiLCJjbG9zZVBvcHVwIiwiYmFzaWMiLCJmb3JtIiwib25DbG9zZSIsImNhbGxiYWNrQXJncyIsIm9uT2siLCJvbkN1c3RvbSIsImNzcyIsImFyZ3MiLCJyZW5kZXJBY3Rpb25zIiwic3RhdGljQWN0aW9ucyIsImZpbmQiLCJjdXN0b21OYW1lIiwiZGVsZWdhdGVFdmVudHMiLCIkYm9keSIsInN0YXJ0IiwiRWxlbWVudCIsIiR0ZW1wbGF0ZSIsIiRwYXJlbnQiLCIkd2FpdCIsImRpc3BsYXkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwicGFyZW50Iiwic3RvcCIsImNhbGxiYWNrIiwiaXNGdW5jdGlvbiIsImVsZW1lbnRzIiwiaSIsIm9wYWNpdHkiLCJ1c2VKd3QiLCJ0b2tlbiIsIm9uVW5hdXRob3JpemVkIiwic3luYyIsIm1ldGhvZCIsImJlZm9yZVNlbmQiLCJ4aHIiLCJoZWFkZXIiLCJlcnIiLCJwYXJhbSIsInN0YXR1cyIsInZpZXdVdGlscyIsInRhYmxlIiwiY29sdW1ucyIsIk5vdGlmaWNhdGlvblZpZXciLCJQb3B1cFZpZXciLCJXYWl0VmlldyIsIkVudGl0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLHFDOzs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLGdEQUFBQyxDQUFTRCxLQUFULENBQWVFLE1BQWYsQ0FBc0I7QUFDaENDLFdBQU8sRUFEeUI7QUFFaENDLFlBRmdDLG9CQUV2QkMsS0FGdUIsRUFFaEJDLE9BRmdCLEVBRVA7QUFDckIsWUFBSUgsUUFBUUksRUFBRUMsSUFBRixDQUFPSCxLQUFQLEVBQWMsS0FBS0YsS0FBTCxDQUFXTSxNQUFYLENBQWtCLENBQUMsTUFBRCxDQUFsQixDQUFkLENBQVo7QUFDQSxhQUFLLElBQUlDLElBQVQsSUFBaUJQLEtBQWpCLEVBQXdCO0FBQ3BCLGdCQUFJQSxNQUFNTyxJQUFOLEtBQWUsRUFBRVAsTUFBTU8sSUFBTixhQUF1QkMsSUFBekIsQ0FBbkIsRUFBbUQ7QUFDL0MsdUJBQU9ELElBQVA7QUFDSDtBQUNKO0FBQ0osS0FUK0I7QUFVaENFLFFBVmdDLGdCQVUzQlAsS0FWMkIsRUFVUTtBQUFBOztBQUFBLFlBQTVCQyxPQUE0Qix1RUFBbEIsRUFBRU8sT0FBTyxLQUFULEVBQWtCOztBQUNwQyxZQUFJUCxRQUFRUSxHQUFaLEVBQWlCO0FBQ2IsZ0JBQUlDLFVBQVVULFFBQVFTLE9BQXRCO0FBQ0FULG9CQUFRUyxPQUFSLEdBQWtCLFVBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjQyxJQUFkLEVBQXVCO0FBQ3JDWCxrQkFBRVksSUFBRixDQUFPLE1BQUtDLFNBQVosRUFBdUIsVUFBQ0MsUUFBRCxFQUFXQyxHQUFYLEVBQW1CO0FBQ3RDLHdCQUFJRCxTQUFTRSxVQUFULElBQXVCUCxNQUFNUSxHQUFOLENBQVVGLEdBQVYsYUFBMEJELFNBQVNFLFVBQTlELEVBQTBFO0FBQ3RFaEIsMEJBQUVZLElBQUYsQ0FBT0gsTUFBTVEsR0FBTixDQUFVRixHQUFWLEVBQWVHLE1BQXRCLEVBQThCLFVBQUNULEtBQUQsRUFBVztBQUNyQ0Esa0NBQU1KLElBQU4sQ0FBVyxJQUFYLEVBQWlCLEVBQUVFLEtBQUtSLFFBQVFRLEdBQWYsRUFBakI7QUFDSCx5QkFGRDtBQUdIO0FBQ0osaUJBTkQ7QUFPQSxvQkFBSUMsT0FBSixFQUFhQSxRQUFRVyxJQUFSLFFBQW1CVixLQUFuQixFQUEwQkMsSUFBMUIsRUFBZ0NYLE9BQWhDO0FBQ2hCLGFBVEQ7QUFVSDtBQUNEO0FBQ0FMLFFBQUEsZ0RBQUFBLENBQVNELEtBQVQsQ0FBZTJCLFNBQWYsQ0FBeUJmLElBQXpCLENBQThCYyxJQUE5QixDQUFtQyxJQUFuQyxFQUF5Q3JCLEtBQXpDLEVBQWdEQyxPQUFoRDtBQUNILEtBMUIrQjtBQTJCaENzQixTQTNCZ0MsbUJBMkJaO0FBQUE7O0FBQUEsWUFBZHRCLE9BQWMsdUVBQUosRUFBSTs7QUFDaEIsWUFBSUEsUUFBUVEsR0FBWixFQUFpQjtBQUNiLGdCQUFJQyxVQUFVVCxRQUFRUyxPQUF0QjtBQUNBVCxvQkFBUVMsT0FBUixHQUFrQixVQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBY0MsSUFBZCxFQUF1QjtBQUNyQ1gsa0JBQUVZLElBQUYsQ0FBTyxPQUFLQyxTQUFaLEVBQXVCLFVBQUNDLFFBQUQsRUFBV0MsR0FBWCxFQUFtQjtBQUN0Qyx3QkFBSUQsU0FBU0UsVUFBVCxJQUF1QlAsTUFBTVEsR0FBTixDQUFVRixHQUFWLGFBQTBCRCxTQUFTRSxVQUE5RCxFQUEwRTtBQUN0RWhCLDBCQUFFWSxJQUFGLENBQU9ILE1BQU1RLEdBQU4sQ0FBVUYsR0FBVixFQUFlRyxNQUF0QixFQUE4QixVQUFDVCxLQUFELEVBQVc7QUFDckNBLGtDQUFNWSxLQUFOLENBQVksRUFBRWQsS0FBS1IsUUFBUVEsR0FBZixFQUFaO0FBQ0gseUJBRkQ7QUFHSDtBQUNKLGlCQU5EO0FBT0Esb0JBQUlDLE9BQUosRUFBYUEsUUFBUVcsSUFBUixTQUFtQlYsS0FBbkIsRUFBMEJDLElBQTFCLEVBQWdDWCxPQUFoQztBQUNoQixhQVREO0FBVUg7QUFDREwsUUFBQSxnREFBQUEsQ0FBU0QsS0FBVCxDQUFlMkIsU0FBZixDQUF5QkMsS0FBekIsQ0FBK0JGLElBQS9CLENBQW9DLElBQXBDLEVBQTBDcEIsT0FBMUM7QUFDSCxLQTFDK0I7QUEyQ2hDdUIsVUEzQ2dDLG9CQTJDWDtBQUFBLFlBQWR2QixPQUFjLHVFQUFKLEVBQUk7O0FBQ2pCLFlBQUl3QixhQUFhdkIsRUFBRXdCLEtBQUYsQ0FBUSxLQUFLRCxVQUFiLENBQWpCO0FBQ0EsYUFBSyxJQUFJRSxTQUFULElBQXNCRixVQUF0QixFQUFrQztBQUM5QixnQkFBSUEsV0FBV0csY0FBWCxDQUEwQkQsU0FBMUIsQ0FBSixFQUEwQztBQUN0QyxvQkFBSUYsV0FBV0UsU0FBWCxhQUFpQyxnREFBQS9CLENBQVNELEtBQTlDLEVBQXFEO0FBQ2pEOEIsK0JBQVdFLFNBQVgsSUFBd0IxQixRQUFRUSxHQUFSLEdBQWNQLEVBQUVDLElBQUYsQ0FBT3NCLFdBQVdFLFNBQVgsQ0FBUCxFQUE4QixJQUE5QixDQUFkLEdBQW9ERixXQUFXRSxTQUFYLEVBQXNCSCxNQUF0QixDQUE2QnZCLE9BQTdCLENBQTVFO0FBQ0gsaUJBRkQsTUFFTyxJQUFJd0IsV0FBV0UsU0FBWCxhQUFpQyxnREFBQS9CLENBQVNpQyxVQUE5QyxFQUEwRDtBQUM3RCx3QkFBSUMsWUFBWSxFQUFoQjtBQUNBTCwrQkFBV0UsU0FBWCxFQUFzQkksT0FBdEIsQ0FBOEI7QUFBQSwrQkFBUUQsVUFBVUUsSUFBVixDQUFlL0IsUUFBUVEsR0FBUixHQUFjUCxFQUFFQyxJQUFGLENBQU84QixJQUFQLEVBQWEsSUFBYixDQUFkLEdBQW1DQSxLQUFLVCxNQUFMLENBQVl2QixPQUFaLENBQWxELENBQVI7QUFBQSxxQkFBOUI7QUFDQXdCLCtCQUFXRSxTQUFYLElBQXdCRyxTQUF4QjtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU9MLFVBQVA7QUFDSCxLQXpEK0I7O0FBMERoQ1MsU0FBSyxhQUFTakIsR0FBVCxFQUFja0IsR0FBZCxFQUFtQmxDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQzdCLFlBQUlnQixRQUFRLElBQVosRUFBa0IsT0FBTyxJQUFQO0FBQ2xCLFlBQUlRLFVBQUo7QUFDQSxZQUFJLFFBQU9SLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFuQixFQUE2QjtBQUN6QlEseUJBQWFSLEdBQWI7QUFDQWhCLHNCQUFVa0MsR0FBVjtBQUNILFNBSEQsTUFHTztBQUNILGFBQUNWLGFBQWEsRUFBZCxFQUFrQlIsR0FBbEIsSUFBeUJrQixHQUF6QjtBQUNIO0FBQ0QsWUFBSXRCLE9BQU9YLEVBQUVMLE1BQUYsQ0FBUyxFQUFFRSxVQUFVLElBQVosRUFBVCxFQUE2QkUsT0FBN0IsQ0FBWDtBQUNBLFlBQUljLFlBQVliLEVBQUVrQyxJQUFGLENBQU8sS0FBS3JCLFNBQVosQ0FBaEI7QUFDQWIsVUFBRVksSUFBRixDQUFPVyxVQUFQLEVBQW1CLFVBQUNZLEtBQUQsRUFBUXBCLEdBQVIsRUFBZ0I7QUFDL0IsZ0JBQUlmLEVBQUVvQyxRQUFGLENBQVd2QixTQUFYLEVBQXNCRSxHQUF0QixDQUFKLEVBQWdDO0FBQzVCLG9CQUFJc0IsYUFBYSxPQUFLeEIsU0FBTCxDQUFlRSxHQUFmLENBQWpCO0FBQ0Esb0JBQUlzQixXQUFXNUIsS0FBWCxJQUFvQjBCLGlCQUFpQkcsTUFBekMsRUFBaUQ7QUFDN0MsMkJBQUtOLEdBQUwsQ0FBU2pCLEdBQVQsRUFBYyxJQUFJc0IsV0FBVzVCLEtBQWYsQ0FBcUIwQixLQUFyQixFQUE0QnhCLElBQTVCLENBQWQsRUFBaURBLElBQWpEO0FBQ0EsMkJBQU9ZLFdBQVdSLEdBQVgsQ0FBUDtBQUNILGlCQUhELE1BR08sSUFBSXNCLFdBQVdyQixVQUFYLElBQXlCbUIsaUJBQWlCSSxLQUE5QyxFQUFxRDtBQUN4RDtBQUNBLDJCQUFLdEIsR0FBTCxDQUFTRixHQUFULEVBQWNpQixHQUFkLENBQWtCLElBQUlLLFdBQVdyQixVQUFmLENBQTBCbUIsS0FBMUIsRUFBaUN4QixJQUFqQyxDQUFsQjtBQUNBLDJCQUFPWSxXQUFXUixHQUFYLENBQVA7QUFDSCxpQkFKTSxNQUlBLElBQUlzQixXQUFXNUIsS0FBWCxJQUFvQixFQUFFMEIsaUJBQWlCRSxXQUFXNUIsS0FBOUIsQ0FBcEIsSUFBNEQ0QixXQUFXckIsVUFBWCxJQUF5QixFQUFFbUIsaUJBQWlCRSxXQUFXckIsVUFBOUIsQ0FBekYsRUFBb0k7QUFDdkl3Qiw0QkFBUUMsR0FBUixDQUFZLDJCQUEyQixPQUFLeEIsR0FBTCxDQUFTLFdBQVQsQ0FBdkM7QUFDQSwyQkFBT00sV0FBV1IsR0FBWCxDQUFQO0FBQ0g7QUFDSjtBQUNELGdCQUFJLE9BQUtuQixLQUFMLENBQVdNLE1BQVgsQ0FBa0IsQ0FBQyxNQUFELENBQWxCLEVBQTRCd0MsUUFBNUIsQ0FBcUMzQixHQUFyQyxLQUE2QyxFQUFFb0IsaUJBQWlCL0IsSUFBbkIsQ0FBakQsRUFBMkU7QUFDdkVtQiwyQkFBV1IsR0FBWCxJQUFrQixJQUFJWCxJQUFKLENBQVMrQixLQUFULENBQWxCO0FBQ0g7QUFDSixTQWxCRCxFQWtCRyxJQWxCSDtBQW1CQSxlQUFPLGdEQUFBekMsQ0FBU0QsS0FBVCxDQUFlMkIsU0FBZixDQUF5QlksR0FBekIsQ0FBNkJXLEtBQTdCLENBQW1DLElBQW5DLEVBQXlDLENBQUNwQixVQUFELEVBQWF4QixPQUFiLENBQXpDLENBQVA7QUFDSDtBQXpGK0IsQ0FBdEIsQ0FBZDs7QUE0RkE7Ozs7O0FBS0FOLE1BQU1FLE1BQU4sR0FBZSxVQUFTaUQsZUFBVCxFQUEwQjtBQUNyQztBQUNBLFFBQUlDLG1CQUFtQixFQUF2QjtBQUNBN0MsTUFBRVksSUFBRixDQUFPZ0MsZ0JBQWdCL0IsU0FBdkIsRUFBa0MsVUFBQ3dCLFVBQUQsRUFBYXRCLEdBQWIsRUFBcUI7QUFDbkQsWUFBSXNCLFdBQVdyQixVQUFYLElBQXlCNEIsZ0JBQWdCRSxRQUFoQixDQUF5Qi9CLEdBQXpCLGFBQXlDd0IsS0FBdEUsRUFBNkU7QUFDekVNLDZCQUFpQjlCLEdBQWpCLElBQXdCLElBQUlzQixXQUFXckIsVUFBZixDQUEwQjRCLGdCQUFnQkUsUUFBaEIsQ0FBeUIvQixHQUF6QixDQUExQixDQUF4QjtBQUNILFNBRkQsTUFFTyxJQUFJc0IsV0FBV3JCLFVBQVgsSUFBeUIsRUFBRTRCLGdCQUFnQkUsUUFBaEIsQ0FBeUIvQixHQUF6QixhQUF5Q3dCLEtBQTNDLENBQTdCLEVBQWdGO0FBQ25GQyxvQkFBUUMsR0FBUixDQUFZLDJCQUEyQjFCLEdBQXZDO0FBQ0g7QUFDSixLQU5EO0FBT0FmLE1BQUVMLE1BQUYsQ0FBU2lELGdCQUFnQkUsUUFBekIsRUFBbUNELGdCQUFuQztBQUNBLFdBQU8sZ0RBQUFuRCxDQUFTRCxLQUFULENBQWVFLE1BQWYsQ0FBc0J3QixJQUF0QixDQUEyQixJQUEzQixFQUFpQ3lCLGVBQWpDLENBQVA7QUFDSCxDQVpEOztBQWNBOzs7O0FBSUEsSUFBTWpCLGFBQWEsZ0RBQUFqQyxDQUFTaUMsVUFBVCxDQUFvQmhDLE1BQXBCLENBQTJCO0FBQzFDO0FBQ0FjLFdBQU9oQjtBQUZtQyxDQUEzQixDQUFuQjs7QUFLQTs7O0FBR0EsNENBQWU7QUFDWEEsZ0JBRFc7QUFFWGtDO0FBRlcsQ0FBZixDOzs7Ozs7Ozs7O0FDL0hBOztBQUVBLDRDQUFlLGdEQUFBakMsQ0FBU3FELElBQVQsQ0FBY3BELE1BQWQsQ0FBcUI7QUFDaENxRCxhQUFTLE1BRHVCO0FBRWhDQyxjQUZnQyx3QkFFNEI7QUFBQSxZQUFqRGxELE9BQWlELHVFQUF2QyxFQUFFbUQsWUFBWSxPQUFkLEVBQXVCckQsVUFBVSxFQUFqQyxFQUF1Qzs7QUFDeEQsYUFBS3NELE1BQUwsR0FBY25ELEVBQUVMLE1BQUYsQ0FBUztBQUNuQnlELGtCQUFNLE1BRGE7QUFFbkJDLHlCQUFhLEtBRk07QUFHbkJDLHlCQUFhLEtBSE07QUFJbkJDLG1CQUFPO0FBSlksU0FBVCxFQUtYdkQsRUFBRXdELElBQUYsQ0FBT3pELE9BQVAsRUFBZ0IsQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixZQUF6QixDQUFoQixDQUxXLENBQWQ7QUFNQSxhQUFLMEQsUUFBTCxHQUFnQjFELFFBQVEwRCxRQUF4QjtBQUNBLGFBQUs1RCxRQUFMLEdBQWdCRSxRQUFRRixRQUF4QjtBQUNBLGFBQUtxRCxVQUFMLEdBQWtCbkQsUUFBUW1ELFVBQTFCO0FBQ0gsS0FaK0I7O0FBYWhDUSxZQUFRO0FBQ0oseUJBQWlCO0FBRGIsS0Fid0I7QUFnQmhDQyxjQWhCZ0Msc0JBZ0JyQkMsSUFoQnFCLEVBZ0JmQyxLQWhCZSxFQWdCUjtBQUNwQixhQUFLQyxFQUFMLENBQVFDLGdCQUFSLGtCQUF3Q0gsSUFBeEMsU0FBa0RJLFNBQWxELElBQWdFLEtBQUtkLFVBQXJFO0FBQ0gsS0FsQitCO0FBbUJoQ2UsYUFuQmdDLHVCQW1CcEI7QUFDUixlQUFPLEtBQUtDLEdBQUwsQ0FBU0MsY0FBVCxFQUFQO0FBQ0gsS0FyQitCO0FBc0JoQ0MsYUF0QmdDLHVCQXNCcEI7QUFDUixZQUFJQyxTQUFTLEVBQWI7QUFDQXJFLFVBQUVZLElBQUYsQ0FBTyxLQUFLcUQsU0FBTCxFQUFQLEVBQXlCLFVBQUN4QyxTQUFEO0FBQUEsbUJBQWU0QyxPQUFPNUMsVUFBVW1DLElBQWpCLElBQXlCbkMsVUFBVVUsS0FBbEQ7QUFBQSxTQUF6QjtBQUNBLGVBQU9rQyxNQUFQO0FBQ0gsS0ExQitCO0FBMkJoQ0MsU0EzQmdDLG1CQTJCeEI7QUFDSixZQUFJQyxRQUFRLElBQVo7QUFDQSxhQUFLLElBQU1DLElBQVgsSUFBbUIsS0FBSzNFLFFBQXhCLEVBQWtDO0FBQzlCLGdCQUFJaUUsS0FBSyxLQUFLQSxFQUFMLENBQVFDLGdCQUFSLENBQXlCLGFBQWFTLEtBQUtaLElBQWxCLEdBQXlCLElBQWxELENBQVQ7QUFDQSxnQkFBSUUsR0FBR1csTUFBSCxJQUFhLENBQUNYLEdBQUcsQ0FBSCxFQUFNM0IsS0FBTixDQUFZdUMsS0FBWixDQUFrQkYsS0FBS0csS0FBdkIsQ0FBbEIsRUFBaUQ7QUFDN0Msb0JBQUksQ0FBQ2IsR0FBR2MsU0FBSCxDQUFheEMsUUFBYixDQUFzQixLQUFLYyxVQUEzQixDQUFMLEVBQTZDO0FBQ3pDWSx1QkFBR2MsU0FBSCxDQUFhOUMsSUFBYixDQUFrQixLQUFLb0IsVUFBdkI7QUFDQVksdUJBQUdlLGtCQUFILENBQXNCLFVBQXRCLEVBQWtDLG1CQUFtQixLQUFLM0IsVUFBeEIsR0FBcUMsSUFBckMsR0FBNENzQixLQUFLTSxPQUFqRCxHQUEyRCxVQUE3RjtBQUNIO0FBQ0RQLHdCQUFRLEtBQVI7QUFDSCxhQU5ELE1BTU8sSUFBSVQsR0FBR1csTUFBUCxFQUFlO0FBQ2xCWCxtQkFBR2MsU0FBSCxDQUFhRyxNQUFiLENBQW9CLEtBQUs3QixVQUF6QjtBQUNBLG9CQUFJOEIsUUFBUWxCLEdBQUdtQixrQkFBZjtBQUNBLG9CQUFJRCxNQUFNaEMsT0FBTixLQUFrQixPQUF0QixFQUErQmdDLE1BQU1FLFVBQU4sQ0FBaUJDLFdBQWpCLENBQTZCSCxLQUE3QjtBQUNsQztBQUNKO0FBQ0QsYUFBS0ksT0FBTCxHQUFlYixLQUFmO0FBQ0EsZUFBT0EsS0FBUDtBQUNILEtBN0MrQjtBQThDaENjLFVBOUNnQyxvQkE4Q1o7QUFBQSxZQUFibEMsTUFBYSx1RUFBSixFQUFJOztBQUNoQkEsaUJBQVMsQ0FBQ0EsT0FBT21DLGFBQVIsR0FBd0J0RixFQUFFTCxNQUFGLENBQVMsS0FBS3dELE1BQWQsRUFBc0JBLE1BQXRCLENBQXhCLEdBQXdELEtBQUtBLE1BQXRFO0FBQ0EsWUFBSUEsT0FBT0MsSUFBUCxDQUFZbUMsV0FBWixPQUE4QixLQUFsQyxFQUF5Q3BDLE9BQU9xQyxJQUFQLEdBQWMsSUFBSUMsUUFBSixDQUFhLEtBQUszQixFQUFsQixDQUFkO0FBQ3pDNEIsVUFBRUMsSUFBRixDQUFPeEMsTUFBUDtBQUNBLFlBQUl5QyxVQUFVLElBQUlDLGNBQUosRUFBZDtBQUNBRCxnQkFBUUUsSUFBUixDQUFhM0MsT0FBT0MsSUFBcEIsRUFBMEJELE9BQU80QyxHQUFqQyxFQUFzQyxJQUF0QztBQUNBSCxnQkFBUUksZ0JBQVIsQ0FBeUIsY0FBekIsRUFBeUMsa0RBQXpDO0FBQ0FKLGdCQUFRSyxJQUFSLENBQWE5QyxPQUFPcUMsSUFBcEI7QUFDSCxLQXREK0I7QUF1RGhDVSxVQXZEZ0Msb0JBdURYO0FBQUEsWUFBZG5HLE9BQWMsdUVBQUosRUFBSTtBQUFFLFlBQUksS0FBSzBELFFBQVQsRUFBbUIsS0FBS1MsR0FBTCxDQUFTaUMsSUFBVCxDQUFjLEtBQUsxQyxRQUFuQjtBQUErQjtBQXZEekMsQ0FBckIsQ0FBZixDOzs7Ozs7Ozs7O0FDRkE7O0FBRUEsNENBQWUsZ0RBQUEvRCxDQUFTcUQsSUFBVCxDQUFjcEQsTUFBZCxDQUFxQjtBQUNoQ3FELGFBQVMsY0FEdUI7QUFFaENnQixlQUFXLGlCQUZxQjtBQUdoQ1AsY0FBVXpELEVBQUV5RCxRQUFGLDBGQUhzQjtBQUloQ1IsY0FKZ0Msd0JBSVA7QUFBQSxZQUFkbEQsT0FBYyx1RUFBSixFQUFJOztBQUNyQixZQUFJcUcsU0FBU0MsU0FBU0MsSUFBVCxDQUFjQyxvQkFBZCxDQUFtQyxjQUFuQyxFQUFtRCxDQUFuRCxDQUFiO0FBQ0EsWUFBSSxDQUFDSCxNQUFMLEVBQWFDLFNBQVNDLElBQVQsQ0FBY0UsV0FBZCxDQUEwQixLQUFLMUMsRUFBL0IsRUFBYixLQUNLLEtBQUtBLEVBQUwsR0FBVXNDLE1BQVY7QUFDTCxhQUFLSyxRQUFMLEdBQWdCMUcsUUFBUTBHLFFBQVIsSUFBb0IsSUFBcEM7QUFDQSxhQUFLaEQsUUFBTCxHQUFnQjFELFFBQVEwRCxRQUFSLElBQW9CLEtBQUtBLFFBQXpDO0FBQ0gsS0FWK0I7O0FBV2hDQyxZQUFRO0FBQ0osd0JBQWdCO0FBRFosS0FYd0I7QUFjaENnRCxTQWRnQyxpQkFjMUJDLEtBZDBCLEVBY25CQyxVQWRtQixFQWNQO0FBQ3JCLFlBQU1SLFNBQVNPLE1BQU1FLE1BQU4sR0FBZUYsTUFBTUUsTUFBTixDQUFhM0IsVUFBNUIsR0FBeUN5QixLQUF4RDtBQUNBUCxlQUFPVSxLQUFQLENBQWFDLE1BQWIsR0FBc0IsQ0FBdEI7QUFDQVgsZUFBT1UsS0FBUCxDQUFhRSxTQUFiLEdBQXlCLENBQXpCO0FBQ0FaLGVBQU9VLEtBQVAsQ0FBYUcsWUFBYixHQUE0QixDQUE1QjtBQUNBYixlQUFPVSxLQUFQLENBQWFJLFVBQWIsR0FBMEIsQ0FBMUI7QUFDQWQsZUFBT1UsS0FBUCxDQUFhSyxhQUFiLEdBQTZCLENBQTdCO0FBQ0EsWUFBSUMsU0FBU0MsaUJBQWlCakIsTUFBakIsQ0FBYjtBQUNBLFlBQU1LLFdBQVdXLFVBQVVBLE9BQU9FLGtCQUFqQixHQUFzQ0MsV0FBV0gsT0FBT0Usa0JBQWxCLENBQXRDLEdBQThFLENBQS9GOztBQUVBRSxtQkFBVyxZQUFNO0FBQ2IsZ0JBQUlwQixVQUFVQSxPQUFPbEIsVUFBckIsRUFBaUNrQixPQUFPbEIsVUFBUCxDQUFrQkMsV0FBbEIsQ0FBOEJpQixNQUE5QjtBQUNwQyxTQUZELEVBRUdLLFdBQVcsSUFGZDtBQUdILEtBM0IrQjtBQTRCaENqRyxXQTVCZ0MsbUJBNEJ4QnNFLE9BNUJ3QixFQTRCRDtBQUFBLFlBQWQvRSxPQUFjLHVFQUFKLEVBQUk7QUFBRSxhQUFLbUcsTUFBTCxDQUFZLEVBQUVsQyxXQUFXLFNBQWIsRUFBd0JjLFNBQVNBLE9BQWpDLEVBQVosRUFBd0QvRSxPQUF4RDtBQUFtRSxLQTVCcEU7QUE2QmhDOEQsU0E3QmdDLGlCQTZCMUJpQixPQTdCMEIsRUE2Qkg7QUFBQSxZQUFkL0UsT0FBYyx1RUFBSixFQUFJO0FBQUUsYUFBS21HLE1BQUwsQ0FBWSxFQUFFbEMsV0FBVyxPQUFiLEVBQXNCYyxTQUFTQSxPQUEvQixFQUFaLEVBQXNEL0UsT0FBdEQ7QUFBaUUsS0E3QmhFO0FBOEJoQzBILFFBOUJnQyxnQkE4QjNCM0MsT0E5QjJCLEVBOEJKO0FBQUEsWUFBZC9FLE9BQWMsdUVBQUosRUFBSTtBQUFFLGFBQUttRyxNQUFMLENBQVksRUFBRWxDLFdBQVcsU0FBYixFQUF3QmMsU0FBU0EsT0FBakMsRUFBWixFQUF3RC9FLE9BQXhEO0FBQW1FLEtBOUJqRTtBQStCaEMySCxVQS9CZ0Msa0JBK0J6QjVDLE9BL0J5QixFQStCRjtBQUFBLFlBQWQvRSxPQUFjLHVFQUFKLEVBQUk7QUFBRSxhQUFLbUcsTUFBTCxDQUFZLEVBQUVwQixTQUFTQSxPQUFYLEVBQVosRUFBa0MvRSxPQUFsQztBQUE2QyxLQS9CN0M7QUFnQ2hDbUcsVUFoQ2dDLGtCQWdDekJ5QixLQWhDeUIsRUFnQ0o7QUFBQTs7QUFBQSxZQUFkNUgsT0FBYyx1RUFBSixFQUFJOzs7QUFFeEIsWUFBTTZILFVBQVV2QixTQUFTd0IsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBRCxnQkFBUUUsU0FBUixHQUFvQixLQUFLckUsUUFBTCxDQUFjLEVBQUVPLFdBQVcyRCxNQUFNM0QsU0FBbkIsRUFBOEJjLFNBQVM2QyxNQUFNN0MsT0FBN0MsRUFBZCxDQUFwQjtBQUNBLFlBQU1zQixTQUFTd0IsUUFBUUcsU0FBdkI7QUFDQSxhQUFLakUsRUFBTCxDQUFRMEMsV0FBUixDQUFvQkosTUFBcEI7QUFDQSxZQUFJLENBQUNyRyxRQUFRaUksU0FBYixFQUF3QlIsV0FBVyxZQUFNO0FBQUUsa0JBQUtkLEtBQUwsQ0FBV04sTUFBWDtBQUFxQixTQUF4QyxFQUEwQ3JHLFFBQVEwRyxRQUFSLElBQW9CLEtBQUtBLFFBQW5FO0FBQzNCO0FBdkMrQixDQUFyQixDQUFmLEM7Ozs7Ozs7Ozs7QUNGQTs7QUFFQSw0Q0FBZSxnREFBQS9HLENBQVNxRCxJQUFULENBQWNwRCxNQUFkLENBQXFCO0FBQ2hDcUQsYUFBUyxPQUR1QjtBQUVoQ1MsY0FBVXpELEVBQUV5RCxRQUFGLHNlQUZzQjtBQWNoQ1IsY0FkZ0Msd0JBY25CO0FBQ1QsWUFBSWdGLFNBQVM1QixTQUFTQyxJQUFULENBQWM0QixhQUFkLENBQTRCLE9BQTVCLENBQWI7QUFDQSxZQUFJLENBQUNELE1BQUwsRUFBYTVCLFNBQVNDLElBQVQsQ0FBY0UsV0FBZCxDQUEwQixLQUFLMUMsRUFBL0IsRUFBYixLQUNLLEtBQUtBLEVBQUwsR0FBVW1FLE1BQVY7QUFDUixLQWxCK0I7O0FBbUJoQ3ZFLFlBQVE7QUFDSix3QkFBZ0IsU0FEWjtBQUVKLHlCQUFpQixTQUZiO0FBR0oscUJBQWEsTUFIVDtBQUlKLHlCQUFpQjtBQUpiLEtBbkJ3QjtBQXlCaEN5RSxZQXpCZ0Msb0JBeUJ2QmhGLE1BekJ1QixFQXlCZjtBQUFBOztBQUNiLGFBQUtDLElBQUwsR0FBWUQsT0FBT0MsSUFBbkI7QUFDQSxhQUFLZ0YsRUFBTCxHQUFVakYsT0FBT2lGLEVBQWpCO0FBQ0EsYUFBSzFCLEtBQUwsR0FBYXZELE9BQU91RCxLQUFwQjtBQUNBLGFBQUsyQixNQUFMLEdBQWNsRixPQUFPa0YsTUFBckI7QUFDQSxhQUFLdkUsRUFBTCxDQUFRYyxTQUFSLENBQWtCMEQsR0FBbEIsQ0FBc0JuRixPQUFPb0YsS0FBN0I7QUFDQSxhQUFLQyxTQUFMLEdBQWlCckYsT0FBT3FGLFNBQXhCO0FBQ0EsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsWUFBSXRGLE9BQU9NLFFBQVgsRUFBcUI7QUFDakIsZ0JBQUlOLE9BQU91RixNQUFYLEVBQW1CO0FBQUE7QUFDZix3QkFBTUQsWUFBTjtBQUNBLHdCQUFNRSxnQkFBZ0JDLFNBQVNqSixNQUFULENBQWdCO0FBQ2xDc0Qsa0NBRGtDLHdCQUNyQjtBQUNUMkYscUNBQVN4SCxTQUFULENBQW1CNkIsVUFBbkIsQ0FBOEJOLEtBQTlCLENBQW9DLElBQXBDLEVBQTBDa0csU0FBMUM7QUFDSCx5QkFIaUM7QUFJbEN4RCw4QkFKa0Msb0JBSWQ7QUFBQSxnQ0FBYmxDLE1BQWEsdUVBQUosRUFBSTs7QUFDaEJ5RixxQ0FBU3hILFNBQVQsQ0FBbUJpRSxNQUFuQixDQUEwQjFDLEtBQTFCLENBQWdDLElBQWhDLEVBQXNDa0csU0FBdEM7QUFDQUosaUNBQUtLLFVBQUw7QUFDSDtBQVBpQyxxQkFBaEIsQ0FBdEI7QUFTQSwwQkFBS0wsSUFBTCxHQUFZLElBQUlFLGFBQUosQ0FBa0J4RixNQUFsQixDQUFaO0FBWGU7QUFZbEIsYUFaRCxNQVlPLElBQUlBLE9BQU9NLFFBQVAsWUFBMkIsZ0RBQUEvRCxDQUFTcUQsSUFBeEMsRUFBOEM7QUFDakQscUJBQUswRixJQUFMLEdBQVl0RixPQUFPTSxRQUFuQjtBQUNIO0FBQ0QsZ0JBQUksS0FBS2dGLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVMLEVBQTNCLEVBQStCO0FBQzNCLG9CQUFJQSxLQUFLakYsT0FBT2lGLEVBQWhCO0FBQ0FqRix1QkFBT2lGLEVBQVAsR0FBWTtBQUFBLDJCQUFNSyxLQUFLQSxJQUFMLENBQVVMLEVBQVYsQ0FBYUEsRUFBYixDQUFOO0FBQUEsaUJBQVo7QUFDSDtBQUNELGlCQUFLQSxFQUFMLEdBQVVqRixPQUFPaUYsRUFBUCxJQUFhLEtBQUtBLEVBQTVCO0FBQ0gsU0FyQkQsTUFxQk87QUFDSCxpQkFBS0ssSUFBTCxHQUFZLElBQVo7QUFDSDtBQUNKLEtBekQrQjtBQTBEaENNLFNBMURnQyxtQkEwRFo7QUFBQSxZQUFkaEosT0FBYyx1RUFBSixFQUFJOztBQUNoQixhQUFLb0ksUUFBTCxDQUFjcEksT0FBZDtBQUNBLGFBQUttRyxNQUFMLENBQVluRyxPQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0E5RCtCO0FBK0RoQ2lKLFFBL0RnQyxrQkErRGI7QUFBQSxZQUFkakosT0FBYyx1RUFBSixFQUFJOztBQUNmQSxnQkFBUTJJLE1BQVIsR0FBaUIsSUFBakI7QUFDQSxhQUFLUCxRQUFMLENBQWNwSSxPQUFkO0FBQ0EsYUFBS21HLE1BQUwsQ0FBWW5HLE9BQVo7QUFDQSxlQUFPLElBQVA7QUFDSCxLQXBFK0I7QUFxRWhDa0osV0FyRWdDLHFCQXFFdEI7QUFDTixZQUFJLEtBQUt2QyxLQUFULEVBQWdCLEtBQUtBLEtBQUwsQ0FBVy9ELEtBQVgsQ0FBaUIsSUFBakIsRUFBdUIsQ0FBQyxLQUFLdUcsWUFBTCxFQUFELENBQXZCO0FBQ2hCLGFBQUtKLFVBQUw7QUFDSCxLQXhFK0I7QUF5RWhDSyxRQXpFZ0Msa0JBeUV6QjtBQUNILFlBQUksS0FBS2YsRUFBVCxFQUFhLEtBQUtBLEVBQUwsQ0FBUXpGLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLENBQUMsS0FBS3VHLFlBQUwsRUFBRCxDQUFwQjtBQUNiLFlBQUksS0FBSzlGLElBQUwsS0FBYyxNQUFkLElBQXdCLEtBQUtxRixJQUFMLENBQVVyRCxPQUF0QyxFQUErQyxLQUFLMEQsVUFBTDtBQUNsRCxLQTVFK0I7QUE2RWhDTSxZQTdFZ0Msc0JBNkVyQjtBQUNQLFlBQUksS0FBS2YsTUFBVCxFQUFpQixLQUFLQSxNQUFMLENBQVkxRixLQUFaLENBQWtCLElBQWxCLEVBQXdCLENBQUMsS0FBS3VHLFlBQUwsRUFBRCxDQUF4QjtBQUNqQixhQUFLSixVQUFMO0FBQ0gsS0FoRitCO0FBaUZoQ0EsY0FqRmdDLHdCQWlGbkI7QUFDVCxZQUFJLEtBQUtMLElBQVQsRUFBZSxLQUFLQSxJQUFMLENBQVUxRCxNQUFWO0FBQ2YsYUFBS2IsR0FBTCxDQUFTbUYsR0FBVCxDQUFhLFNBQWIsRUFBd0IsTUFBeEIsRUFBZ0NsRCxJQUFoQztBQUNILEtBcEYrQjtBQXFGaEMrQyxnQkFyRmdDLDBCQXFGakI7QUFDWCxZQUFJM0UsUUFBUSxJQUFaO0FBQ0EsWUFBSStFLE9BQU8sRUFBWDtBQUNBLFlBQUksS0FBS2xHLElBQUwsS0FBYyxNQUFsQixFQUEwQjtBQUN0Qm1CLG9CQUFRLEtBQUtrRSxJQUFMLENBQVVuRSxLQUFWLEVBQVI7QUFDQWdGLGlCQUFLeEgsSUFBTCxDQUFVLEtBQUsyRyxJQUFMLENBQVV4RSxTQUFWLEVBQVY7QUFDQXFGLGlCQUFLeEgsSUFBTCxDQUFVeUMsS0FBVjtBQUNIO0FBQ0QrRSxhQUFLeEgsSUFBTCxDQUFVLElBQVY7QUFDQSxlQUFPd0gsSUFBUDtBQUNILEtBL0YrQjtBQWdHaENDLGlCQWhHZ0MseUJBZ0dsQkMsYUFoR2tCLEVBZ0dIO0FBQ3pCLGFBQUt0RixHQUFMLENBQVN1RixJQUFULENBQWMsS0FBZCxFQUFxQixLQUFLckIsRUFBTCxHQUFVLE1BQVYsR0FBbUIsTUFBeEM7QUFDQSxhQUFLbEUsR0FBTCxDQUFTdUYsSUFBVCxDQUFjLFNBQWQsRUFBeUIsS0FBSy9DLEtBQUwsR0FBYSxNQUFiLEdBQXNCLE1BQS9DO0FBQ0EsYUFBS3hDLEdBQUwsQ0FBU3VGLElBQVQsQ0FBYyxTQUFkLEVBQXlCLEtBQUtwQixNQUFMLEdBQWMsTUFBZCxHQUF1QixNQUFoRDtBQUNBLGFBQUtuRSxHQUFMLENBQVN1RixJQUFULENBQWMsVUFBZCxFQUEwQixDQUFDLEtBQUtyQixFQUFOLElBQVksQ0FBQyxLQUFLMUIsS0FBbEIsSUFBMkIsQ0FBQyxLQUFLMkIsTUFBakMsR0FBMEMsTUFBMUMsR0FBbUQsTUFBN0U7QUFDQW1CLHdCQUFnQkEsZ0JBQWdCLFVBQWhCLEdBQTZCLGFBQTdDO0FBQ0EsYUFBS3RGLEdBQUwsQ0FBU3VGLElBQVQsQ0FBYyxVQUFkLEVBQTBCRCxhQUExQixFQUF5QyxRQUF6QztBQUNBLGFBQUt0RixHQUFMLENBQVNzRixhQUFULEVBQXdCLGdCQUF4QjtBQUNILEtBeEcrQjtBQXlHaEN0RCxVQXpHZ0Msb0JBeUdkO0FBQUEsWUFBWFYsSUFBVyx1RUFBSixFQUFJOztBQUNkQSxlQUFPeEYsRUFBRUwsTUFBRixDQUFTO0FBQ1ptRixxQkFBUyxFQURHO0FBRVo0RSx3QkFBWSxFQUZBO0FBR1pqRyxzQkFBVTtBQUhFLFNBQVQsRUFJSnpELEVBQUVDLElBQUYsQ0FBT3VGLElBQVAsRUFBYSxDQUFDLFNBQUQsRUFBWSxZQUFaLEVBQTBCLFVBQTFCLEVBQXNDLGVBQXRDLENBQWIsQ0FKSSxDQUFQO0FBS0EsYUFBS3RCLEdBQUwsQ0FBU2lDLElBQVQsQ0FBYyxLQUFLMUMsUUFBTCxDQUFjK0IsSUFBZCxDQUFkLEVBQW1DNkQsR0FBbkMsQ0FBdUMsU0FBdkMsRUFBa0QsTUFBbEQ7QUFDQSxhQUFLRSxhQUFMLENBQW1CL0QsS0FBS2dFLGFBQXhCO0FBQ0EsWUFBSSxLQUFLZixJQUFULEVBQWU7QUFDWCxpQkFBS0EsSUFBTCxDQUFVdkMsTUFBVjtBQUNBLGlCQUFLaEMsR0FBTCxDQUFTdUYsSUFBVCxDQUFjLFVBQWQsRUFBMEJ0RCxJQUExQixDQUErQixLQUFLc0MsSUFBTCxDQUFVdkUsR0FBekM7QUFDSDtBQUNELGFBQUt5RixjQUFMO0FBQ0g7QUF0SCtCLENBQXJCLENBQWYsQzs7Ozs7Ozs7OztBQ0ZBOztBQUVBLDRDQUFlLGdEQUFBakssQ0FBU3FELElBQVQsQ0FBY3BELE1BQWQsQ0FBcUI7QUFDaEM4RCxjQUFVekQsRUFBRXlELFFBQUYsK0hBRHNCO0FBRWhDVCxhQUFTLE1BRnVCO0FBR2hDQyxjQUhnQyx3QkFHbkI7QUFDVCxZQUFJMkcsUUFBUXZELFNBQVNDLElBQXJCO0FBQ0EsWUFBSXNELE1BQU03RixnQkFBTixDQUF1QixNQUF2QixFQUErQlUsTUFBL0IsS0FBMEMsQ0FBOUMsRUFBaURtRixNQUFNcEQsV0FBTixDQUFrQixLQUFLMUMsRUFBdkIsRUFBakQsS0FDSyxLQUFLQSxFQUFMLEdBQVU4RixNQUFNMUIsYUFBTixDQUFvQixNQUFwQixDQUFWO0FBQ1IsS0FQK0I7QUFRaEMyQixTQVJnQyxpQkFRMUIvRSxPQVIwQixFQVFqQlosR0FSaUIsRUFRWjtBQUFBOztBQUNoQixZQUFJWSxtQkFBbUJnRixPQUF2QixFQUFnQztBQUM1QjVGLGtCQUFNWSxPQUFOO0FBQ0FBLHNCQUFVLElBQVY7QUFDSDtBQUNELFlBQUlpRixZQUFZLEtBQUt0RyxRQUFMLENBQWMsRUFBRXFCLFNBQVNBLFdBQVcsWUFBdEIsRUFBZCxDQUFoQjtBQUNBLFlBQUlrRixVQUFVOUYsT0FBT21DLFNBQVNDLElBQTlCO0FBQ0EwRCxnQkFBUXBGLFNBQVIsQ0FBa0IwRCxHQUFsQixDQUFzQixnQkFBdEI7QUFDQTBCLGdCQUFRcEYsU0FBUixDQUFrQjBELEdBQWxCLENBQXNCLFlBQXRCO0FBQ0EsWUFBSXBFLEdBQUosRUFBUztBQUNMLGdCQUFJK0YsUUFBUSxJQUFJSCxPQUFKLENBQVksTUFBWixDQUFaO0FBQ0FHLGtCQUFNbkQsS0FBTixDQUFZb0QsT0FBWixHQUFzQixPQUF0QjtBQUNBRCxrQkFBTUUsWUFBTixDQUFtQkosU0FBbkIsRUFBOEJFLE1BQU1HLFVBQXBDO0FBQ0FKLG9CQUFRRyxZQUFSLENBQXFCRixLQUFyQixFQUE0QkksT0FBT0QsVUFBbkM7QUFDSCxTQUxELE1BS087QUFDSCxpQkFBS3RHLEVBQUwsQ0FBUWdFLFNBQVIsR0FBb0JpQyxTQUFwQjtBQUNBLGlCQUFLakcsRUFBTCxDQUFRZ0QsS0FBUixDQUFjb0QsT0FBZCxHQUF3QixPQUF4QjtBQUNIO0FBQ0QsZUFBTztBQUNISSxrQkFBTSxjQUFDQyxRQUFEO0FBQUEsdUJBQWMsTUFBS0QsSUFBTCxDQUFVcEcsR0FBVixFQUFlcUcsUUFBZixDQUFkO0FBQUE7QUFESCxTQUFQO0FBR0gsS0E3QitCO0FBOEJoQ0QsUUE5QmdDLGdCQThCM0JwRyxHQTlCMkIsRUE4QnRCcUcsUUE5QnNCLEVBOEJaO0FBQ2hCQSxtQkFBV3ZLLEVBQUV3SyxVQUFGLENBQWF0RyxHQUFiLElBQW9CQSxHQUFwQixHQUEwQnFHLFFBQXJDO0FBQ0EsWUFBSU4sUUFBUS9GLE9BQU9BLElBQUlnRSxhQUFKLENBQWtCLE1BQWxCLENBQVAsSUFBb0MsS0FBS3BFLEVBQXJEO0FBQ0EsWUFBSWtHLFVBQVU5RixPQUFPbUMsU0FBU0MsSUFBOUI7QUFDQSxZQUFJbUUsV0FBV1IsTUFBTWxHLGdCQUFOLENBQXVCLHVCQUF2QixDQUFmO0FBQ0EsYUFBSyxJQUFJMkcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxTQUFTaEcsTUFBN0IsRUFBcUNpRyxHQUFyQyxFQUEwQztBQUN0Q0QscUJBQVNDLENBQVQsRUFBWTlGLFNBQVosQ0FBc0JHLE1BQXRCLENBQTZCLE9BQTdCO0FBQ0EwRixxQkFBU0MsQ0FBVCxFQUFZNUQsS0FBWixDQUFrQjZELE9BQWxCLEdBQTRCLENBQTVCO0FBQ0g7QUFDRFgsZ0JBQVFwRixTQUFSLENBQWtCRyxNQUFsQixDQUF5QixZQUF6QjtBQUNBeUMsbUJBQVcsWUFBTTtBQUNid0Msb0JBQVFwRixTQUFSLENBQWtCRyxNQUFsQixDQUF5QixnQkFBekI7QUFDQWtGLGtCQUFNbkQsS0FBTixDQUFZb0QsT0FBWixHQUFzQixNQUF0QjtBQUNBRCxrQkFBTW5DLFNBQU4sR0FBa0IsRUFBbEI7QUFDQSxnQkFBSTVELEdBQUosRUFBUytGLE1BQU0vRSxVQUFOLENBQWlCQyxXQUFqQixDQUE2QjhFLEtBQTdCO0FBQ1QsZ0JBQUlNLFFBQUosRUFBY0E7QUFDakIsU0FORCxFQU1HLElBTkg7QUFPSDtBQS9DK0IsQ0FBckIsQ0FBZixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBTUssU0FBUyxTQUFUQSxNQUFTLEdBQW1EO0FBQUEsUUFBbEQ3SyxPQUFrRCx1RUFBeEM7QUFBRThLLGFBQUYsbUJBQVUsQ0FBRSxDQUFaO0FBQWNDLHNCQUFkLDRCQUErQixDQUFFO0FBQWpDLEtBQXdDOztBQUM5RCxRQUFNQyxPQUFPLGdEQUFBckwsQ0FBU3FMLElBQXRCO0FBQ0FyTCxJQUFBLGdEQUFBQSxDQUFTcUwsSUFBVCxHQUFnQixVQUFDQyxNQUFELEVBQVN2SyxLQUFULEVBQWdCRSxJQUFoQixFQUF5QjtBQUNyQyxZQUFNa0ssUUFBUTlLLFFBQVE4SyxLQUFSLEVBQWQ7QUFDQSxZQUFJQSxLQUFKLEVBQVdsSyxLQUFLc0ssVUFBTCxHQUFrQixVQUFDQyxHQUFELEVBQVM7QUFBRUEsZ0JBQUlsRixnQkFBSixDQUFxQmpHLFFBQVFvTCxNQUFSLElBQWtCLGVBQXZDLEVBQXdELFlBQVlOLEtBQXBFO0FBQTZFLFNBQTFHO0FBQ1gsWUFBSU8sTUFBTXpLLEtBQUtrRCxLQUFmO0FBQ0FsRCxhQUFLa0QsS0FBTCxHQUFhLFVBQUN3SCxLQUFELEVBQVc7QUFDcEIsZ0JBQUlBLE1BQU1DLE1BQU4sSUFBZ0JELE1BQU1DLE1BQU4sS0FBaUIsR0FBckMsRUFBMEN2TCxRQUFRK0ssY0FBUjtBQUMxQ00sZ0JBQUlDLEtBQUo7QUFDSCxTQUhEO0FBSUFOLGFBQUtDLE1BQUwsRUFBYXZLLEtBQWIsRUFBb0JFLElBQXBCO0FBQ0gsS0FURDtBQVVILENBWkQ7O0FBY0EsSUFBTTRLLFlBQVk7QUFDZEMsU0FEYyxtQkFDNEM7QUFBQSxZQUFwRHpMLE9BQW9ELHVFQUExQyxFQUFFaUUsV0FBVyxFQUFiLEVBQWlCeUgsU0FBUyxFQUExQixFQUE4QmpHLE1BQU0sRUFBcEMsRUFBMEM7O0FBQ3RELGVBQU94RixFQUFFeUQsUUFBRixna0NBaUJ3QjFELE9BakJ4QixDQUFQO0FBa0JIO0FBcEJhLENBQWxCOztBQXVCQSxrREFBZTtBQUNYMkwsc0JBQUEsd0VBRFc7QUFFWEMsZUFBQSxpRUFGVztBQUdYL0MsY0FBQSxnRUFIVztBQUlYZ0QsY0FBQSxnRUFKVztBQUtYTCx3QkFMVztBQU1YTSxZQUFBLCtEQU5XO0FBT1hqQjtBQVBXLENBQWYsQyIsImZpbGUiOiJwaXppLWJhY2tib25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFja2JvbmVcIiksIHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwicGl6aS1iYWNrYm9uZVwiLCBbXCJiYWNrYm9uZVwiLCBcInVuZGVyc2NvcmVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicGl6aS1iYWNrYm9uZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhY2tib25lXCIpLCByZXF1aXJlKFwidW5kZXJzY29yZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wicGl6aS1iYWNrYm9uZVwiXSA9IGZhY3Rvcnkocm9vdFtcImJhY2tib25lXCJdLCByb290W1widW5kZXJzY29yZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjg4NWIyNTU3M2VlMWI4YjM0OWEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhY2tib25lXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuZGVyc2NvcmVcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5cbmNvbnN0IE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgICBkYXRlczogW10sXG4gICAgdmFsaWRhdGUoYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRhdGVzID0gXy5waWNrKGF0dHJzLCB0aGlzLmRhdGVzLmNvbmNhdChbJ2RhdGUnXSkpO1xuICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGVzKSB7XG4gICAgICAgICAgICBpZiAoZGF0ZXNbZGF0ZV0gJiYgIShkYXRlc1tkYXRlXSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNhdmUoYXR0cnMsIG9wdGlvbnMgPSB7IHBhcnNlOiBmYWxzZSB9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSAobW9kZWwsIHJlc3AsIG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5yZWxhdGlvbnMsIChyZWxhdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsLmdldChrZXkpIGluc3RhbmNlb2YgcmVsYXRpb24uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG1vZGVsLmdldChrZXkpLm1vZGVscywgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2F2ZShudWxsLCB7IGFsbDogb3B0aW9ucy5hbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzLmNhbGwodGhpcywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcm94eSB0aGUgY2FsbCB0byB0aGUgb3JpZ2luYWwgc2F2ZSBmdW5jdGlvblxuICAgICAgICBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuc2F2ZS5jYWxsKHRoaXMsIGF0dHJzLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIGZldGNoKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbGwpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzID0gKG1vZGVsLCByZXNwLCBvcHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMucmVsYXRpb25zLCAocmVsYXRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uY29sbGVjdGlvbiAmJiBtb2RlbC5nZXQoa2V5KSBpbnN0YW5jZW9mIHJlbGF0aW9uLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChtb2RlbC5nZXQoa2V5KS5tb2RlbHMsIChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmZldGNoKHsgYWxsOiBvcHRpb25zLmFsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MuY2FsbCh0aGlzLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5mZXRjaC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgdG9KU09OKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IF8uY2xvbmUodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdIGluc3RhbmNlb2YgQmFja2JvbmUuTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gb3B0aW9ucy5hbGwgPyBfLnBpY2soYXR0cmlidXRlc1thdHRyaWJ1dGVdLCBcImlkXCIpIDogYXR0cmlidXRlc1thdHRyaWJ1dGVdLnRvSlNPTihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSBpbnN0YW5jZW9mIEJhY2tib25lLkNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnZlcnRlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uZm9yRWFjaChhdHRyID0+IGNvbnZlcnRlZC5wdXNoKG9wdGlvbnMuYWxsID8gXy5waWNrKGF0dHIsICdpZCcpIDogYXR0ci50b0pTT04ob3B0aW9ucykpKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gY29udmVydGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzO1xuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBrZXk7XG4gICAgICAgICAgICBvcHRpb25zID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF0dHJpYnV0ZXMgPSB7fSlba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3B0cyA9IF8uZXh0ZW5kKHsgdmFsaWRhdGU6IHRydWUgfSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciByZWxhdGlvbnMgPSBfLmtleXModGhpcy5yZWxhdGlvbnMpO1xuICAgICAgICBfLmVhY2goYXR0cmlidXRlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChfLmNvbnRhaW5zKHJlbGF0aW9ucywga2V5KSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWZpbml0aW9uID0gdGhpcy5yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5tb2RlbCAmJiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ldyBkZWZpbml0aW9uLm1vZGVsKHZhbHVlLCBvcHRzKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhcnJheSBpcyBhIHJlYWwgYXJyYXkgKGtleSA9IG51bWJlciksIGlmIGl0IGlzIGl0IG11c3QgYmUgaWQncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldChrZXkpLnNldChuZXcgZGVmaW5pdGlvbi5jb2xsZWN0aW9uKHZhbHVlLCBvcHRzKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLm1vZGVsICYmICEodmFsdWUgaW5zdGFuY2VvZiBkZWZpbml0aW9uLm1vZGVsKSB8fCBkZWZpbml0aW9uLmNvbGxlY3Rpb24gJiYgISh2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb24uY29sbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JhZCBtb2RlbCBkZWZpbml0aW9uOiAnICsgdGhpcy5nZXQoJ2NsYXNzTmFtZScpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5jb25jYXQoWydkYXRlJ10pLmluY2x1ZGVzKGtleSkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlc1trZXldID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIEJhY2tib25lLk1vZGVsLnByb3RvdHlwZS5zZXQuYXBwbHkodGhpcywgW2F0dHJpYnV0ZXMsIG9wdGlvbnNdKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBFeHRlbmQgdGhlIEJhY2tib25lLk1vZGVsLmV4dGVuZCBtZXRob2QsIHRvIGFkZCBzb21lIHRyZWF0ZW1lbnQgb24gaW5zdGFuY2UgY3JlYXRpb25cbiAqIEBwYXJhbSAge09iamVjdH0gbW9kZWxEZWZpbml0aW9uXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIG1vZGVsIGNvbnN0cnVjdG9yXG4gKi9cbk1vZGVsLmV4dGVuZCA9IGZ1bmN0aW9uKG1vZGVsRGVmaW5pdGlvbikge1xuICAgIC8vIFNldCBkZWZhdWx0cyBjb2xsZWN0aW9ucyBmb3IgcmVsYXRpb25zXG4gICAgdmFyIGRlZmF1bHRSZWxhdGlvbnMgPSB7fTtcbiAgICBfLmVhY2gobW9kZWxEZWZpbml0aW9uLnJlbGF0aW9ucywgKGRlZmluaXRpb24sIGtleSkgPT4ge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5jb2xsZWN0aW9uICYmIG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGRlZmF1bHRSZWxhdGlvbnNba2V5XSA9IG5ldyBkZWZpbml0aW9uLmNvbGxlY3Rpb24obW9kZWxEZWZpbml0aW9uLmRlZmF1bHRzW2tleV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uY29sbGVjdGlvbiAmJiAhKG1vZGVsRGVmaW5pdGlvbi5kZWZhdWx0c1trZXldIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCBkZWZhdWx0IHZhbHVlIGZvciBcIiArIGtleSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBfLmV4dGVuZChtb2RlbERlZmluaXRpb24uZGVmYXVsdHMsIGRlZmF1bHRSZWxhdGlvbnMpO1xuICAgIHJldHVybiBCYWNrYm9uZS5Nb2RlbC5leHRlbmQuY2FsbCh0aGlzLCBtb2RlbERlZmluaXRpb24pO1xufTtcblxuLyoqXG4gKiBUaGUgQ29sbGVjdGlvblxuICogQHR5cGUge0JhY2tib25lLkNvbGxlY3Rpb259XG4gKi9cbmNvbnN0IENvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgLyogVXNlZCB0byBpbnN0YW5jaWF0ZSBhIG5ldyBNb2RlbCBmcm9tIEpzb24gKG5lZWQgdG8gb3ZlcnJpZGUgaWYgc3VidHlwZXMpKi9cbiAgICBtb2RlbDogTW9kZWxcbn0pO1xuXG4vKipcbiAqIEV4cG9ydGluZyB0aGUgTW9kZWwgYW5kIHRoZSBDb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBNb2RlbCxcbiAgICBDb2xsZWN0aW9uXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvRW50aXR5LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwiZm9ybVwiLFxuICAgIGluaXRpYWxpemUob3B0aW9ucyA9IHsgZXJyb3JDbGFzczogJ2Vycm9yJywgdmFsaWRhdGU6IFtdIH0pIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgfSwgXy5vbWl0KG9wdGlvbnMsIFsndGVtcGxhdGUnLCAndmFsaWRhdGUnLCAnZXJyb3JDbGFzcyddKSk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgICB0aGlzLnZhbGlkYXRlID0gb3B0aW9ucy52YWxpZGF0ZTtcbiAgICAgICAgdGhpcy5lcnJvckNsYXNzID0gb3B0aW9ucy5lcnJvckNsYXNzO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuc3VibWl0JzogJ3N1Ym1pdCdcbiAgICB9LFxuICAgIGlucHV0RXJyb3IobmFtZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVwiXWApLmNsYXNzTmFtZSArPSAodGhpcy5lcnJvckNsYXNzKTtcbiAgICB9LFxuICAgIGdldFZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgfSxcbiAgICBnZXRPYmplY3QoKSB7XG4gICAgICAgIGxldCBvYmplY3QgPSB7fTtcbiAgICAgICAgXy5lYWNoKHRoaXMuZ2V0VmFsdWVzKCksIChhdHRyaWJ1dGUpID0+IG9iamVjdFthdHRyaWJ1dGUubmFtZV0gPSBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBpbiB0aGlzLnZhbGlkYXRlKSB7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJypbbmFtZT1cIicgKyBydWxlLm5hbWUgKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoZWwubGVuZ3RoICYmICFlbFswXS52YWx1ZS5tYXRjaChydWxlLnJlZ2V4KSkge1xuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZXJyb3JDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnB1c2godGhpcy5lcnJvckNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsICc8c21hbGwgY2xhc3M9XCInICsgdGhpcy5lcnJvckNsYXNzICsgJ1wiPicgKyBydWxlLm1lc3NhZ2UgKyAnPC9zbWFsbD4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVycm9yQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGxldCAkbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoJG5leHQudGFnTmFtZSA9PT0gXCJzbWFsbFwiKSAkbmV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSB2YWxpZDtcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG4gICAgc3VibWl0KHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHBhcmFtcyA9ICFwYXJhbXMuY3VycmVudFRhcmdldCA/IF8uZXh0ZW5kKHRoaXMucGFyYW1zLCBwYXJhbXMpIDogdGhpcy5wYXJhbXM7XG4gICAgICAgIGlmIChwYXJhbXMudHlwZS50b1VwcGVyQ2FzZSgpICE9PSAnR0VUJykgcGFyYW1zLmRhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lbCk7XG4gICAgICAgICQuYWpheChwYXJhbXMpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4ocGFyYW1zLnR5cGUsIHBhcmFtcy51cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtcy5kYXRhKTtcbiAgICB9LFxuICAgIHJlbmRlcihvcHRpb25zID0ge30pIHsgaWYgKHRoaXMudGVtcGxhdGUpIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSk7IH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9Gb3JtVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgIGNsYXNzTmFtZTogXCJjb250YWluZXItZmx1aWRcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShgPGgzIGNsYXNzPVwibm90aWYgPCU9IGNsYXNzTmFtZSAlPlwiPjwlPSBtZXNzYWdlICU+PGEgY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L2E+PC9oMz5gKSxcbiAgICBpbml0aWFsaXplKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgJG5vdGlmID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbm90aWZpY2F0aW9uJylbMF07XG4gICAgICAgIGlmICghJG5vdGlmKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICBlbHNlIHRoaXMuZWwgPSAkbm90aWY7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IDMwMDA7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5jbG9zZSc6ICdjbG9zZSdcbiAgICB9LFxuICAgIGNsb3NlKGV2ZW50LCBjaGlsZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRub3RpZiA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlIDogZXZlbnQ7XG4gICAgICAgICRub3RpZi5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgICAkbm90aWYuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgICAgICRub3RpZi5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICAgICAgJG5vdGlmLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSgkbm90aWYpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHN0eWxlcyAmJiBzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uID8gcGFyc2VGbG9hdChzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uKSA6IDA7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJG5vdGlmICYmICRub3RpZi5wYXJlbnROb2RlKSAkbm90aWYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkbm90aWYpO1xuICAgICAgICB9LCBkdXJhdGlvbiAqIDEwMDApO1xuICAgIH0sXG4gICAgc3VjY2VzcyhtZXNzYWdlLCBvcHRpb25zID0ge30pIHsgdGhpcy5yZW5kZXIoeyBjbGFzc05hbWU6IFwic3VjY2Vzc1wiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIGVycm9yKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgeyB0aGlzLnJlbmRlcih7IGNsYXNzTmFtZTogXCJhbGVydFwiLCBtZXNzYWdlOiBtZXNzYWdlIH0sIG9wdGlvbnMpOyB9LFxuICAgIHdhcm4obWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgY2xhc3NOYW1lOiBcIndhcm5pbmdcIiwgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICBub3RpZnkobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7IHRoaXMucmVuZGVyKHsgbWVzc2FnZTogbWVzc2FnZSB9LCBvcHRpb25zKTsgfSxcbiAgICByZW5kZXIobm90aWYsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3cmFwcGVyLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoeyBjbGFzc05hbWU6IG5vdGlmLmNsYXNzTmFtZSwgbWVzc2FnZTogbm90aWYubWVzc2FnZSB9KTtcbiAgICAgICAgY29uc3QgJG5vdGlmID0gd3JhcHBlci5sYXN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoJG5vdGlmKTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBlcm1hbmVudCkgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2xvc2UoJG5vdGlmKTsgfSwgb3B0aW9ucy5kdXJhdGlvbiB8fCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvTm90aWZpY2F0aW9uVmlldy5qcyIsImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiBcInBvcHVwXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cdFx0XHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cblx0XHRcdFx0XHRcdCAgXHQ8YSBjbGFzcz1cImNsb3NlXCI+JiMyMTU7PC9hPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHRcdDwlIHRlbXBsYXRlID8gcHJpbnQodGVtcGxhdGUpIDogcHJpbnQobWVzc2FnZSkgJT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cImFjdGlvbnNcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJva1wiPk9rPC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJjdXN0b21cIj48JT0gY3VzdG9tTmFtZSAlPjwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9saT5cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdCAgPC9kaXY+YCksXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgbGV0ICRwb3B1cCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcInBvcHVwXCIpO1xuICAgICAgICBpZiAoISRwb3B1cCkgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJHBvcHVwO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayAuY2xvc2UnOiAnb25DbG9zZScsXG4gICAgICAgICdjbGljayAuY2FuY2VsJzogJ29uQ2xvc2UnLFxuICAgICAgICAnY2xpY2sgLm9rJzogJ29uT2snLFxuICAgICAgICAnY2xpY2sgLmN1c3RvbSc6ICdvbkN1c3RvbSdcbiAgICB9LFxuICAgIHNldFBhcmFtKHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZTtcbiAgICAgICAgdGhpcy5vayA9IHBhcmFtcy5vaztcbiAgICAgICAgdGhpcy5jbG9zZSA9IHBhcmFtcy5jbG9zZTtcbiAgICAgICAgdGhpcy5jdXN0b20gPSBwYXJhbXMuY3VzdG9tO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLmNsYXNzKTtcbiAgICAgICAgdGhpcy5yZXNpemVPZmYgPSBwYXJhbXMucmVzaXplT2ZmO1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIGlmIChwYXJhbXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaXNmb3JtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgUG9wdXBGb3JtVmlldyA9IEZvcm1WaWV3LmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQocGFyYW1zID0ge30pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1WaWV3LnByb3RvdHlwZS5zdWJtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvcHVwRm9ybVZpZXcocGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnRlbXBsYXRlIGluc3RhbmNlb2YgQmFja2JvbmUuVmlldykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IHBhcmFtcy50ZW1wbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgJiYgdGhpcy52aWV3Lm9rKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9rID0gcGFyYW1zLm9rO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5vayA9ICgpID0+IHZpZXcudmlldy5vayhvayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9rID0gcGFyYW1zLm9rIHx8IHRoaXMub2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYXNpYyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZm9ybShvcHRpb25zID0ge30pIHtcbiAgICAgICAgb3B0aW9ucy5pc2Zvcm0gPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFBhcmFtKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZSkgdGhpcy5jbG9zZS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIG9uT2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9rKSB0aGlzLm9rLmFwcGx5KHRoaXMsIFt0aGlzLmNhbGxiYWNrQXJncygpXSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdmb3JtJyB8fCB0aGlzLnZpZXcuaXNWYWxpZCkgdGhpcy5jbG9zZVBvcHVwKCk7XG4gICAgfSxcbiAgICBvbkN1c3RvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tKSB0aGlzLmN1c3RvbS5hcHBseSh0aGlzLCBbdGhpcy5jYWxsYmFja0FyZ3MoKV0pO1xuICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcbiAgICB9LFxuICAgIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHRoaXMudmlldy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy4kZWwuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5odG1sKCk7XG4gICAgfSxcbiAgICBjYWxsYmFja0FyZ3MoKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLnZpZXcuY2hlY2soKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLnZpZXcuZ2V0VmFsdWVzKCkpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH0sXG4gICAgcmVuZGVyQWN0aW9ucyhzdGF0aWNBY3Rpb25zKSB7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJy5vaycpW3RoaXMub2sgPyAnc2hvdycgOiAnaGlkZSddKCk7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJy5jYW5jZWwnKVt0aGlzLmNsb3NlID8gJ3Nob3cnIDogJ2hpZGUnXSgpO1xuICAgICAgICB0aGlzLiRlbC5maW5kKCcuY3VzdG9tJylbdGhpcy5jdXN0b20gPyAnc2hvdycgOiAnaGlkZSddKCk7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJy5hY3Rpb25zJylbIXRoaXMub2sgJiYgIXRoaXMuY2xvc2UgJiYgIXRoaXMuY3VzdG9tID8gJ2hpZGUnIDogJ3Nob3cnXSgpO1xuICAgICAgICBzdGF0aWNBY3Rpb25zID0gc3RhdGljQWN0aW9ucyA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnO1xuICAgICAgICB0aGlzLiRlbC5maW5kKCcuYWN0aW9ucycpW3N0YXRpY0FjdGlvbnNdKCdzdGF0aWMnKTtcbiAgICAgICAgdGhpcy4kZWxbc3RhdGljQWN0aW9uc10oJ3N0YXRpYy1hY3Rpb25zJyk7XG4gICAgfSxcbiAgICByZW5kZXIoZGF0YSA9IHt9KSB7XG4gICAgICAgIGRhdGEgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgY3VzdG9tTmFtZTogXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgIH0sIF8ucGljayhkYXRhLCBbJ21lc3NhZ2UnLCAnY3VzdG9tTmFtZScsICd0ZW1wbGF0ZScsICdzdGF0aWNBY3Rpb25zJ10pKTtcbiAgICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKGRhdGEpKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICB0aGlzLnJlbmRlckFjdGlvbnMoZGF0YS5zdGF0aWNBY3Rpb25zKTtcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy4kZWwuZmluZCgnLmNvbnRlbnQnKS5odG1sKHRoaXMudmlldy4kZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvUG9wdXBWaWV3LmpzIiwiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJtZXNzYWdlIHB1bHNlXCI+PCU9IG1lc3NhZ2UgJT48ZGl2IGNsYXNzPVwiYW5pbVwiPjwvZGl2PjwvZGl2PmApLFxuICAgIHRhZ05hbWU6IFwid2FpdFwiLFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGxldCAkYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGlmICgkYm9keS5xdWVyeVNlbGVjdG9yQWxsKCd3YWl0JykubGVuZ3RoID09PSAwKSAkYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgZWxzZSB0aGlzLmVsID0gJGJvZHkucXVlcnlTZWxlY3Rvcignd2FpdCcpO1xuICAgIH0sXG4gICAgc3RhcnQobWVzc2FnZSwgJGVsKSB7XG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgJGVsID0gbWVzc2FnZTtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHsgbWVzc2FnZTogbWVzc2FnZSB8fCAnbG9hZGluZy4uLicgfSk7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnd2FpdC1jb250YWluZXInKTtcbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QuYWRkKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAgIGxldCAkd2FpdCA9IG5ldyBFbGVtZW50KFwid2FpdFwiKTtcbiAgICAgICAgICAgICR3YWl0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAkd2FpdC5pbnNlcnRCZWZvcmUoJHRlbXBsYXRlLCAkd2FpdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICRwYXJlbnQuaW5zZXJ0QmVmb3JlKCR3YWl0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICR0ZW1wbGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RvcDogKGNhbGxiYWNrKSA9PiB0aGlzLnN0b3AoJGVsLCBjYWxsYmFjaylcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHN0b3AoJGVsLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF8uaXNGdW5jdGlvbigkZWwpID8gJGVsIDogY2FsbGJhY2s7XG4gICAgICAgIGxldCAkd2FpdCA9ICRlbCAmJiAkZWwucXVlcnlTZWxlY3Rvcignd2FpdCcpIHx8IHRoaXMuZWw7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJGVsIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGxldCBlbGVtZW50cyA9ICR3YWl0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLCAubWVzc2FnZScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdwdWxzZScpO1xuICAgICAgICAgICAgZWxlbWVudHNbaV0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWNoaWxkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd3YWl0LWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgJHdhaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgJHdhaXQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGlmICgkZWwpICR3YWl0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHdhaXQpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlld3MvV2FpdFZpZXcuanMiLCJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IFdhaXRWaWV3IGZyb20gJy4vdmlld3MvV2FpdFZpZXcnO1xuaW1wb3J0IFBvcHVwVmlldyBmcm9tICcuL3ZpZXdzL1BvcHVwVmlldyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uVmlldyBmcm9tICcuL3ZpZXdzL05vdGlmaWNhdGlvblZpZXcnO1xuaW1wb3J0IEZvcm1WaWV3IGZyb20gJy4vdmlld3MvRm9ybVZpZXcnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL21vZGVscy9FbnRpdHknO1xuXG4vLyBBZGQgdG9rZW4gaW4gUkVTVCByZXF1ZXN0XG5jb25zdCB1c2VKd3QgPSAob3B0aW9ucyA9IHsgdG9rZW4oKSB7fSwgb25VbmF1dGhvcml6ZWQoKSB7fSB9KSA9PiB7XG4gICAgY29uc3Qgc3luYyA9IEJhY2tib25lLnN5bmM7XG4gICAgQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRzKSA9PiB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gb3B0aW9ucy50b2tlbigpO1xuICAgICAgICBpZiAodG9rZW4pIG9wdHMuYmVmb3JlU2VuZCA9ICh4aHIpID0+IHsgeGhyLnNldFJlcXVlc3RIZWFkZXIob3B0aW9ucy5oZWFkZXIgfHwgJ2F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7IH07XG4gICAgICAgIGxldCBlcnIgPSBvcHRzLmVycm9yO1xuICAgICAgICBvcHRzLmVycm9yID0gKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW0uc3RhdHVzICYmIHBhcmFtLnN0YXR1cyA9PT0gNDAxKSBvcHRpb25zLm9uVW5hdXRob3JpemVkKCk7XG4gICAgICAgICAgICBlcnIocGFyYW0pO1xuICAgICAgICB9O1xuICAgICAgICBzeW5jKG1ldGhvZCwgbW9kZWwsIG9wdHMpO1xuICAgIH07XG59O1xuXG5jb25zdCB2aWV3VXRpbHMgPSB7XG4gICAgdGFibGUob3B0aW9ucyA9IHsgY2xhc3NOYW1lOiBcIlwiLCBjb2x1bW5zOiBbXSwgZGF0YTogW10gfSkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZShgPHRhYmxlIGNsYXNzPVwie3sgY2xhc3NOYW1lIH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwie3sgY29sdW1uLmNsYXNzIH19XCI+e3sgY29sdW1uLmhlYWRlciB8fCBjb2x1bW4ucHJvcGVydHkgfX08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KXsgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwlIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4peyAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGNvbHVtbi50cmFuc2Zvcm0gPyBjb2x1bW4udHJhbnNmb3JtKGVudHJ5W2NvbHVtbi5wcm9wZXJ0eV0pIDogZW50cnlbY29sdW1uLnByb3BlcnR5XSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8JSB9KSAlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCUgfSkgJT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPmApKG9wdGlvbnMpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBOb3RpZmljYXRpb25WaWV3LFxuICAgIFBvcHVwVmlldyxcbiAgICBGb3JtVmlldyxcbiAgICBXYWl0VmlldyxcbiAgICB2aWV3VXRpbHMsXG4gICAgRW50aXR5LFxuICAgIHVzZUp3dFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGl6aS1iYWNrYm9uZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=