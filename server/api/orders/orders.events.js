/**
 * Orders model events
 */

'use strict';

import {EventEmitter} from 'events';
var Orders = require('../../sqldb').Orders;
var OrdersEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OrdersEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Orders.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    OrdersEvents.emit(event + ':' + doc._id, doc);
    OrdersEvents.emit(event, doc);
    done(null);
  }
}

export default OrdersEvents;
