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

//
