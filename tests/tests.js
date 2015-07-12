QUnit.module("Inheritance");

QUnit.test("Number", function(assert) {

	"use strict";

	var f = declare([Number], function f(a) {
		return true;
	});

	assert.equal(true, f(1), "1 is a Number");

	assert.throws(function () {
		f(true);
	}, "Boolean in not a Number");

	assert.throws(function () {
		f("1");
	}, "String in not a Number");

	assert.throws(function () {
		f([1]);
	}, "Array in not a Number");

	assert.throws(function () {
		f({});
	}, "Literal Object in not a Number");

	assert.throws(function () {
		f(undefined);
	}, "undefined in not a Number");

	assert.throws(function () {
		f(null);
	}, "null in not a Number");

});


QUnit.test("Boolean", function(assert) {

	"use strict";

	var f = declare([Boolean], function f(a) {
		return true;
	});

	assert.throws(function () {
		f(1);
	}, "1 in not a Boolean");

	assert.equal(true, f(true), "true is Boolean");
	assert.equal(true, f(false), "false is Boolean");

	assert.throws(function () {
		f("true");
	}, "String in not a Boolean");

	assert.throws(function () {
		f([true]);
	}, "Array Object in not a Boolean");

	assert.throws(function () {
		f({});
	}, "Literal Object in not a Boolean");

	assert.throws(function () {
		f(undefined);
	}, "undefined in not a Boolean");

	assert.throws(function () {
		f(null);
	}, "null in not a Boolean");

});


QUnit.test("Object", function(assert) {

	"use strict";

	var f = declare([Object], function f(a) {
		return true;
	});

	assert.equal(true, f(1), "Number is an Object");
	assert.equal(true, f(true), "Boolean is an Object");
	assert.equal(true, f(""), "String is an Object");
	assert.equal(true, f([]), "Array is an Object");
	assert.equal(true, f({}), "Literal Object");

	assert.throws(function () {
		f(undefined);
	}, "undefined in not an Object");

	assert.throws(function () {
		f(null);
	}, "null in not an Object");
});

function Parent () {
	"use strict";
	// constructor
}

function Child () {
	"use strict";
	Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype);

QUnit.test("Custom Types: Parent", function(assert) {

	"use strict";

	var f = declare([Parent], function f(a) {
		return true;
	});

	assert.equal(true, f(new Parent()), "Parent object");
	assert.equal(true, f(new Child()), "Child is a Parent");

	assert.throws(function () {
		f(1);
	}, "1 in not a Parent");

	assert.throws(function () {
		f(true);
	}, "Boolean in not a Parent");

	assert.throws(function () {
		f("true");
	}, "String in not a Parent");

	assert.throws(function () {
		f([true]);
	}, "Array Object in not a Parent");

	assert.throws(function () {
		f({});
	}, "Literal Object in not a Parent");

	assert.throws(function () {
		f(undefined);
	}, "undefined in not a Parent");

	assert.throws(function () {
		f(null);
	}, "null in not a Parent");

});

QUnit.test("Custom Types: Child", function(assert) {

	"use strict";

	var f = declare([Child], function f(a) {
		return true;
	});

	assert.equal(true, f(new Child()), "Child is a Child");
	assert.throws(function () {
		f(new Parent());
	}, "Parent is not a Child");

	assert.throws(function () {
		f(1);
	}, "1 in not a Child");

	assert.throws(function () {
		f(true);
	}, "Boolean in not a Child");

	assert.throws(function () {
		f("true");
	}, "String in not a Child");

	assert.throws(function () {
		f([true]);
	}, "Array Object in not a Child");

	assert.throws(function () {
		f({});
	}, "Literal Object in not a Child");

	assert.throws(function () {
		f(undefined);
	}, "undefined in not a Child");

	assert.throws(function () {
		f(null);
	}, "null in not a Child");

});

QUnit.test("Local Types", function(assert) {

	"use strict";

	var f = declare({}, function (a) {
		return true;
	});

	assert.equal(true, f(1), "Accept all types (Number)");
	assert.equal(true, f(true), "Accept all types (Boolean)");

	f = declare({0: Number}, function (a, b) {
		return true;
	});
	assert.equal(true, f(1), "First argument must be a Number");
	assert.equal(true, f(1, "b"), "First argument must be a Number");
	assert.throws(function () {
		f("a", 1);
	}, "First argument must be a Number");

	f = declare({1: Number}, function (a, b) {
		return true;
	});
	assert.equal(true, f(1), "Second argument must be a Number");
	assert.equal(true, f("a", 1), "Second argument must be a Number");
	assert.throws(function () {
		f(1, "b");
	}, "Second argument must be a Number");

	f = declare({0: Number, 1: String}, function (a, b) {
		return true;
	});
	assert.equal(true, f(1, "b", 3), "Any type for undeclare arguments");
	assert.equal(true, f(1, "b", "c"), "Any type for undeclare arguments");
	assert.equal(true, f(1, "b", "c", {}), "Any type for undeclare arguments");

});


QUnit.test("Default Type", function(assert) {

	"use strict";

	var f = declare({ default: Number }, function (a) {
		return true;
	});

	assert.equal(true, f(1), "Numbers only (Correct)");
	assert.throws(function () {
		f(true);
	}, "Numbers only (Wrong)");


	f = declare({0: String, default: Number}, function (a, b) {
		return true;
	});
	assert.equal(true, f("a"), "First argument must be a String");
	assert.throws(function () {
		f(1);
	}, "First argument must be a String");

	assert.equal(true, f("a", 1), "Number type for undeclare arguments");
	assert.throws(function () {
		f("a", "b");
	}, "Number type for undeclare arguments");

});
