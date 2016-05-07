/**
 * OrderSources model events
 */

'use strict';

import {EventEmitter} from 'events';
var OrderSources = require('../../sqldb').OrderSources;
var OrderSourcesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OrderSourcesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  OrderSources.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    OrderSourcesEvents.emit(event + ':' + doc._id, doc);
    OrderSourcesEvents.emit(event, doc);
    done(null);
  }
}

export default OrderSourcesEvents;
