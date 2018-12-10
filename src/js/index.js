import SorterCard from './api';
import counterPanel from './stepCounterPanel';
import connectionToServer from './connectionToServer';
import EventBus from './pub-sub';

const url = 'http://127.0.0.1:1234/array';
const makeBtn = document.getElementsByClassName('addSorter')[0];

function getRandomColor() {
  const r = function colorRandom() { return Math.floor(Math.random() * 256); };
  return `rgb(${r()},${r()},${r()})`;
}

function addSorter() {
  const color = getRandomColor();
  const sortCard = new SorterCard(color);
  connectionToServer(url)
    .then((result) => {
      result.obj = sortCard;
      return EventBus.publish('sort', result);
    })
    .catch((result) => {
      result.obj = sortCard;
      return EventBus.publish('sort', result);
    });
}


function reconnection(card) {
  connectionToServer(url)
    .then((result) => {
      result.obj = card;
      return EventBus.publish('sort', result);
    })
    .catch((result) => {
      result.obj = card;
      return EventBus.publish('sort', result);
    });
}

EventBus.subscribe('reconnect', reconnection);
makeBtn.onclick = addSorter;
