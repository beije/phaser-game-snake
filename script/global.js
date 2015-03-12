/**
 * Contains global helper functions.
 * @file global.js
 */

/**
 * Makes sure that a namespace exists.
 *
 * @param {string} ns The namespace.
 * @return {object} The namespace objectified.
 */
function namespace(ns) {
	var object = this, tokens = ns.split('.'), token;

	while (tokens.length > 0) {
		token = tokens.shift();

		if (typeof object[token] === 'undefined') {
			object[token] = {};
		}

		object = object[token];
	}

	return object;
}

if (!Function.prototype.bind) {
	/**
	 * Adds cross-browser support for the bind method.
	 *
	 * @param {object} self A reference to this object.
	 * @return {object} Returns a function within the context of the bound object.
	 */
	Function.prototype.bind = function(self) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var args = Array.prototype.slice.call(arguments, 1),
			func = this,
			nop = function() {},
			bound = function() {
				return func.apply(this instanceof nop && self ? this : self, args.concat(Array.prototype.slice.call(arguments)));
		};

		nop.prototype = this.prototype;
		bound.prototype = new nop();

		return bound;
	};
}