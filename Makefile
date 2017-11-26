HEADERS = sim.h util.h
TESTS=./tests
SRC=./src
BUILD=./build
CFLAGS=-std=gnu++0x -std=c++11

default: wasm

wasm:
	emcc $(SRC)/run.cpp $(SRC)/util.cpp $(SRC)/sim.cpp -O3 $(CFLAGS) -s WASM=1 --memory-init-file 1 -s EXPORTED_FUNCTIONS="['_run']" -o $(BUILD)/sim.js

test: $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp
	clang++ $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp -o test.out $(CFLAGS)