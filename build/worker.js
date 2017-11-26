let Simulate;
let simCombos = [];

onmessage = function(e) {
  var mod = e.data;
   const simCount = Math.round(200000 / (mod[2]/2));
  if (Simulate) Simulate(mod[0], mod[1], mod[2], mod[3], mod[4], simCount);
};

// Overrides for the generated emcc script, module gets redifined later
var Module = {
  preRun: [],
  postRun: [],
  print: function(data) {
    console.log(data);
  },
  cc: function(data) {
    // Wait until all the combos are done
    if (data[0]) {
      postMessage(['SIM', simCombos]);
      simCombos = [];
    } else {
      simCombos.push(data.splice(1));
    }
  },
  totalDependencies: 0,
  onRuntimeInitialized: function() {
    Simulate = Module.cwrap('run', 'number', ['array', 'array', 'number', 'array', 'number','number']);
  }
};

// This loads the wasm file
importScripts("sim.js");