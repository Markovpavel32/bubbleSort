import createData from './createData';
import Render from './render';
import Sorter from './sorter';


const input = document.getElementById('input');
const btnR = document.getElementById('triangle_right');
const btnL = document.getElementById('triangle_left');

let bubbleSort;

function init() {
  const model = createData(input.value);
  bubbleSort = new Sorter(model);
  Render.render(model);
}
input.oninput = init;

function handleForward() {
  const data = bubbleSort.forward();
  Render.sort(data);
}

function handleBackward() {
  const data = bubbleSort.backward();
  Render.sort(data);
}
btnR.onclick = handleForward;
btnL.onclick = handleBackward;


function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode);
  }

  if (event.which !== 0 && event.charCode !== 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

function onlyNumbers(e) {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const chr = getChar(e);
  if (chr < '0' || chr > '9') {
    return false;
  }
}

input.onkeypress = onlyNumbers;
