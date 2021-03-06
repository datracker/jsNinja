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

//Changing function actions based upon the arguments.
function merge(root) {
    for (var i = 0; i < arguments.length; i++)
        for (var key in arguments[i])
            root[key] = arguments[i][key];
    return root;
}
var merged = merge( {name: "John"}, {city: "Reno"}, {ls: [1, 2, 3]} );
assert(merged.name === "John", "The original name is intact.");
assert(merged.city === "Reno", "And the city has been copied over.");
//Doesn't work. Can't compare objects using ===. You have to write a function for that.
//assert(merged.ls === [ 1, 2, 3 ], "And the list has been copied over."); 

//Handling a variable number of function arguments.
function multiMax(multi) {
    //multi refers only to the first argument
    //arguments variable isn't a regular Array object, so we add the slice method from
    //the Array prototype
    return multi * Math.max.apply(
        Math, Array.prototype.slice.call(arguments, 1));
}
//console.log(multiMax(2,2,3,4));
assert( multiMax(3, 1, 2, 3) == 9, "3*3=9 (First arg, by largest.)" );

//Simple Closure
function showName(firstName, lastName) {
    var nameIntro = 'Your name is ';
    function makeFullname() {
        return nameIntro + firstName + ' ' + lastName;
    }
    return makeFullname();
}
assert(showName('Mike', 'Jackson') == "Your name is Mike Jackson", "Simple Closure");

//Closures have access to the outer function’s variable even after the outer function returns
function fullName(firstName) {
    var nameIntro = 'The name is ';
    function getLastName(lastName) {
        return nameIntro + firstName + ' ' + lastName;
    }
    return getLastName; //returns the function unexecuted
}

var celebName = fullName('Shakib'); //Now celebName is referencing to the getLastName function
assert(celebName('Al-Hasan') == 'The name is Shakib Al-Hasan', 'closures Keeping variables after return');

//Closures store references to the outer function’s variables
function celebID() {
    var idNum = 999;
    return {
        getID: function() {
            return idNum;
        },
        setID: function(newID) {
            idNum = newID;
        }
    }
}
var mjID = celebID();
assert(mjID.getID() === 999, 'Did not return current ID');
mjID.setID(123);
assert(mjID.getID() === 123, 'Did not return updated ID');

//Closures Gone Awry
function celebIdCreator(celebs) {
    var uniqID = 100;
    for (var i = 0; i < celebs.length; i++) {
        celebs[i].id = function() {
            return uniqID + i;
        }
    }
    return celebs;
}
var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
//id is now pointing to a function which is not executed yet. 
//By the time the anonymous functions are called, the value of i is 3 
var actioncelebsIds = celebIdCreator(actionCelebs); 
assert(actioncelebsIds[0].id() === 103, 'The output is 103, should be 100');
assert(actioncelebsIds[1].id() === 103, 'The output is 103, should be 100');
assert(actioncelebsIds[2].id() === 103, 'The output is 103, should be 100');

//Fixed bug for the previous example using Immediately Invoked Function Expression (IIFE)
function celebIdCreator2(celebs) {
    var uID = 100;
    for (var i = 0; i < celebs.length; i++) {
        celebs[i].id = function() {
            return uID + i;
        }();
    }
    return celebs;
}
var actionCelebs2 = [{name:"Sakib", id:0}, {name:"Manna", id:0}, {name:"Josim", id:0}];
var actioncelebsIds2 = celebIdCreator2(actionCelebs2);
//id function is already invoked by IIFE
assert(actioncelebsIds2[0].id === 100, 'The output is 100, should be 100');
assert(actioncelebsIds2[1].id === 101, 'The output is 101, should be 101');
assert(actioncelebsIds2[2].id === 102, 'The output is 102, should be 102');





























