var assert = require('assert');

/**
* If the first argument in the assert function is false
* then, it throws an error with the statement passed as the second argument.
*/
assert( true, "This statement is true." ); // Doesn't do anything
//assert( false, "This will never succeed." ); //Throws error


//Recursion with regular function
function yell(n) {
	return n > 0 ? yell(n-1) + "a" : "hiy";
}
assert(yell(4) == "hiyaaaa", "Calling the function by itself comes naturally." );

//Recursion with anonymous function inside an object
var ninja1 = {
	yell: function(n) {
		return n > 0 ? ninja1.yell(n-1) + "a" : "hiy";
	}
};
assert(ninja1.yell(4) == "hiyaaaa", "A single object isn't too bad, either.");


//Verifying the identity of a named anonymous function.
var ninja2 = function myNinja(){
	assert( ninja2 == myNinja, "This function is named two things - at once!" );
};
ninja2();
assert( typeof myNinja == "undefined", "But myNinja isn't defined outside of the function." );

//Using arguments.callee to reference a function itself.
var ninja3 = {
	yell: function(n) {
		return n > 0 ? arguments.callee(n-1) + "a" : "hiy";
	}
};
assert(ninja3.yell(4) == "hiyaaaa", "arguments.callee is the function itself.");

//functions can have properties
var obj = {};
var fn = function() {};
obj.prop = "some value";
fn.prop = "some value";
assert(obj.prop == fn.prop, "Both are objects, both have the property.");

//Examining context within a function.
var katana = {
	isSharp: true,
	use: function() {
		this.isSharp = !this.isSharp;
	}
};
katana.use();
assert(!katana.isSharp, "Verifying the value od isSharp is changed");

//What context refers to within a function.
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

//Modifying the context of a function, when call.
var object = {};
function fn(){
	return this;
}
//assert( fn() == this, "The context is the global object." );
//assert( fn.call(object) == object, "The context is changed to a specific object." );

// Two methods of modifying a function's context
function sub(a, b) {
	return a - b;
}
//console.log(sub.call(this, 2, 3));
//console.log(sub.apply(this, [3, 2]));
assert(sub.call(this, 1, 2) == -1, ".call() takes individual arguments");
assert(sub.apply(this, [1, 2]) == -1, ".apply() takes an array of arguments");

//Looping with a function callback.
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

//Finding Max/Min in an array without going through all the elements, 
//Using Math object, and it's built-in methods instead
function smallest(array) {
	return Math.min.apply(Math, array);
}
function largest(array) {
	return Math.max.apply(Math, array);
}
assert(smallest([0,1,2,3]) == 0, "Locate the smallest value.");
assert(largest([0,1,2,3]) == 3, "Locate the largest value.");



















