#include <iostream>

#include "../src/sim.h"
#include "../src/eval/SevenEval.h"

int test(uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1) {
  int totalWin = 0, totalLoss = 0, totalTie = 0, totalSimulations = 0;
  for (int i = 0; i < 100000; i+=1) {
    int out = sim(h0, h1, v0, v1, 6,7,8,255,255,3);

    if (out > 0) totalWin+=1;
    else if (out < 0) totalLoss+=1;
    else totalTie+=1;

    totalSimulations+=1;
  }

  printf("[%d %d] [%d %d] [%d %d %d %d %d] wins:%d, sims:%d\n",h0, h1, v0, v1, b0, b1, b2, b3, b4, totalWin, totalSimulations);

  return totalWin;
}


int main() {
  test(0, 4, 36, 32, 255, 255, 255, 255, 255, 0);

  return 0;
}
