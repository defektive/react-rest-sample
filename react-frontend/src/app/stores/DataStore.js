var EventEmitter = require('wolfy87-eventemitter/EventEmitter')

export default (function (){

  function DataStore(attrs){
    attrs = attrs || {};
    this.store = (function (){
      var PRIVATE_STORE = {}
      return {
        set: function (key, value){
          if(PRIVATE_STORE[key] != value){
            PRIVATE_STORE[key] = value;
            return true;
          }
          return false;
        },
        get: function (key){
          return PRIVATE_STORE[key];
        }
      }
    })();

    var keys = Object.keys(attrs),
        numberOfKeys = keys.length,
        currentKey;

    while(numberOfKeys--){
      currentKey = keys[numberOfKeys];
      this.set(currentKey, attrs[currentKey])
    }
  }

  DataStore.prototype = Object.create(EventEmitter.prototype);
  DataStore.prototype.set = function (key, value){
    var oldValue = this.store.get(key);
    if(this.store.set(key, value)){
      this.emitEvent("changed:"+ key, [{
        key: key,
        oldValue: oldValue,
        value: value
      }, this]);

      this.emitEvent("changed", [{}, this]);
    } else {
      this.emitEvent("set:"+ key, [{}, this]);
    }
  }

  DataStore.prototype.get = function (key){
    return this.store.get(key);
  }

  DataStore.prototype.emitError = function (error){
    return this.emitEvent('error', [error])
  }

  return DataStore
})();
