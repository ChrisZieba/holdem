// holdem

// Copyright (c) 2017 Chris Zieba http://chriszieba.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


#include <iostream>
#include <algorithm>
#include <random>

#include "sim.h"
#include "eval/SevenEval.h"

// Only used once to initialise (seed) engine
std::random_device rd;

// Random-number engine used (Mersenne-Twister in this case) 
std::mt19937 rng(rd());

// Guaranteed unbiased
std::uniform_int_distribution<int> uni(0, 51);

/**
    Returns an int value based on two given hand values.

    @param h0 The hero players first card, must be between 0 and 51 inclusive.
    @param h1 The hero players second card, must be between 0 and 51 inclusive.
    @param v0 The opponent players first card, must be between 0 and 51 inclusive.
    @param v1 The opponent players second card, must be between 0 and 51 inclusive.
    @param b0 The first card of the flop, between 0-51 or 255 for not dealt yet.
    @param b1 The second card of the flop, between 0-51 or 255 for not dealt yet.
    @param b2 The third card of the flop, between 0-51 or 255 for not dealt yet.
    @param b3 The turn card, between 0-51 or 255 for not dealt yet.
    @param b4 The river card, between 0-51 or 255 for not dealt yet.
    @param boardSize The number of community cards dealt so far (can be 3,4,5).
    @return A bool indicating if array contains the value.
*/
int sim(uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1, uint8_t b0, uint8_t b1, uint8_t b2, uint8_t b3, uint8_t b4, int boardSize) {
  // Number of cards left to deal
  int dealCount = 5 - boardSize;
  int completeBoard[5] = { b0,b1,b2,b3,b4 };
  int deck[52];

  for (int i = 0; i < 52; i+=1) {
    // Here we're checking to see if a card can be used
    if (h0 == i || h1 == i || v0 == i || v1 == i || b0 == i || b1 == i || b2 == i || b3 == i || b4 == i) deck[i] = 255;
    else deck[i] = i;
  }

  // Use this as the random index to use when inserting into the deck array
  int cardIdx;

  // Fill the board so it has all 5 cards for showdown evaluation
  for (int j = 0; j < dealCount; j+=1) {
    // This should be fixed to emulate burns, but works for a demo
    // Make sure we don't reuse the card from the deck
    do {
      cardIdx = uni(rng);
    } while (deck[cardIdx] == 255);

    // Deal the random card
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