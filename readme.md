on-ready
========

Wait for a list of readyable objects to be ready. Objects used must have two 
qualifications:

1. has an `on` method
2. emits a `ready` event
3. has or can have a `ready` boolean flag to note if ready


Install
-------

With [npm](https://npmjs.org)

```
npm install on-ready
```

Usage
-----

Node.js

```js
var onReady = require('on-ready')

// use on some redis clients
var redis = require('redis')
  , client1 = redis.createClient()
  , client2 = redis.createClient()

onReady([client1, client2], function(err) {
  // ...
})

// can call using arguments
onReady(client1, client2, function() { 
  // ...
})
```
