# holdem

[![Build Status](https://travis-ci.org/ChrisZieba/holdem.svg)](https://travis-ci.org/ChrisZieba/holdem)

A texas holdem simulator build with WASM and web workers.


# Improvements

This was a weekend project for me, and as such a lot of corners were cut. If I had more time I would go back and improve a lot of things.


- Faster card selector (remove select drop downs)
- Better way to select multiple ranges (click & drag to highlight multiple cells)
- Would like to add a lib like react to handle the state changes, and remove all the event listeners everywhere
- Use `SIDE_MODULE`  ()[] to load wasm as side module
- Loading the wasm is currently not optimal, a much better apprach would be to compile the wasmm and pass the bytes into the worker, something like this


     fetch('go.wasm').then(response =>
       response.arrayBuffer()
     ).then(bytes =>
       WebAssembly.compile(bytes)
     ).then(mod => {
       worker1.postMessage(mod);
       worker2.postMessage(mod);
     });

- As far as I know, WASM does not support pthreads (although there seem to be some emcc` flgas realted to it) but it would be nice if the c++ futures async library could be used as
a possible replacement for web workers. The simulationm code could then be changed to something like this:

    std::vector<std::future<int>> futures;

    for (int i = 0; i < COMBOS; i+=1) {
      futures.push_back (std::async([](uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1, uint8_t b0, uint8_t b1, uint8_t b2, uint8_t b3, uint8_t b4) {
        // Run the simulation loop in new thread for each hand combination
      } , heroCards[0], heroCards[1], COMBOS[i][0], COMBOS[i][1], board[0], board[1], board[2], board[3], board[4]));
    }

    for(auto &e : futures) {
      std::cout << e.get() << std::endl;
    }

- better data transfering between workers, use of sharedArray