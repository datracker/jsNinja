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
* Every object is JS has prototype. You can add functionality to an object by using the
* prototype keyword.
*/

//Prototype pattern example
var TeslaModelS = function() {
    this.wheels = 4;
    this.maker = 'Tesla';
    this.model = 'S'
}
var car1 = new TeslaModelS();
console.log(car1.go); //undefined
TeslaModelS.prototype.go = function() {
    console.log('runs fast');
}
TeslaModelS.prototype.stop = function() {
    console.log('breaks hard');
}
var car = new TeslaModelS();
console.log(car.maker); //Tesla
car.stop(); //breaks hard
car1.go(); //runs fast

//Revealing Prototype Pattern
var TeslaModelS = function() {
    this.wheels = 4;
    this.maker = 'Tesla';
    this.model = 'S'
}
TeslaModelS.prototype = (function() {
    var go = function() {
        console.log('runs fast');
    }
    var stop = function() {
        console.log('breaks hard');
    }
    return {
        pressBreakPedal: stop,
        pressGasPedal: go
    }
}());
var car2 = new TeslaModelS();
//car2.stop(); //undefined, not a function
car2.pressBreakPedal(); //breaks hard


/*
* The Observer is a design pattern where an object (known as a subject) maintains a list of objects 
* depending on it (observers), automatically notifying them of any changes to state. When a subject 
* needs to notify observers about something interesting happening, it broadcasts a notification to 
* the observers (which can include specific data related to the topic of the notification). 
* When we no longer wish for a particular observer to be notified of changes by the subject they are 
* registered with, the subject can remove them from the list of observers.
* 
* The Publish/Subscribe pattern, however, uses a topic/event channel that sits between the objects 
* wishing to receive notifications (subscribers) and the object firing the event (the publisher). 
* The idea here is to avoid dependencies between the subscriber and publisher. This differs from 
* the Observer pattern since any subscriber implementing an appropriate event handler to register 
* for and receive topic notifications broadcast by the publisher.
*/

var Subject = function() {
    const observers = [];
    return {
        subscribeObserver: function(observer) {
            observers.push(observer);
        },
        unsubscribeObserver: function(observer) {
            var index = observers.indexOf(observer);
            if(index > -1) {
                observers.splice(index, 1);
            }
        },
        notifyObserver: function(observer) {
            var index = observers.indexOf(observer);
            if(index > -1) {
                observers[index].notify(index);
            }
        },
        notifyAllObservers: function() {
            for(var i = 0; i < observers.length; i++){
                observers[i].notify(i);
            }
        }
    };
}
var Observer = function() {
  return {
    notify: function(index) {
      console.log("Observer " + index + " is notified!");
    }
  }
}
var subject = new Subject();
var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
var observer4 = new Observer();

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);

subject.notifyObserver(observer2); // Observer 2 is notified!
subject.notifyAllObservers();

/*
* Singleton design pattern is used to create only one instance of a prototype or class.
* That one instance is used several times throughout the application. Singleton pattern 
* prohibits creating multiple instances of the same class/prototype. 
* Example: We create a single instance of an app from Express() and a single instance
* to access the database.
*/

var express = require('express');
var app = express(); //creates a single instance of express

var mongoose = require('mongoose');
var mongoDB = 'mongodb://<mongodb URI>';
mongoose.connect(mongoDB);
var db = mongoose.connection; //single instance of database
