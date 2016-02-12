
# createSingleton

  An abstracted-away best practice way to construct singletons.

  The Singleton pattern is thus known because it restricts instantiation of a class to a single object. Classically, the Singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist. In the event of an instance already existing, it simply returns a reference to that object.

  Singletons differ from static classes (or objects) as we can delay their initialization, generally because they require some information that may not be available during initialization time. They don't provide a way for code that is unaware of a previous reference to them to easily retrieve them. This is because it is neither the object or "class" that's returned by a Singleton, it's a structure. Think of how closured variables aren't actually closures - the function scope that provides the closure is the closure.

  In JavaScript, Singletons serve as a shared resource namespace which isolate implementation code from the global namespace so as to provide a single point of access for functions.

```javascript
function createSingleton(cb) {
  var args = Array.prototype.slice.call(arguments, 1);
  var name = '__' + (cb.name || Math.random());

  return function () {
    if (arguments.callee[name]) {
      return arguments.callee[name];
    }
    arguments.callee[name] = this;

    cb.apply(this, args.length ? args : arguments);
  };
};
```

That's all! Feel free to incorporate it back into any of your JavaScript programs.

## Installation

**NodeJS**

`npm install --save create-singleton`

or

**Browser**

Just include the `createSingleton.js` or `createSingleton.min.js`. It's umdjs compatible :)

## Usage

```javascript
var createSingleton = require('create-singleton');

var mySingleton = createSingleton(function mySingleton() {
  // Describes my singleton class
  var myPrivateVariable = 5;

  this.myPublicFunction = function() {
    // something cool happens
  };
});

// Contrust the singleton class
var myInstance1 = new mySingleton();

// ~ Later on ~

var myInstance2 = new mySingleton();
// This doesn't create a new instance of mySingleton but instead returns the same one
// So myInstance1 === myInstance2 is true
```

**Another Example**
```javascript
// File: a.js
var createSingleton = require('create-singleton');

function Singleton() {
  // Do something
}

Singleton.prototype.myPublicFunction = function () {};

module.exports = createSingleton(Singleton);

// .....

// File b.js
var mySingleton = require('./a.js');

// Contrust the singleton class
var myInstance1 = new mySingleton();

// ~ Later on ~

var myInstance2 = new mySingleton();
// This doesn't create a new instance of mySingleton but instead returns the same one
// So myInstance1 === myInstance2 is true
```

## License

(The MIT License)

Copyright (c) 2013-2016 Tarun Chaudhry &lt;opensource@chaudhry.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
