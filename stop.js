var Emitter = require('./build/src/index').default;
console.log(Emitter);

var emitter = Emitter({
  emitterId: 'Stop',
  trigger: 'simulation'
});
emitter.start();
