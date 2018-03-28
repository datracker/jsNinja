# jsNinja
## Notes and exercises from Secrets of the JavaScript Ninja-John Resig book

### Chapter-1: Introduction
- First: We will extensively use assert() and also test codes that execute asynchronously.
- Second: We will do performance analysis (how fast) of the functions

### Chapter-2: Testing and Debugging(Browser side JS)
- Make sure your code works in all browsers.

#### Debugging
- There are 2 important parts in to dubugging in JS: Logging statements(console.log()) and Breakpoint.

#### Test groups
- A collection of assert methods to test a particular method in your API

#### Asynchronous Testing
- test(fn) takes a function (which contains a number of assertions which will be run either synchronously or asynchronously), places it on the queue to await execution.
- pause() should be called from within a test function and tells the test suite to pause executing tests
until the test group is done.
- resume() un-pauses the tests and starts the next test running, after a short delay (this in place to avoid long-running code blocks).


### Chapter-3: Functions
- JS is a functional language. All functions in JS are first class(they are similar to JS object).

#### Function Definition
3 ways to define functions:
```javascript
function isNimble() { return true; };
var canFly = function() { return true; };
window.isDeadly = function(){ return true; };
```
Functions' location doesn't matter. You can call a function even before you defined it.

#### Anonymous Function
Anonymous functions are created for a specific purpose, and the only time they will be called when we need
that special purpose. That's why anonymous functions are created at runtime on the fly. These function will "do something" and pass the result to a variable. The variable will store the return value, and the function is not executed more than once.

```javascript
var obj = {
	someMethod: function(){
 		// This function is defined anonymously
 		return true;
 	}
};

setInterval(function(){
	// An anonymous function is called every 
	// 100 milliseconds
}, 100);
```

- Anonymous functions can be named but those names are only visible within the functions themselves.

```javascript
var ninja = function myNinja() {
	assert(ninja == myNinja, 'This function is named two things - at once!')
}
ninja()
assert( typeof myNinja == "undefined", "But myNinja isn't defined outside of the function." );
```

#### Functions as Objects
In JS functions are objects. So, functions have properties and an object prototype.
```javascript
var obj = {};
var fn = function(){};
obj.prop = "some value";
fn.prop = "some value";
assert( obj.prop == fn.prop, "Both are objects, both have the property." );
```

##### Storing Functions

##### Self Memoizing Functions


























