var Emitter = require('./build/src/index').default;
console.log(Emitter);

var emitter = Emitter({
  emitterId: 'Start'
});
emitter.start();
