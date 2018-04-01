# jsNinja
#### Notes from Secrets of the JavaScript Ninja-John Resig book

## Chapter-1: Introduction
- First: We will extensively use assert() and also test codes that execute asynchronously.
- Second: We will do performance analysis (how fast) of the functions

## Chapter-2: Testing and Debugging(Browser side JS)
- Make sure your code works in all browsers.

### Debugging
- There are 2 important parts in to dubugging in JS: Logging statements(console.log()) and Breakpoint.

### Test groups
- A collection of assert methods to test a particular method in your API

### Asynchronous Testing
- test(fn) takes a function (which contains a number of assertions which will be run either synchronously or asynchronously), places it on the queue to await execution.
- pause() should be called from within a test function and tells the test suite to pause executing tests
until the test group is done.
- resume() un-pauses the tests and starts the next test running, after a short delay (this in place to avoid long-running code blocks).


## Chapter-3: Functions
- JS is a functional language. All functions in JS are first class(they are similar to JS object).

### Function Definition
3 ways to define functions:
```javascript
function isNimble() { return true; };
var canFly = function() { return true; };
window.isDeadly = function() { return true; };
```
Functions' location doesn't matter. You can call a function even before you defined it.

### Anonymous Function
Anonymous functions are created for a specific purpose, and the only time they will be called when we need
that special purpose. That's why anonymous functions are created at runtime on the fly. These function will "do something" and pass the result to a variable. The variable will store the return value, and the function is not executed more than once.

```javascript
var obj = {
  someMethod: function() {
  	// This function is defined anonymously
  	return true;
  }
};

setInterval(function() {
  // An anonymous function is called every 
  // 100 milliseconds
}, 100);
```

- Anonymous functions can be named but those names are only visible within the functions themselves.

```javascript
var ninja = function myNinja() {
  assert( ninja == myNinja, 'This function is named two things - at once!' )
}
ninja()
assert( typeof myNinja == "undefined", "But myNinja isn't defined outside of the function." );
```

### Functions as Objects
In JS functions are objects. So, functions have properties and an object prototype.
```javascript
var obj = {};
var fn = function() {};
obj.prop = "some value";
fn.prop = "some value";
assert( obj.prop == fn.prop, "Both are objects, both have the property." );
```

#### Storing Functions
Let's say we want to store functions in a script. To do this, the best way would be to create an object which stores the "id"s of the functions. As functions are objects and have properties, we can use that property to create an id for each function. And then look-up for that id in constant time.
```javascript
var store = {
	id: 1,
	cache: {},
	add: function( fn ) {
		if( !fn.id ) {
			fn.id = store.id++;
			return !!( store.cache[fn.id] = fn );
		}
	}
};
function ninja(){}
assert( store.add(ninja), "Function was safely added." );
assert( !store.add(ninja), "But it was only added once." )
```


#### Self Memoizing Functions
Memoization is the process of building a function which is capable of remembering its previously computed answers. Because a function has property like an object in JS, we can cache the previously computed result with a function.
```javascript
function isPrime(num) {
  if( isPrime.answers[num] != null ) { return isPrime.answers[num] }
  var prime = num != 1; //1 is not prime
  for( var i = 2; i < num; i++ ) {
  	if ( num % i == 0 ) {
  		prime = false;
  		break;
  	}
  }
  return isPrime.answers[num] = prime;
}
isPrime.answers = {};

assert( isPrime(5), "Make sure the function works, 5 is prime." );
assert( isPrime.answers[5], "Make sure the answer is cached" );
```

### Context
- Understanding Context is very cruicial to write great JS code.
- Function context: The object within which the function is being executed. For example, defining a function inside an object structure will ensure that the context always refers to that object.
- By having an implicit 'this' variable be included within every function it gives you great flexibility for how the function can be called and executed.
```javascript
var katana = {
  isSharp: true,
  use: function() {
	this.isSharp = !this.isSharp;
  }
};
katana.use();
assert(!katana.isSharp, "Verifying the value od isSharp is changed");
```
But if a function that wasn't declared as a property of on object, then the function's context refer to a global object. If there's no global objet with that name, JS creates one for that function.
```javascript
function katana2() {
	this.isSharp2 = true;
}
katana2();
assert(isSharp2 === true, "A global object now exists with that name and value");

var shuriken = {
  toss: function() {
    this.isSharp2 = false;
  }
};
shuriken.toss();
assert(isSharp2 === true, "It's an object property, the value is set within the object");
```
Inside a function 'this' refers to an empty object in Node.js, and when used with 'use strict' in browser side, it also refers to en empty object. Otherwise the following code works(only in browser side, w/o 'use strict')
```javascript
var object = {};
function fn(){
  return this;
}
assert( fn() == this, "The context is the global object." );
assert( fn.call(object) == object, "The context is changed to a specific object." );
```
JS provides two methods: call and apply. These can be used to call the function, define its context, and specify its incoming arguments.  Simply, .call() passes in arguments individually whereas .apply()
passes in arguments as an array.
```javascript
function sub(a, b) {
  return a - b;
}
console.log(sub.call(this, 2, 3));
console.log(sub.apply(this, [3, 2]));
assert(sub.call(this, 1, 2) == 3, ".call() takes individual arguments");
assert(sub.apply(this, [1, 2]) == 3, ".apply() takes an array of arguments");
```

#### Looping
To loop an array and use a callback function for each member of the array. Much like the map/filter function. We can see how we use .call() method tin the callback function.
```javascript
function loop(array, fn) {
  for (var i = 0; i < array.length; i++) {
  	if(fn.call(array, array[i], i) === false)
	  break;
  }
}
var num = 0;
loop([0,1,2], function(value, i) {
  assert(value == num++, "Make sure the contents are as we expect it.");
})
```

#### Fake Array Methods
- Objects in JS typically inherit properties and methods from Object.prototype, although these properties and methods can be overwritten.
- Array.prototype property represents the prototype for the Array constructor and allows you to add new properties and methods for an Array object.
Now if we want to make an object iterable(array-like), we need to do this(see the following code). The elems object became iterable, when we used Array.prototype.push to push an elem. Array.prototype is the prototype for Array object. So, when we pass the "this" keyword as an argument, the Array.prototype understands the current context of this object(which is elems object in this example), and make this object array-like. We see that, the length property is modified, and a new numbered property will exist containing the added item.

```javascript
<input id="first"/>
<input id="second"/>

<script>
var elems = {
  length: 0,
  find: function(id) {
    this.add( getElementById(id) );
  },
  add: function(elem) {
    Array.prototype.push.call(this, elem);
  }
}

console.log(elems.length); //0
console.log(elems[0]); //undefined
elems.add("first"); 
console.log(elems.length); //1
console.log(elems[0]); //first
elems.add("second");
console.log(elems.length); //2
console.log(elems[1].add("third")); //error, add is not defined
</script>
```

### Variable Arguments

#### Min/Max Number in an Array
JS array doesn't have the max/min method by default. We can create these two methods. To find the Min/Max array we don't really have to iterate through all the elements. Because, we can use the built-in Math object is JS. The built-in Math object has min/max methods which takes any number of arguments. We use apply() method to pass an arbitrary size array.
```javascript
function smallest(array) {
  return Math.min.apply(Math, array);
}
function largest(array) {
  return Math.max.apply(Math, array);
}
assert(smallest([0,1,2,3]) == 0, "Locate the smallest value.");
assert(largest([0,1,2,3]) == 3, "Locate the largest value.");
```
#### Function Overloading
#### Function Length

### Function Type




## Chapter-4: Closures
























