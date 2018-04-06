/*
* Module Design Pattern
* JS code is divided into different modules. Modules are regarded as class in JS.
* Modules provide encapsulation - protecting states and behaviors accessed from other classes.
* IIFE: Immediately Invoked Function Expression
* IIFE is an anonymous function that is created and onvoked immediately.
*/
//Example of an IIFE
console.log(function() {
	return 5;
}());

//Module design patter example. 
//Created a module HTMLChanger which hides everything excepts the callChangeHTML method.
var HTMLChanger = (function() {
	var contents = 'content';
	var changeHTML = function () {
		//var element = document.getElementById('root');
		//element.innerHTML = contents;
	}
	return {
		callChangeHTML: function() {
			changeHTML();
			console.log(contents);
		}
	}
}());
HTMLChanger.callChangeHTML(); //contents
console.log(HTMLChanger.contents); //undefined

//Revealing module pattern is same, except that you can specify what to make public.
var Exposer = (function() {
	var privateVar = 10;
	var privateMethod = function() {
		console.log('Inside a private method');
		privateVar++;
	}
	var methodToExpose = function() {
		console.log('This method will be exposed');
	}
	var anotherMethodIWantToExpose = function() {
		privateMethod();
	}
	return {
		first: methodToExpose,
		second: anotherMethodIWantToExpose
	}

}());
Exposer.first(); //gets output
Exposer.second(); //gets output
//Exposer.methodToExpose(); //deosn't know this function. No output



/*
*
*/


