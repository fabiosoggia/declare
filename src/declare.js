(function (window) {

	"use strict";

	/**
	 * Return true if key >= 0 or key === "default".
	 * @param  {string}  key
	 * @return {Boolean}
	 */
	function isValidKey (key) {
		if (key === "default") {
			return true;
		}

		var numKey = key * 1;
		if (window.isNaN(numKey)) {
			return false;
		}

		if (numKey >= 0) {
			return true;
		}

		return false;
	}

	/**
	 * In this library a valid type is a valid reference to a constructor function.
	 * This method return true if the type argument is a reference to an existing function,
	 * false otherwise.
	 * @param  {Any}  		type
	 * @return {Boolean}
	 */
	function isValidType (type) {
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
	function checkType(type, value) {
		if (!isValidType(type)) {
			return false;
		}

		// PRIMITIVE VALUE CHECKS:
		// Ex: 1, 2, 3
		if (typeof value === "number") {
			if (type.name === "Number") {
				return true;
			}
			if (type.name === "Object") {
				return true;
			}
		}

		// Ex: "", "a"
		if (typeof value === "string") {
			if (type.name === "String") {
				return true;
			}
			if (type.name === "Object") {
				return true;
			}
		}

		// Ex: true, false
		if (typeof value === "boolean") {
			if (type.name === "Boolean") {
				return true;
			}
			if (type.name === "Object") {
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
	function checkTypesParameter (types) {
		if (!types instanceof window.Object) {
			return false;
		}

		for (var key in types) {
			if (isValidKey(key)) {
				var type = types[key];
				if (!isValidType(type)) {
					return false;
				}
			}
		}
		return true;
	}

	function validate (types, args) {
		var defaultType = types.default;
		var argsLen = args.length;
		for (var i = 0; i < argsLen; i++) {
			var localType = types[i];
			var value = args[i];

			if (localType) {
				if (checkType(localType, value)) {
					continue;
				} else {
					throw new Error("Argument (" + (i) + ") must be " + localType.name + ".");
				}
			}

			if (defaultType) {
				if (checkType(defaultType, value)) {
					continue;
				} else {
					throw new Error("Argument (" + (i) + ") must be " + defaultType.name + ".");
				}
			}

		}
	}

	window.declare = function declare(types, f) {

		// CHECK TYPES CORRECTNESS
		if (!checkTypesParameter(types)) {
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
