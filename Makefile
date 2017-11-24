HEADERS = sim.h util.h
TESTS=./tests
SRC=./src
CFLAGS=-std=gnu++0x

default: test

test: $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp
  clang++ $(TESTS)/sim_tests.cpp $(SRC)/sim.cpp -o test.out $(CFLAGS)