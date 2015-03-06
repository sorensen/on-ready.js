'use strict';

var slice = Array.prototype.slice

/**
 * Listen to a list of objects that follow a common pattern of 
 *
 * 1) a `ready` boolean flag indicating if ready
 * 2) emits the event `ready`
 *
 * @param {Array} list of readyable objects
 * @param {Function} ready callback
 */

module.exports = function() {
  var args = slice.call(arguments)
    , next = args.pop()
    , list = [].concat.apply([], args)

  var x = list.length

  function go(err) {
    if (err) return next(err)

    // wont get called if any errors, ensure the callback
    // is called async in the case everything was ready
    if (!--x) process.nextTick(next)
  }

  list.forEach(function(obj) {
    if (obj.ready) return go()

    // wait for ready, tag obj with `ready` flag
    obj.on('ready', function(err) {
      obj.ready = !err
      go(err)
    })
  })
}
