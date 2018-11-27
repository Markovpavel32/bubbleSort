import SorterCard from './api';
import StepCounterPanel from './stepCounterPanel';

const makeBtn = document.getElementsByClassName('addSorter')[0];
function getRandomColor() {
  const r = function colorRandom() { return Math.floor(Math.random() * 256); };
  return `rgb(${r()},${r()},${r()})`;
}

function addSorter() {
  const input = new SorterCard(getRandomColor());
  const counterPanel = new StepCounterPanel();

  input.render();
  input.connectionToServer();
  input.launch();
}


makeBtn.onclick = addSorter;
