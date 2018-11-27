/* eslint-disable no-use-before-define */
import createData from './createData';
import Render from './render';
import Sorter from './sorter';
import EventBus from './pub-sub';

class SorterCard {
  constructor(color) {
    this.url = 'http://127.0.0.1:1234/array';
    this.mainCard = document.createElement('div');
    this.input = document.createElement('input');
    this.btnR = document.createElement('div');
    this.btnL = document.createElement('div');
    this.btnDeleteSorter = document.createElement('div');
    this.stepBar = document.createElement('div');
    this.bubbleSort = '';
    this.info = {
      sortObj: this.bubbleSort,
      action: 'add',
    };
    this.color = color;
    this.time = 3;
    this.duration = 4000;
  }

  launch() {
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
    }

    this.btnR.onclick = handleForward.bind(this);
    this.btnL.onclick = handleBackward.bind(this);
    this.btnDeleteSorter.onclick = deleteSorter.bind(this);
  }

  render() {
    this.mainCard.style.cssText = '';
    this.mainCard.textContent = '';

    document.body.appendChild(this.mainCard);
    this.mainCard.classList.add('main_card');
    // input render
    this.mainCard.appendChild(this.input);
    this.input.setAttribute('type', 'text');
    // btnDeleteSorter render
    this.deleteBtn();
    // btnR render
    this.mainCard.appendChild(this.btnR);
    this.btnR.classList.add('triangle_right');
    // btnL render
    this.mainCard.appendChild(this.btnL);
    this.btnL.classList.add('triangle_left');
    // container of bars render
    const containerOfBars = document.createElement('div');
    this.mainCard.appendChild(containerOfBars);
  }

  connectionToServer() {
    this.loading();
    fetch(this.url).then((response) => {
      if (response.status !== 200) {
        this.error();
        return setTimeout(this.connectionToServer.bind(this), this.duration);
      }

      this.render();
      return Promise.resolve(response);
    })
      .then(response => response.json()).then((arr) => {
        arr.result.splice(10);

        this.input.value = arr.result.join('');
        const data = createData(this.input.value);
        this.bubbleSort = new Sorter(data, this.mainCard, this.color);
        Render.render(this.bubbleSort.model());
        EventBus.publish('sort', {
          sortObj: this.bubbleSort,
          steps: 0,
          action: 'add',
          color: this.color,
        });
      });
  }

  loading() {
    this.mainCard.style.cssText = '';
    this.mainCard.textContent = '';
    this.mainCard.style.cssText = `
      height: 100px;\
      width: 200px;\
      `;
    this.mainCard.style.backgroundColor = this.color;
    this.mainCard.textContent = 'Loading...';
    this.deleteBtn();
  }

  error() {
    this.mainCard.style.cssText = '';
    this.mainCard.textContent = '';
    this.mainCard.style.cssText = `
    height: 100px;\
    width: 200px;\
    `;
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.deleteBtn();
    this.mainCard.textContent = 'Error...';
    const intervalID = setInterval(timer.bind(this), 1000);
    function timer() {
      this.mainCard.textContent = '';
      this.mainCard.textContent = `Error. Retry in ${this.time}`;
      this.time -= 1;
      if (this.time === 0) {
        clearInterval(intervalID);
      }
    }
  }

  deleteBtn() {
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
    this.btnDeleteSorter.textContent = 'X';
  }
}

export default SorterCard;
