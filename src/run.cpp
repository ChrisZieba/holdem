#include <iostream>

#include "emscripten.h"
#include "sim.h"
#include "util.h"

extern "C" {

  int run(uint8_t *heroCards, uint8_t *villianRange, int villianRangeCount, uint8_t *board, int boardSize, int simCount) {
    int totalWin = 0, totalLoss = 0, totalTie = 0, totalSimulations = 0;

    for (int i = 0; i < villianRangeCount; i+=2) {
      int comboWin = 0, comboLoss = 0, comboTie = 0, comboSimulations = 0;

      // Only simulate combos that do not include any of the community cards and/or the hero cards
      if (contains(heroCards, villianRange[i], 2) || contains(heroCards, villianRange[i+1], 2) || contains(board, villianRange[i], boardSize) || contains(board, villianRange[i+1], boardSize)) continue;

      for (int k = 0; k < simCount; k+=1) {
        int out = sim(heroCards[0], heroCards[1], villianRange[i], villianRange[i+1], board[0], board[1], board[2], board[3], board[4], boardSize);
        totalSimulations+=1;
        comboSimulations+=1;

        if (out > 0) {
          totalWin+=1;
          comboWin+=1;
        } else if (out < 0) {
          totalLoss+=1;
          comboLoss+=1;
        } else {
          totalTie+=1;
          comboTie+=1;
        }
      }

      EM_ASM({
        Module.cc([$0,$1,$2,$3,$4,$5,$6]);
      }, 0, comboSimulations, comboWin, comboTie, comboLoss, villianRange[i], villianRange[i+1]);

    }

    EM_ASM({
      Module.cc([$0 ,$1,$2,$3,$4]);
    }, 1, totalSimulations, totalWin, totalTie, totalLoss);

    return 0;
  }
}