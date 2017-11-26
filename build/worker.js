onmessage = function(e) {
  console.log(e)
};

var Module = {
  cc: function(data) {
    // Wait until all the combos are done
    console.log(data);
  },
  totalDependencies: 0,
  onRuntimeInitialized: function() {
    Simulate = Module.cwrap('run', 'number', ['array', 'array', 'number', 'array', 'number','number']);
  }
};
importScripts("sim.js");