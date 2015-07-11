# Declare.js

In Javascript, when you declare a function you can't make any restriction about the type of arguments. You always
have to manual check the type of your arguments. This means that you can call the same function with arguments of
any type. This may cause unpredictable behavior.

For example this function has different results depending to the type its arguments:

```javascript
function sum(a, b) {
	return a + b;
}

sum(1, 2);		// 3
sum(1, "2");	// "12" <- this is not a sum, it's a string concatenation
```

Declare.js let you to explicitly declare the type of your arguments. Your function is called only if the arguments
have the right type. Let's rewrite the example code using Declare.js:

```javascript
var sum = declare([Number, Number], function sum(a, b) {
	return a + b;
});

sum(1, 2);		// 3
sum(1, "2");	// throws Error("Invalid type for argument (1).")
```

Thank to Declare.js you can always trust the arguments of your functions.
Isn't it simple?


## Installation

Include `declare.min.js` in your HTML file and you are ready to go.

```html
<script type="text/javascript" src="src/declare.min.js"></script>
```


## Usage

After your page has loaded, you may call the script like so:

```javascript
var myFunctionName = declare(types, f);
```

Where:

* `types`: (Array of Function) [REQUIRED] it lists the types of your arguments. The first element of the array is the type of the first argument, the second element is the type of your second argument and so on;
* `f`: (Function) [REQUIRED] it's the function you want to declare in your code.

A type is a reference to a constructor function. Example of "primitive" types are:

* Number (window.Number);
* String (window.String);
* Boolean (window.Boolean);
* Object (window.Object);
* Array (window.Array);

You can use your own object types.


## Contribute
Feel free to fork me! =)


## Licensing
The MIT License (MIT)

Copyright (c) 2014 Fabio Soggia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
