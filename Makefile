HEADERS = sim.h util.h
TESTS=./tests
SRC=./src
CFLAGS=-std=gnu++0x -std=c++11

default: wasm

wasm:
	emcc src/run.cpp src/util.cpp src/sim.cpp -O3 $(CFLAGS) -s WASM=1 --memory-init-file 1 -s EXPORTED_FUNCTIONS="['_run']" -o build/sim.js

test: $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp
	clang++ $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp -o test.out $(CFLAGS)