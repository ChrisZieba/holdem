#include <iostream>

#include "../src/sim.h"
#include "../src/eval/SevenEval.h"

int test(uint8_t h0, uint8_t h1, uint8_t v0, uint8_t v1, uint8_t b0, uint8_t b1, uint8_t b2, uint8_t b3, uint8_t b4, int boardSize) {
  int totalWin = 0, totalLoss = 0, totalTie = 0, totalSimulations = 0;
  // AsKs vs 5s6s shoud be about 63/37 preflop
  for (int i = 0; i < 100000; i+=1) {
    int out = sim(h0, h1, v0, v1, b0, b1, b2, b3, b4, boardSize);

    if (out > 0) totalWin+=1;
    else if (out < 0) totalLoss+=1;
    else totalTie+=1;

    totalSimulations+=1;
  }

  printf("hero:[%d %d] vilian:[%d %d] board:[%d %d %d %d %d] wins:%d, sims:%d\n",h0, h1, v0, v1, b0, b1, b2, b3, b4, totalWin, totalSimulations);

  return totalWin;
}


int main() {
  test(0, 4, 36, 32, 255, 255, 255, 255, 255, 0); // AsKs vs 5s6s should be about 63% preflop
  test(0, 4, 36, 32, 37, 1, 22, 255, 255, 3); // flop is 5h Ah 9d, AKs should be about 80%
  test(0, 4, 36, 32, 37, 1, 22, 39, 255, 4); // flop is 5h Ah 9d, 5c AKs should be about 95%

  return 0;
}
/*
0 = As
1 = Ah
2 = Ad
3 = Ac
4 = Ks
5 = Kh
6 = Kd
7 = Kc
8 Qs
9 Qh
10 Qd
11 Qc
12 Js
13 Jh
14 Jd
15 Jc
16 10s 
17 10h
18 10d
19 10c
20 9s
21 9h
22 9d
23 9c
24 8s
25 8h
26 8d
27 8c
28 7s
29 7h
30 7d
31 7c
32 6s
33 6h
34 6d
35 6c
36 5s
37 5h
38 5d
39 5c
40 4s
41 4h
42 4d
43 4c
44 3s
45 3h
46 3d
47 3c
48 2s
49 2h
50 2d
51 2c
*/