# holdem

[![Build Status](https://travis-ci.org/ChrisZieba/holdem.svg)](https://travis-ci.org/ChrisZieba/holdem) ![](https://img.shields.io/badge/license-MIT-blue.svg) ![](https://img.shields.io/badge/status-stable-green.svg)

**holdem** is a heads-up (2 player) [Texas Hold'em](https://en.wikipedia.org/wiki/Texas_hold_%27em) simulator for hand ranges. It allows you to quickly calculate the total equity of your hand vs. a range of opponent hands. The simulations are calculated using `C++` via WebAssembly using up to `8` web workers in parallel. This is pretty bare bones as far as range evaluators go, and there are many improvements I would like to make if I hade more time, see below. 

[![MoodFuse](https://github.com/ChrisZieba/holdem/raw/master/common/demo.png)](http://chriszieba.com/2017/11/26/holdem)

Demo
---

[http://chriszieba.com/2017/11/26/holdem](http://chriszieba.com/2017/11/26/holdem)

Installing
---

```
make wasm
```

Calling `make` will place the compiled wasm and a javascript "glue" file into the `/build` directory. You can then include those files on a webserver and just open the `index.html` page to get up and running.


FAQ
---
* Why did you make this?
  > I put this together as a weekend project to learn more about `WebAssembly`.

* What's a simulation?
  > A simulation plays a hand out as if the players are all in and no action is left. For example, if the board only has 3 cards (flop) and you run the simulation, the board will complete (turn and river) for every possible combination of hands in the oppoopenet range vs. the hero hand.

* What does this use to compile to `wasm`?
  > [emscripten](https://github.com/kripken/emscripten)

* Why don't you use the `--proxy-to-worker` option from `emscripten`?
  > I tried using this flag, but the `.js` file it produced was quite large and I could not get the message passing to work to the main thread.

* Why doesn't this use a faster library for hand comparisons?
  > There are many great options for an extrememly fast 7-card hand evaluator, but they all come with a large pre-computed table. Using a pre-computed table of values requires a large download (~100mb) before the app can be run, is not a great option for a web facing product. The speed difference between the [library](https://github.com/kennethshackleton/SKPokerEval) used in this app and other more well known libraries is not significant enough to justify the huge table downloads.

* How many simulations can this run?
  > Depends on the system architecture, but with `8` workers it should run about `20` million simulations a second.

* What browsers does this work on?
  > So far, I've tested on the following browsers  
  > 
  >  * FireFox 57 (Mac OS 10, Ubuntu 16.04, Windows 10)
  >  * Chrome 61 (Mac OS 10, Windows 10, Android 6)
  >  * Safari 11 (Mac OS 10)
  >  * Microsoft Edge 16 (Windows 10)


Tests
---

```
make tests
```


# Improvements

This was a weekend project for me, and as such a lot of corners were cut. If I had more time I would go back and improve a lot of things.

- Faster card selector (remove select drop downs)
- Better way to select multiple ranges (click & drag to highlight multiple cells)
- Would like to add a lib like react to handle the state changes, and remove all the event listeners everywhere
- Use `SIDE_MODULE` to load wasm as [side module](https://github.com/kripken/emscripten/wiki/Linking)
- Loading the wasm is currently not optimal, a much better apprach would be to compile the wasmm and pass the bytes into the worker, something like this

  ```
     fetch('go.wasm').then(response =>
       response.arrayBuffer()
     ).then(bytes =>
       WebAssembly.compile(bytes)
     ).then(mod => {
       worker1.postMessage(mod);
       worker2.postMessage(mod);
     });
  ```

- As far as I know, WASM does not support pthreads (although there seem to be some emcc` flgas realted to it) but it would be nice if the `C++` futures async library could be used as
a possible replacement for web workers. The simulation code could then be changed to something like this:

  ```
    std::vector<std::future<int>> futures;

    for (int i = 0; i < COMBOS; i+=1) {
      futures.push_back (std::async([]() {
        // Run the simulation loop in new thread for each hand combination
      } , heroCards[0], ...));
    }

    for(auto &e : futures) std::cout << e.get() << std::endl;
  ```

- better data transfering between workers, use of sharedArray
