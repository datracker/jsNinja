var assert = require('assert');

/**
* If the first argument in the assert function is false
* then, it throws an error with the statement passed as the second argument.
*/
assert( true, "This statement is true." ); // Doesn't do anything
//assert( false, "This will never succeed." ); //Throws error

/**
*/
perf("String Concatenation", function(){
 var name = "John";
 for ( var i = 0; i < 20; i++ )
 name += name;
});