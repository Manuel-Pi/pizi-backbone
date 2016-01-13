"use strict";

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "backbone"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("backbone"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.backbone);
		global.main = mod.exports;
	}
})(this, function (exports, _backbone) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = {
		foo: function () {
			$('body').html("Hello World!");
		}
	};
});
