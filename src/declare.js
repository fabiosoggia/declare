(function (window) {

	"use strict";

	/**
	 * In this library a valid type is a valid reference to a constructor function.
	 * This method return true if the type argument is a reference to an existing function,
	 * false otherwise.
	 * @param  {Any}  		type
	 * @return {Boolean}
	 */
	function isType (type) {
		if (typeof type === "function") {
			return true;
		}
		return false;
	}

	/**
	 * Return true if value is an instance of type.
	 * @param  {Function}  type
	 * @param  {Anything}  value
	 * @return {Boolean}
	 */
	function isValidType(type, value) {
		if (!isType(type)) {
			return false;
		}

		// PRIMITIVE VALUE CHECKS:
		// Ex: 1, 2, 3
		if (type.name === "Number") {
			if (typeof value === "number") {
				return true;
			}
		}

		// Ex: "", "a"
		if (type.name === "String") {
			if (typeof value === "string") {
				return true;
			}
		}

		// Ex: true, false
		if (type.name === "Boolean") {
			if (typeof value === "boolean") {
				return true;
			}
		}

		// OBJECT ORIENTED CHECKS:

		return (value instanceof type);
	}

	/**
	 * Return true if the array contains all valid object types (functions), false otherwise.
	 * @param  {Array of Function} types
	 * @return {Boolean}
	 */
	function areTypes (types) {
		for (var i = types.length - 1; i >= 0; i--) {
			if (!isType(types[i])) {
				return false;
			}
		}
		return true;
	}

	function validate (types, args) {
		var typesLen = types.length;
		var argsLen = args.length;
		for (var i = 0; i < argsLen && i < typesLen; i++) {
			var type = types[i];
			var value = args[i];

			if (isValidType(type, value)) {
				continue;
			}

			throw new Error("Invalid type for argument (" + (i + 1) + ").");
		}
	}

	window.declare = function declare(types, f) {

		// CHECK TYPES CORRECTNESS
		if (!areTypes(types)) {
			// If there is something wrong in the types array, the system will not
			// declare the function and it will throw an exception.
			throw new Error("Invalid types array passed to the declare() function.");
		}

		return function () {
			// This call will throw an exception if any argument does not match the
			// right type.
			validate(types, arguments);
			return f.apply(this, arguments);
		};
	};

})(window);
