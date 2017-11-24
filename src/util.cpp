#include <iostream>

bool contains(uint8_t *arr, int val, int size) {
  for (int i = 0; i < size; i++) {
    if (arr[i] == val) return true;
  }

  return false;
}