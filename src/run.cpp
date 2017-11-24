#include <iostream>
#include "emscripten.h"
#include "sim.h"
#include "util.h"

extern "C" {

// This is what gets called from JS
int run(uint8_t *heroCards, uint8_t *villianRange, int villianRangeCount, uint8_t *board, int boardSize) {

    int w = 0;

    for (int i = 0; i < villianRangeCount; i+=1) {
      for (int k = 0; k < simCount; k+=1) {
        int out = sim(heroCards[0], heroCards[1], villianRange[i], villianRange[i+1], board[0], board[1], board[2], board[3], board[4], boardSize);

        if (out > 0) w+=1;
      }

    }

    EM_ASM_({
      Module.print($0);
    }, 1, w);

    return 0;
  }

  return 0;
}
}