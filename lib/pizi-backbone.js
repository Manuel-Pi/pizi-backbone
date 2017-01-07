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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
/*jshint loopfunc: true */



const Model = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend({
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
                        _.each(model.get(key).models, (model) => {
                            model.save(null, { all: options.all });
                        });
                    }
                });
                if (success) success.call(this, model, resp, options);
            };
        }
        // Proxy the call to the original save function
        __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.save.call(this, attrs, options);
    },
    fetch(options = {}) {
        if (options.all) {
            var success = options.success;
            options.success = (model, resp, opts) => {
                _.each(this.relations, (relation, key) => {
                    if (relation.collection && model.get(key) instanceof relation.collection) {
                        _.each(model.get(key).models, (model) => {
                            model.fetch({ all: options.all });
                        });
                    }
                });
                if (success) success.call(this, model, resp, options);
            };
        }
        __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.fetch.call(this, options);
    },
    toJSON(options = {}) {
        var attributes = _.clone(this.attributes);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                if (attributes[attribute] instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model) {
                    attributes[attribute] = options.all ? _.pick(attributes[attribute], "id") : attributes[attribute].toJSON(options);
                } else if (attributes[attribute] instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection) {
                    var converted = [];
                    attributes[attribute].forEach(attr => converted.push(options.all ? _.pick(attr, 'id') : attr.toJSON(options)));
                    attributes[attribute] = converted;
                }
            }
        }
        return attributes;
    },
    set: function(key, val, options) {
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
        return __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.prototype.set.apply(this, [attributes, options]);
    }
});

/**
 * Extend the Backbone.Model.extend method, to add some treatement on instance creation
 * @param  {Object} modelDefinition
 * @return {function} the model constructor
 */
Model.extend = function(modelDefinition) {
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
    return __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend.call(this, modelDefinition);
};

/**
 * The Collection
 * @type {Backbone.Collection}
 */
const Collection = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection.extend({
    /* Used to instanciate a new Model from Json (need to override if subtypes)*/
    model: Model
});

/**
 * Exporting the Model and the Collection
 */
/* harmony default export */ exports["a"] = {
    Model,
    Collection
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
        this.el.querySelectorAll(`input[name="${name}"]`).className += (this.errorClass);
    },
    getValues() {
        return this.$el.serializeArray();
    },
    getObject() {
        let object = {};
        _.each(this.getValues(), (attribute) => object[attribute.name] = attribute.value);
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
    render(options = {}) { if (this.template) this.$el.html(this.template); }
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
    template: _.template(`<h3 class="notif <%= className %>"><%= message %><a class="close">&times;</a></h3>`),
    initialize(options = {}) {
        let $notif = document.body.getElementsByTagName('notification')[0];
        if (!$notif) document.body.appendChild(this.el);
        else this.el = $notif;
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
    success(message, options = {}) { this.render({ className: "success", message: message }, options); },
    error(message, options = {}) { this.render({ className: "alert", message: message }, options); },
    warn(message, options = {}) { this.render({ className: "warning", message: message }, options); },
    notify(message, options = {}) { this.render({ message: message }, options); },
    render(notif, options = {}) {

        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.template({ className: notif.className, message: notif.message });
        const $notif = wrapper.lastChild;
        this.el.appendChild($notif);
        if (!options.permanent) setTimeout(() => { this.close($notif); }, options.duration || this.duration);
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
        if (!$popup) document.body.appendChild(this.el);
        else this.el = $popup;
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
            } else if (params.template instanceof __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View) {
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.View.extend({
    template: _.template(`<div class="background" style="display:block"></div><div class="message pulse"><%= message %><div class="anim"></div></div>`),
    tagName: "wait",
    initialize() {
        let $body = document.body;
        if ($body.querySelectorAll('wait').length === 0) $body.appendChild(this.el);
        else this.el = $body.querySelector('wait');
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
            stop: (callback) => this.stop($el, callback)
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_WaitView__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_PopupView__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_NotificationView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_FormView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Entity__ = __webpack_require__(2);







// Add token in REST request
const useJwt = (options = { token() {}, onUnauthorized() {} }) => {
    const sync = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync;
    __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.sync = (method, model, opts) => {
        const token = options.token();
        if (token) opts.beforeSend = (xhr) => { xhr.setRequestHeader(options.header || 'authorization', 'Bearer ' + token); };
        let err = opts.error;
        opts.error = (param) => {
            if (param.status && param.status === 401) options.onUnauthorized();
            err(param);
        };
        sync(method, model, opts);
    };
};

/* harmony default export */ exports["default"] = {
    NotificationView: __WEBPACK_IMPORTED_MODULE_3__views_NotificationView__["a" /* default */],
    PopupView: __WEBPACK_IMPORTED_MODULE_2__views_PopupView__["a" /* default */],
    FormView: __WEBPACK_IMPORTED_MODULE_4__views_FormView__["a" /* default */],
    WaitView: __WEBPACK_IMPORTED_MODULE_1__views_WaitView__["a" /* default */],
    Entity: __WEBPACK_IMPORTED_MODULE_5__models_Entity__["a" /* default */],
    useJwt
};

/***/ }
/******/ ]);
});