'use strict';

var EventEmitter = require('events').EventEmitter
  , assert = require('assert')
  , ase = assert.strictEqual

describe('on-ready', function() {
  var onReady = require('./index')
    , ee1 = new EventEmitter()
    , ee2 = new EventEmitter()
    , ee3 = new EventEmitter()
    , ee4 = new EventEmitter()

  it('works', function(done) {
    var all = [ee1, ee2, ee3, ee4]

    onReady(all, function(err) {
      assert.ifError(err)

      all.forEach(function(ee, i) {
        ase(ee.ready, true)
      })

      // Should still work after ready events
      onReady(all, done)
    })

    all.forEach(function(ee, i) {
      ee.emit('ready')
    })
  })

  it('multi-args', function(done) {
    onReady(ee1, ee2, ee3, ee4, done)
  })

  it('multi-lists', function(done) {
    onReady([ee1, ee2], [ee3, ee4], done)
  })
})
