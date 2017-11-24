#include <iostream>
#include <algorithm>
#include <random>
#include "sim.h"
#include "eval/SevenEval.h"


std::random_device rd;

std::mt19937 rng(rd());
std::uniform_int_distribution<int> uni(0, 51);

int sim(uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1, uint8_t b0, uint8_t b1, uint8_t b2, uint8_t b3, uint8_t b4, int boardSize) {

  int dealCount = 5 - boardSize;


  int completeBoard[5] = { b0,b1,b2,b3,b4 };
  int deck[52];

  for (int i = 0; i < 52; i+=1) {
    if (h0 == i || h1 == i || v0 == i || v1 == i || b0 == i || b1 == i || b2 == i || b3 == i || b4 == i) deck[i] = 255;
    else deck[i] = i;
  }


  int cardIdx;


  for (int j = 0; j < dealCount; j+=1) {

    do {
      cardIdx = uni(rng);
    } while (deck[cardIdx] == 255);


    completeBoard[boardSize+j] = deck[cardIdx];

    // Mark the random card as in use
    deck[cardIdx] = 255; 
  }

  // Get a value for each players hand then compare and return the win, loss or tie
  int heroValue = SevenEval::GetRank(completeBoard[0], completeBoard[1], completeBoard[2], completeBoard[3], completeBoard[4], h0, h1);
  int villianValue = SevenEval::GetRank(completeBoard[0], completeBoard[1], completeBoard[2], completeBoard[3], completeBoard[4], v0, v1);

  if (heroValue > villianValue) return 1;
  else if (heroValue < villianValue) return -1;
  else return 0;
}