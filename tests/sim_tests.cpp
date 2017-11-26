#include <iostream>
#include <assert.h>
#include <tgmath.h>

#include "../src/sim.h"
#include "../src/eval/SevenEval.h"

/**
    Returns an int value based on two given hand values.

    @param h0 The hero players first card, must be between 0 and 51 inclusive.
    @param h1 The hero players second card, must be between 0 and 51 inclusive.
    @param v0 The opponent players first card, must be between 0 and 51 inclusive.
    @param v1 The opponent players second card, must be between 0 and 51 inclusive.
    @param b0..b4 The community cards, between 0-51 or 255 for not dealt yet.
    @param boardSize The number of community cards dealt so far (can be 3,4,5).
    @param expected The expected percentage of wins
    @param error An acceptabe range of error +=%
    @return The total number of wins from the simulation.
*/
int test(uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1, uint8_t b0, uint8_t b1, uint8_t b2, uint8_t b3, uint8_t b4, int boardSize, double expected, double error) {
  int totalWin = 0, totalLoss = 0, totalTie = 0, totalSimulations = 0;

  for (int i = 0; i < 100000; i+=1) {
    int out = sim(h0, h1, v0, v1, b0, b1, b2, b3, b4, boardSize);

    if (out > 0) totalWin+=1;
    else if (out < 0) totalLoss+=1;
    else totalTie+=1;

    totalSimulations+=1;
  }

  
  double winRate = (totalWin/(totalSimulations/1.0))*100;

  printf("hero:[%d %d] vilian:[%d %d] board:[%d %d %d %d %d] win rate:%f\n", h0, h1, v0, v1, b0, b1, b2, b3, b4, winRate);

  if (fabs(winRate-expected) > error) return 1;

  return 0;
}


int main() {
  assert(test(0, 4, 36, 32, 255, 255, 255, 255, 255, 0, 63, 2) == 0); // AsKs vs 5s6s should be about 63% preflop
  assert(test(0, 4, 36, 32, 255, 255, 255, 255, 255, 0, 73, 2) == 1); // AsKs vs 5s6s should be about 63% preflop
  assert(test(0, 4, 36, 32, 37, 1, 22, 255, 255, 3, 80, 1) == 0); // flop is 5h Ah 9d, AKs should be about 80%
  assert(test(0, 4, 36, 32, 37, 1, 22, 39, 255, 4, 4, 1) == 0); // flop is 5h Ah 9d, 5c AKs should be about 95%

  return 0;
}