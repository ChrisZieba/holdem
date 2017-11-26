/**
  holdem

  Copyright (c) 2017 Chris Zieba http://chriszieba.com

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

#include <iostream>

#include "emscripten.h"
#include "sim.h"
#include "util.h"

extern "C" {
  // This is the functon that's exported for use in javaScript.
  // When compiling WASM we use the option `-s EXPORTED_FUNCTIONS="['_run']"`, notice the underscore before `run`
  int run(uint8_t *heroCards, uint8_t *villianRange, int villianRangeCount, uint8_t *board, int boardSize, int simCount) {
    int totalWin = 0, totalLoss = 0, totalTie = 0, totalSimulations = 0;

    // If the UI selected AKs, that means we pass {0,1,0,2,0,3,1,2,1,3,2,3} and each two indexes
    // are a hand combination. 0,1 means ace king of spaces, etc.
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

      // Pass back the info for this specific hand combination so we can show it in the UI
      EM_ASM({
        Module.cc([$0, $1, $2, $3, $4, $5, $6]);
      }, 0, comboSimulations, comboWin, comboTie, comboLoss, villianRange[i], villianRange[i+1]);

    }

    // This calls the JavaScript worker which in turn calls postMessage with the data back to the main thread
    EM_ASM({
      Module.cc([$0 ,$1, $2, $3, $4]);
    }, 1, totalSimulations, totalWin, totalTie, totalLoss);

    return 0;
  }
}