// The singleton pattern is a design pattern that is used to restrict
// instantiation of a class to one object. This is useful when exactly
// one object is needed to coordinate actions across the system.
function createSingleton(cb) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    if (arguments.callee._singletonInstance) {
      return arguments.callee._singletonInstance;
    }
    arguments.callee._singletonInstance = this;

    cb.apply(this, args.length ? args : arguments);
  };
}

/**
 * Expose `createSingleton` function.
 */
module.exports = createSingleton;
