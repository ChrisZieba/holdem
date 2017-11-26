let t0, t1;

// Takes an integer (card) and returns the human readable value with suit symbols
const prettyHand = (hand, color = false) => {
  const sym = (id) => {
    let suit;
    switch (id) {
      case 's': suit = '♠';
        break;
      case 'h': suit = '♥';
        break;
      case 'd': suit = '♦';
        break;
      case 'c': suit = '♣';
        break;
      default: suit = '';
        break;
    }

    if (color && ['d','h'].includes(id)) suit = `<span class="red">${suit}</span>`;

    return suit;
  };

  let h = `${hand[0]}${sym(hand[1], color)}${hand[2]}${sym(hand[3], color)}`;
  return h;
};

// Given an integer between 0-51, return the human readable card or 255 otherwise
const convertHand = (id) => {
  let card;

  switch (id) {
    case 0: card = 'As';
      break;
    case 1: card = 'Ah';
      break;
    case 2: card = 'Ad';
      break;
    case 3: card = 'Ac';
      break;
    case 4: card = 'Ks';
      break;
    case 5: card = 'Kh';
      break;
    case 6: card = 'Kd';
      break;
    case 7:  card = 'Kc';
      break;
    case 8: card = 'Qs';
      break;
    case 9: card = 'Qh';
      break;
    case 10: card = 'Qd';
      break;
    case 11: card = 'Qc';
      break;
    case 12: card = 'Js';
      break;
    case 13: card = 'Jh';
      break;
    case 14: card = 'Jd';
      break;
    case 15: card = 'Jc';
      break;
    case 16: card = 'Ts';
      break;
    case 17: card = 'Th';
      break;
    case 18: card = 'Td';
      break;
    case 19: card = 'Tc';
      break;
    case 20: card = '9s';
      break;
    case 21: card = '9h';
      break;
    case 22: card = '9d';
      break;
    case 23: card = '9c';
      break;
    case 24: card = '8s';
      break;
    case 25: card = '8h';
      break;
    case 26: card = '8d';
      break;
    case 27: card = '8c';
      break;
    case 28: card = '7s';
      break;
    case 29: card = '7h';
      break;
    case 30: card = '7d';
      break;
    case 31: card = '7c';
      break;
    case 32: card = '6s';
      break;
    case 33: card = '6h';
      break;
    case 34: card = '6d';
      break;
    case 35: card = '6c';
      break;
    case 36: card = '5s';
      break;
    case 37: card = '5h';
      break;
    case 38: card = '5d';
      break;
    case 39: card = '5c';
      break;
    case 40: card = '4s';
      break;
    case 41: card = '4h';
      break;
    case 42: card = '4d';
      break;
    case 43: card = '4c';
      break;
    case 44: card = '3s';
      break;
    case 45: card = '3h';
      break;
    case 46: card = '3d';
      break;
    case 47: card = '3c';
      break;
    case 48: card = '2s';
      break;
    case 49: card = '2h';
      break;
    case 50: card = '2d';
      break;
    case 51: card = '2c';
      break;
    default: card = '255';
      break;
  }

  return card;
};

// Pre computed list of range combos
const COMBOS=[[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],[[0,4],[1,5],[2,6],[3,7]],[[0,8],[1,8],[10,2],[11,3]],[[0,12],[1,13],[14,2],[15,3]],[[0,16],[1,17],[18,2],[19,3]],[[0,20],[1,21],[2,22],[23,3]],[[0,24],[1,25],[2,26],[27,3]],[[0,28],[1,29],[2,30],[3,31]],[[0,32],[1,33],[2,34],[3,35]],[[0,36],[1,37],[2,38],[3,39]],[[0,40],[1,41],[2,42],[3,43]],[[0,44],[1,45],[2,46],[3,47]],[[0,48],[1,49],[2,50],[3,51]],[[0,5],[0,6],[0,7],[1,4],[1,6],[1,7],[2,4],[2,5],[2,7],[3,4],[3,5],[3,6]],[[4,5],[4,6],[4,7],[5,6],[5,7],[6,7]],[[4,8],[5,8],[10,6],[11,7]],[[12,4],[13,5],[14,6],[15,7]],[[16,4],[17,5],[18,6],[19,7]],[[20,4],[21,5],[22,6],[23,7]],[[24,4],[25,5],[26,6],[27,7]],[[28,4],[29,5],[30,6],[31,7]],[[32,4],[33,5],[34,6],[35,7]],[[36,4],[37,5],[38,6],[39,7]],[[4,40],[41,5],[42,6],[43,7]],[[4,44],[45,5],[46,6],[47,7]],[[4,48],[49,5],[50,6],[51,7]],[[0,9],[0,10],[0,11],[1,9],[1,10],[1,11],[2,8],[2,9],[11,2],[3,8],[3,9],[10,3]],[[4,9],[10,4],[11,4],[5,9],[10,5],[11,5],[6,8],[6,9],[11,6],[7,8],[7,9],[10,7]],[[8,9],[8,10],[8,11],[9,10],[9,11],[10,11]],[[12,8],[13,8],[10,14],[11,15]],[[16,8],[17,8],[10,18],[11,19]],[[20,8],[21,8],[10,22],[11,23]],[[24,8],[25,8],[10,26],[11,27]],[[28,8],[29,8],[10,30],[11,31]],[[32,8],[33,8],[10,34],[11,35]],[[36,8],[37,8],[10,38],[11,39]],[[40,8],[41,8],[10,42],[11,43]],[[44,8],[45,8],[10,46],[11,47]],[[48,8],[49,8],[10,50],[11,51]],[[0,13],[0,14],[0,15],[1,12],[1,14],[1,15],[12,2],[13,2],[15,2],[12,3],[13,3],[14,3]],[[13,4],[14,4],[15,4],[12,5],[14,5],[15,5],[12,6],[13,6],[15,6],[12,7],[13,7],[14,7]],[[14,8],[15,8],[12,9],[13,9],[14,9],[15,9],[10,12],[10,13],[10,15],[11,12],[11,13],[11,14]],[[12,13],[12,14],[12,15],[13,14],[13,15],[14,15]],[[12,16],[13,17],[14,18],[15,19]],[[12,20],[13,21],[14,22],[15,23]],[[12,24],[13,25],[14,26],[15,27]],[[12,28],[13,29],[14,30],[15,31]],[[12,32],[13,33],[14,34],[15,35]],[[12,36],[13,37],[14,38],[15,39]],[[12,40],[13,41],[14,42],[15,43]],[[12,44],[13,45],[14,46],[15,47]],[[12,48],[13,49],[14,50],[15,51]],[[0,17],[0,18],[0,19],[1,16],[1,18],[1,19],[16,2],[17,2],[19,2],[16,3],[17,3],[18,3]],[[17,4],[18,4],[19,4],[16,5],[18,5],[19,5],[16,6],[17,6],[19,6],[16,7],[17,7],[18,7]],[[18,8],[19,8],[16,9],[17,9],[18,9],[19,9],[10,16],[10,17],[10,19],[11,16],[11,17],[11,18]],[[12,17],[12,18],[12,19],[13,16],[13,18],[13,19],[14,16],[14,17],[14,19],[15,16],[15,17],[15,18]],[[16,17],[16,18],[16,19],[17,18],[17,19],[18,19]],[[17,21],[18,22],[19,23]],[[16,24],[17,25],[18,26],[19,27]],[[16,28],[17,29],[18,30],[19,31]],[[16,32],[17,33],[18,34],[19,35]],[[16,36],[17,37],[18,38],[19,39]],[[16,40],[17,41],[18,42],[19,43]],[[16,44],[17,45],[18,46],[19,47]],[[16,48],[17,49],[18,50],[19,51]],[[0,21],[0,22],[0,23],[1,20],[1,22],[1,23],[2,20],[2,21],[2,23],[20,3],[21,3],[22,3]],[[21,4],[22,4],[23,4],[20,5],[22,5],[23,5],[20,6],[21,6],[23,6],[20,7],[21,7],[22,7]],[[22,8],[23,8],[20,9],[21,9],[22,9],[23,9],[10,20],[10,21],[10,23],[11,20],[11,21],[11,22]],[[12,21],[12,22],[12,23],[13,20],[13,22],[13,23],[14,20],[14,21],[14,23],[15,20],[15,21],[15,22]],[[16,21],[16,22],[16,23],[17,20],[17,22],[17,23],[18,20],[18,21],[18,23],[19,20],[19,21],[19,22]],[[20,21],[20,22],[20,23],[21,22],[21,23],[22,23]],[[20,24],[21,25],[22,26],[23,27]],[[20,28],[21,29],[22,30],[23,31]],[[20,32],[21,33],[22,34],[23,35]],[[20,36],[21,37],[22,38],[23,39]],[[20,40],[21,41],[22,42],[23,43]],[[20,44],[21,45],[22,46],[23,47]],[[20,48],[21,49],[22,50],[23,51]],[[0,25],[0,26],[0,27],[1,24],[1,26],[1,27],[2,24],[2,25],[2,27],[24,3],[25,3],[26,3]],[[25,4],[26,4],[27,4],[24,5],[26,5],[27,5],[24,6],[25,6],[27,6],[24,7],[25,7],[26,7]],[[26,8],[27,8],[24,9],[25,9],[26,9],[27,9],[10,24],[10,25],[10,27],[11,24],[11,25],[11,26]],[[12,25],[12,26],[12,27],[13,24],[13,26],[13,27],[14,24],[14,25],[14,27],[15,24],[15,25],[15,26]],[[16,25],[16,26],[16,27],[17,24],[17,26],[17,27],[18,24],[18,25],[18,27],[19,24],[19,25],[19,26]],[[20,25],[20,26],[20,27],[21,24],[21,26],[21,27],[22,24],[22,25],[22,27],[23,24],[23,25],[23,26]],[[24,25],[24,26],[24,27],[25,26],[25,27],[26,27]],[[24,28],[25,29],[26,30],[27,31]],[[24,32],[25,33],[26,34],[27,35]],[[24,36],[25,37],[26,38],[27,39]],[[24,40],[25,41],[26,42],[27,43]],[[24,44],[25,45],[26,46],[27,47]],[[24,48],[25,49],[26,50],[27,51]],[[0,29],[0,30],[0,31],[1,28],[1,30],[1,31],[2,28],[2,29],[2,31],[28,3],[29,3],[3,30]],[[29,4],[30,4],[31,4],[28,5],[30,5],[31,5],[28,6],[29,6],[31,6],[28,7],[29,7],[30,7]],[[30,8],[31,8],[28,9],[29,9],[30,9],[31,9],[10,28],[10,29],[10,31],[11,28],[11,29],[11,30]],[[12,29],[12,30],[12,31],[13,28],[13,30],[13,31],[14,28],[14,29],[14,31],[15,28],[15,29],[15,30]],[[16,29],[16,30],[16,31],[17,28],[17,30],[17,31],[18,28],[18,29],[18,31],[19,28],[19,29],[19,30]],[[20,29],[20,30],[20,31],[21,28],[21,30],[21,31],[22,28],[22,29],[22,31],[23,28],[23,29],[23,30]],[[24,29],[24,30],[24,31],[25,28],[25,30],[25,31],[26,28],[26,29],[26,31],[27,28],[27,29],[27,30]],[[28,29],[28,30],[28,31],[29,30],[29,31],[30,31]],[[28,32],[29,33],[30,34],[31,35]],[[28,36],[29,37],[30,38],[31,39]],[[28,40],[29,41],[30,42],[31,43]],[[28,44],[29,45],[30,46],[31,47]],[[28,48],[29,49],[30,50],[31,51]],[[0,33],[0,34],[0,35],[1,32],[1,34],[1,35],[2,32],[2,33],[2,35],[3,32],[3,33],[3,34]],[[33,4],[34,4],[35,4],[32,5],[34,5],[35,5],[32,6],[33,6],[35,6],[32,7],[33,7],[34,7]],[[34,8],[35,8],[32,9],[33,9],[34,9],[35,9],[10,32],[10,33],[10,35],[11,32],[11,33],[11,34]],[[12,33],[12,34],[12,35],[13,32],[13,34],[13,35],[14,32],[14,33],[14,35],[15,32],[15,33],[15,34]],[[16,33],[16,34],[16,35],[17,32],[17,34],[17,35],[18,32],[18,33],[18,35],[19,32],[19,33],[19,34]],[[20,33],[20,34],[20,35],[21,32],[21,34],[21,35],[22,32],[22,33],[22,35],[23,32],[23,33],[23,34]],[[24,33],[24,34],[24,35],[25,32],[25,34],[25,35],[26,32],[26,33],[26,35],[27,32],[27,33],[27,34]],[[28,33],[28,34],[28,35],[29,32],[29,34],[29,35],[30,32],[30,33],[30,35],[31,32],[31,33],[31,34]],[[32,33],[32,34],[32,35],[33,34],[33,35],[34,35]],[[32,36],[33,37],[34,38],[35,39]],[[32,40],[33,41],[34,42],[35,43]],[[32,44],[33,45],[34,46],[35,47]],[[32,48],[33,49],[34,50],[35,51]],[[0,37],[0,38],[0,39],[1,36],[1,38],[1,39],[2,36],[2,37],[2,39],[3,36],[3,37],[3,38]],[[37,4],[38,4],[39,4],[36,5],[38,5],[39,5],[36,6],[37,6],[39,6],[36,7],[37,7],[38,7]],[[38,8],[39,8],[36,9],[37,9],[38,9],[39,9],[10,36],[10,37],[10,39],[11,36],[11,37],[11,38]],[[12,37],[12,38],[12,39],[13,36],[13,38],[13,39],[14,36],[14,37],[14,39],[15,36],[15,37],[15,38]],[[16,37],[16,38],[16,39],[17,36],[17,38],[17,39],[18,36],[18,37],[18,39],[19,36],[19,37],[19,38]],[[20,37],[20,38],[20,39],[21,36],[21,38],[21,39],[22,36],[22,37],[22,39],[23,36],[23,37],[23,38]],[[24,37],[24,38],[24,39],[25,36],[25,38],[25,39],[26,36],[26,37],[26,39],[27,36],[27,37],[27,38]],[[28,37],[28,38],[28,39],[29,36],[29,38],[29,39],[30,36],[30,37],[30,39],[31,36],[31,37],[31,38]],[[32,37],[32,38],[32,39],[33,36],[33,38],[33,39],[34,36],[34,37],[34,39],[35,36],[35,37],[35,38]],[[36,37],[36,38],[36,39],[37,38],[37,39],[38,39]],[[36,40],[37,41],[38,42],[39,43]],[[36,44],[37,45],[38,46],[39,47]],[[36,48],[37,49],[38,50],[39,51]],[[0,41],[0,42],[0,43],[1,40],[1,42],[1,43],[2,40],[2,41],[2,43],[3,40],[3,41],[3,42]],[[4,41],[4,42],[4,43],[40,5],[42,5],[43,5],[40,6],[41,6],[43,6],[40,7],[41,7],[42,7]],[[42,8],[43,8],[40,9],[41,9],[42,9],[43,9],[10,40],[10,41],[10,43],[11,40],[11,41],[11,42]],[[12,41],[12,42],[12,43],[13,40],[13,42],[13,43],[14,40],[14,41],[14,43],[15,40],[15,41],[15,42]],[[16,41],[16,42],[16,43],[17,40],[17,42],[17,43],[18,40],[18,41],[18,43],[19,40],[19,41],[19,42]],[[20,41],[20,42],[20,43],[21,40],[21,42],[21,43],[22,40],[22,41],[22,43],[23,40],[23,41],[23,42]],[[24,41],[24,42],[24,43],[25,40],[25,42],[25,43],[26,40],[26,41],[26,43],[27,40],[27,41],[27,42]],[[28,41],[28,42],[28,43],[29,40],[29,42],[29,43],[30,40],[30,41],[30,43],[31,40],[31,41],[31,42]],[[32,41],[32,42],[32,43],[33,40],[33,42],[33,43],[34,40],[34,41],[34,43],[35,40],[35,41],[35,42]],[[36,41],[36,42],[36,43],[37,40],[37,42],[37,43],[38,40],[38,41],[38,43],[39,40],[39,41],[39,42]],[[40,41],[40,42],[40,43],[41,42],[41,43],[42,43]],[[40,44],[41,45],[42,46],[43,47]],[[40,48],[41,49],[42,50],[43,51]],[[0,45],[0,46],[0,47],[1,44],[1,46],[1,47],[2,44],[2,45],[2,47],[3,44],[3,45],[3,46]],[[4,45],[4,46],[4,47],[44,5],[46,5],[47,5],[44,6],[45,6],[47,6],[44,7],[45,7],[46,7]],[[46,8],[47,8],[44,9],[45,9],[46,9],[47,9],[10,44],[10,45],[10,47],[11,44],[11,45],[11,46]],[[12,45],[12,46],[12,47],[13,44],[13,46],[13,47],[14,44],[14,45],[14,47],[15,44],[15,45],[15,46]],[[16,45],[16,46],[16,47],[17,44],[17,46],[17,47],[18,44],[18,45],[18,47],[19,44],[19,45],[19,46]],[[20,45],[20,46],[20,47],[21,44],[21,46],[21,47],[22,44],[22,45],[22,47],[23,44],[23,45],[23,46]],[[24,45],[24,46],[24,47],[25,44],[25,46],[25,47],[26,44],[26,45],[26,47],[27,44],[27,45],[27,46]],[[28,45],[28,46],[28,47],[29,44],[29,46],[29,47],[30,44],[30,45],[30,47],[31,44],[31,45],[31,46]],[[32,45],[32,46],[32,47],[33,44],[33,46],[33,47],[34,44],[34,45],[34,47],[35,44],[35,45],[35,46]],[[36,45],[36,46],[36,47],[37,44],[37,46],[37,47],[38,44],[38,45],[38,47],[39,44],[39,45],[39,46]],[[40,45],[40,46],[40,47],[41,44],[41,46],[41,47],[42,44],[42,45],[42,47],[43,44],[43,45],[43,46]],[[44,45],[44,46],[44,47],[45,46],[45,47],[46,47]],[[44,48],[45,49],[46,50],[47,51]],[[0,49],[0,50],[0,51],[1,48],[1,50],[1,51],[2,48],[2,49],[2,51],[3,48],[3,49],[3,50]],[[4,49],[4,50],[4,51],[48,5],[5,50],[5,51],[48,6],[49,6],[51,6],[48,7],[49,7],[50,7]],[[50,8],[51,8],[48,9],[49,9],[50,9],[51,9],[10,48],[10,49],[10,51],[11,48],[11,49],[11,50]],[[12,49],[12,50],[12,51],[13,48],[13,50],[13,51],[14,48],[14,49],[14,51],[15,48],[15,49],[15,50]],[[16,49],[16,50],[16,51],[17,48],[17,50],[17,51],[18,48],[18,49],[18,51],[19,48],[19,49],[19,50]],[[20,49],[20,50],[20,51],[21,48],[21,50],[21,51],[22,48],[22,49],[22,51],[23,48],[23,49],[23,50]],[[24,49],[24,50],[24,51],[25,48],[25,50],[25,51],[26,48],[26,49],[26,51],[27,48],[27,49],[27,50]],[[28,49],[28,50],[28,51],[29,48],[29,50],[29,51],[30,48],[30,49],[30,51],[31,48],[31,49],[31,50]],[[32,49],[32,50],[32,51],[33,48],[33,50],[33,51],[34,48],[34,49],[34,51],[35,48],[35,49],[35,50]],[[36,49],[36,50],[36,51],[37,48],[37,50],[37,51],[38,48],[38,49],[38,51],[39,48],[39,49],[39,50]],[[40,49],[40,50],[40,51],[41,48],[41,50],[41,51],[42,48],[42,49],[42,51],[43,48],[43,49],[43,50]],[[44,49],[44,50],[44,51],[45,48],[45,50],[45,51],[46,48],[46,49],[46,51],[47,48],[47,49],[47,50]],[[48,49],[48,50],[48,51],[49,50],[49,51],[50,51]]];

// The ranges to select for each tier (1-5)
const TIERS = [[0,1,14,28,42], [2,3,13,15,56], [4,16,26,29,43,70], [17,27,30,39,44,57,71,84], [5,6,7,8,9,10,11,12,31,40,41,55,58,72,85,98,99]];

const MAX_WORKERS = Math.min(navigator.hardwareConcurrency || 4, 8);
const WORKERS = [];

// Load up the workers
for (let i = 0; i < MAX_WORKERS; i+=1) WORKERS.push(new Worker("worker.js"));

document.addEventListener("DOMContentLoaded", () => {
  // Enable the simulate button
  const btn = document.getElementById("simulate");
  btn.removeAttribute("disabled");
  btn.disabled = false;

  // The selected community cards, initially the hero cards are set to A2 of spades
  const selectedCards = [0,48,8,28,35,255,255];

  // The range is a set of integers from 0-168 (each square in the table)
  const villianRange = new Uint8Array(169);

  // Update the dropdown selects
  const updateOptions = (name, value, prev, same = false) => {
    const selector = document.querySelector(`select[data-value="${name}"]`);
    if (!selector || !selector.options) return;

    // All this loop does is reset the disabled and selected attributes so there are no duplicates
    for (let i = 0; i < selector.options.length; i+=1) {
      const currValue = +selector.options[i].value;

      if (same) {
        if (currValue === value) {
          selector.options[i].setAttribute("selected", true);
          selector.options[i].selected = true;
        } else if (currValue === prev) {
          selector.options[i].removeAttribute("selected");
          selector.options[i].selected = false;
        }
      } else {
        if (currValue === value) {
          if (value !== 255) {
            selector.options[i].setAttribute("disabled", true);
            selector.options[i].disabled = true;
          }
        } else if (currValue === prev) {
          selector.options[i].removeAttribute("disabled");
          selector.options[i].disabled = false;
        }
      }
    }

    // Update the color
    if (same) selector.className = selector.options[selector.selectedIndex].className;
  };

  const getTierValues = (tier) => TIERS[tier-1];

  const getTierValue = (input) => {
    for (let i = 0; i < TIERS.length; i+=1) {
      if (TIERS[i].includes(input)) return i+1;
    }

    return null;
  };

  // Handles UI update when tier checkbox is selected
  const updateTier = (target) => {
    const checked = !!target.checked;
    const index = +target.getAttribute('data-value');

    const vals = getTierValues(index);

    // Build a string for the query selector so we can get them all at once
    let elemStr = '';

    // Toggle each of the values in the tier
    vals.forEach((v, index) => {
      villianRange[v] = checked ? 1 : 0;
      elemStr += `#villian-range [data-value="${v}"]`;
      if (index !== vals.length-1) elemStr += ',';
    });

    // Get all the cells from the range so we can toggle the color
    const elems = document.querySelectorAll(elemStr);
    elems.forEach((elem) => {
      if (checked) {
        if (!elem.classList.contains('active')) elem.classList.add('active');
      } else {
        if (elem.classList.contains('active')) elem.classList.remove('active');
      }
    });
  };

  // Event handler for select and checkbox changes
  document.body.addEventListener("change", (event = {}) => {
    if (!event.target) return;

    if (event.target.nodeName === 'SELECT') {
      const index = +event.target.getAttribute('data-value');

      // The data-value of the selectors are the index of the selectedCards array
      if (selectedCards[index] === undefined) return;
      let value = +event.target.value;
      const prev = selectedCards[index];
      selectedCards[index] = value;

      selectedCards.forEach((e, i) => {
        if (index === i) updateOptions(i, value, prev, true);
        else updateOptions(i, value, prev);
      });
    } else if (event.target.nodeName === 'INPUT') {
      updateTier(event.target);
    }
  });

  // Event handler for the range table (when cell is clicked)
  document.getElementById("villian-range").addEventListener("click", (event = {}) => {
    if (!event.target || !event.target.getAttribute('data-value')) return;
    const value = +event.target.getAttribute('data-value');

    // Toggle the cell
    villianRange[value] = !villianRange[value];

    // Toggle the color
    if (event.target.classList.contains('active'))  event.target.classList.remove('active');
    else event.target.classList.add('active');

    // If turning on a cell, nothing left to do, otherwise check to see if the tier checks need to be toggled
    if (villianRange[value]) return;

    // If any of the tiers are selected, check to see if it needs to be unchecked
    const input = document.querySelector(`input[data-value="${getTierValue(value)}"]:checked`);
    if (!input) return;
    input.checked = false;
  });

  // Event handler for the simulate button
  document.getElementById("simulate").addEventListener("click", (event = {}) => {
    t0 = performance.now();

    if (selectedCards[0] === undefined || selectedCards[1] === undefined) return alert('The player hole cards must be set.')

    // Validate the community cards
    if ((selectedCards[2] !== 255 && (selectedCards[3] === 255 || selectedCards[4] === 255)) || 
      (selectedCards[3] !== 255 && (selectedCards[2] === 255 || selectedCards[4] === 255)) || 
      (selectedCards[4] !== 255 && (selectedCards[2] === 255 || selectedCards[3] === 255))) {
      return alert('The flop must contain three cards.');
    }

    if (selectedCards[5] !== 255 && (selectedCards[4] === 255 || selectedCards[3] === 255 || selectedCards[2] === 255))return alert('The flop must be set if the turn is.');
    if (selectedCards[6] !== 255 && selectedCards[5] === 255) return alert('The turn and flop must be set if the river is. Note that no simulations will be run when the board has played out already.');

    const hero = new Uint8Array([selectedCards[0], selectedCards[1]]);
    const board = Uint8Array.from(selectedCards.slice(2));
    const boardSize = board.reduce((count, value) =>{
      if (value !== 255) count+=1
      return count;
    }, 0)

    // Take all the 1's from the villian range
    const range = Uint8Array.from(villianRange.reduce((prev, curr, index) => {
      if (curr) prev.push(index);
      return prev;
    }, []));

    if (!range.length) return alert('Select an opponent range to run simulations.');

    document.getElementById("opponent-results").innerHTML = "";
    document.getElementById("hero-results").innerHTML = "";

    // Get the combos
    const handCombos = Uint8Array.from(range.reduce((total, comboIdx) => {
      total.push(...COMBOS[comboIdx]);
      return total;
    }, []).reduce((total, combo) => {
      total.push(...combo);
      return total;
    },[]));

    const comboSimulations = [];

    // When all the workers have returned, update the UI
    let completedCount = 0;

    // Called when all workers have finished
    const fn = function(r) {
      const type = r.data[0];
      if (type !== 'SIM') return;

      const data = r.data[1];

      comboSimulations.push(data);
      
      if (completedCount >= WORKERS.length-1) {
        completedCount = 0;
        updateResults(comboSimulations);
      }

      completedCount+=1;
    };

    // Each worker runs a franction of the simulations and they are joined later
    WORKERS.forEach((worker) => {
      worker.postMessage([hero, handCombos, handCombos.length, board, boardSize]);
      worker.onmessage = fn;
    });

    // Each worker returns an array of all the combos it calculated
    const updateResults = function(comboSubset) {
      const hands = {};

      comboSubset.forEach((worker) => {
        worker.forEach((combo) => {
          // Get the card hash
          let cards = [combo[4], combo[5]].sort((a,b) => a - b);
          cards = `${convertHand(cards[0])}${convertHand(cards[1])}`;
          if (!hands[cards]) {
            hands[cards] = { w:0, l:0, t:0, s:0 };
          }

          hands[cards].s += combo[0];
          hands[cards].w += combo[1];
          hands[cards].t += combo[2];
          hands[cards].l += combo[3];
        });
      });

      let totalSimulations = 0;
      let totalWins = 0;
      let totalLosses = 0;
      let totalTies = 0;

      const opponentResults = document.getElementById('opponent-results');
      const heroResults = document.getElementById('hero-results');
      opponentResults.innerHTML = "";
      heroResults.innerHTML = "";

      let opponentOutput = `
        <table class="opponent-results-table">
          <thead>
            <tr>
              <th></th>
              <th>Win</th>
              <th>Lose</th>
              <th>Tie</th>
              <th>Simulations</th>
            </tr>
          </thead>
          <tbody>`;

      Object.entries(hands).sort((a, b) => b[1].l/b[1].s - a[1].l/a[1].s).forEach(hand => {
        totalSimulations += hand[1].s;
        totalWins += hand[1].w;
        totalLosses += hand[1].l;
        totalTies += hand[1].t;

        opponentOutput += `
          <tr>
            <td>${prettyHand(hand[0], true)}</span></td>
            <td>${((hand[1].l/hand[1].s)*100).toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3})}%</td>
            <td>${((hand[1].w/hand[1].s)*100).toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3})}%</td>
            <td>${((hand[1].t/hand[1].s)*100).toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3})}%</td>
            <td>${((hand[1].s)*2).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
          </tr>`;
      });

      opponentOutput += '</tbody></table>'
      opponentResults.innerHTML = opponentOutput;
      t1 = performance.now();

      let heroOutput = `
        <div class="perf">Processed <span class="badge">${(totalSimulations*2).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span> simulations in <span class="badge">${(t1-t0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ms</span> using <span class="badge">${WORKERS.length}</span> worker(s)</div>
        <div class="totals">
          <span class="label">Total Win:</span> <span class="badge">${((totalWins/totalSimulations)*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%</span>
          <span class="label">Lose:</span> <span class="badge">${((totalLosses/totalSimulations)*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%</span>
          <span class="label">Tie:</span> <span class="badge">${((totalTies/totalSimulations)*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%</span>
        </div>
      `;
      heroResults.innerHTML = heroOutput;
    };
  });

  // Handle the clear button
  document.getElementById("clear-range").addEventListener("click", (event = {}) => {
    villianRange.fill(0);
    const cells = document.querySelectorAll('td[data-value]');
    cells.forEach((cell) => {
      cell.classList.remove('active');
    });
    document.getElementById('opponent-results').innerHTML = "";
    document.getElementById('hero-results').innerHTML = "";

    // Clear all the check marks
    const inputs = document.querySelectorAll('input[data-value]');
    inputs.forEach((input) => {
      input.checked = false;
    });
  });
}, false);