/* eslint-disable no-use-before-define */
import createData from './createData';
import Render from './render';
import Sorter from './sorter';
import EventBus from './pub-sub';

class SorterCard {
  constructor(color) {
    this.url = 'http://127.0.0.1:1234/array';
    this.mainCard = document.createElement('div');
    this.mainCard.classList.add('main_card');
    this.message = document.createElement('p');
    this.input = document.createElement('input');
    this.mainCard.appendChild(this.message);
    document.body.appendChild(this.mainCard);
    this.btnR = document.createElement('div');
    this.btnL = document.createElement('div');
    this.btnDeleteSorter = document.createElement('div');
    this.makeDeleteBtn();
    this.bubbleSort = '';
    this.color = color;
    this.time = 3;
    this.duration = 4000;
    this.cancel = false;
  }


  connectToServer() {
    if (!this.cancel) {
      this.loading();
      fetch(this.url).then((response) => {
        if (response.status !== 200) {
          this.error();
          return setTimeout(this.connectToServer.bind(this), this.duration);
        }
        this.render();
        return Promise.resolve(response);
      })
        .then(response => response.json()).then((arr) => {
          arr.result.splice(10);
          this.makeSorter(arr.result);
          Render.render(this.bubbleSort.model());
          EventBus.publish('sort', {
            sortObj: this.bubbleSort,
            steps: this.bubbleSort.model().steps,
            action: 'add',
            color: this.color,
          });
          this.api();
        });
    }
  }

  makeSorter(info) {
    this.input.value = info.join('');
    const data = createData(this.input.value);
    this.bubbleSort = new Sorter(data, this.mainCard, this.color);
  }

  api() {
    function handleForward() {
      const data = this.bubbleSort.forward();
      Render.sort(data);
      EventBus.publish('sort', {
        sortObj: this.bubbleSort,
        steps: data.steps,
        action: 'add',
        color: this.color,
      });
    }

    function handleBackward() {
      const data = this.bubbleSort.backward();
      Render.sort(data);

      EventBus.publish('sort', {
        sortObj: this.bubbleSort,
        steps: data.steps,
        action: 'add',
        color: this.color,
      });
    }

    function deleteSorter() {
      this.mainCard.parentNode.removeChild(this.mainCard);
      EventBus.publish('sort', {
        sortObj: this.bubbleSort,
        steps: 0,
        action: 'remove',
        color: this.color,
      });
      this.cancel = true;
    }

    this.btnR.onclick = handleForward.bind(this);
    this.btnL.onclick = handleBackward.bind(this);
    this.btnDeleteSorter.onclick = deleteSorter.bind(this);
  }

  render() {
    this.mainCard.style.cssText = '';
    this.message.textContent = '';

    this.mainCard.appendChild(this.input);
    this.input.setAttribute('type', 'text');

    this.makeDeleteBtn();

    this.mainCard.appendChild(this.btnR);
    this.btnR.classList.add('triangle_right');

    this.mainCard.appendChild(this.btnL);
    this.btnL.classList.add('triangle_left');

    const containerOfBars = document.createElement('div');
    this.mainCard.appendChild(containerOfBars);
  }


  loading() {
    this.mainCard.style.cssText = `
      height: 100px;\
      width: 200px;\
      `;
    this.mainCard.style.backgroundColor = this.color;
    this.message.textContent = 'Loading...';
  }

  error() {
    this.message.textContent = 'Error...';
    const intervalID = setInterval(timer.bind(this), 1000);
    function timer() {
      this.message.textContent = `Error. Retry in ${this.time}`;
      this.time -= 1;
      if (this.time === 0) {
        clearInterval(intervalID);
      }
    }
  }

  makeDeleteBtn() {
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
  }
}

export default SorterCard;
