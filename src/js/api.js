/* eslint-disable no-use-before-define */
import createData from './createData';
import Render from './render';
import Sorter from './sorter';
import EventBus from './pub-sub';

class SorterCard {
  constructor(color) {
    EventBus.subscribe('sort', this.justWork.bind(this));
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
    this.deleted = false;
    this.loading();
  }

  justWork(info) {
    if (info.status === 'OK' && info.obj === this) {
      this.render();
      this.input.value = info.data;
      const data = createData(info.data);
      this.bubbleSort = new Sorter(data, this.mainCard, this.color);
      Render.render(this.bubbleSort.model());
      this.api();
    } else if (this === info.obj) {
      this.error();
      setTimeout(this.reconnection.bind(this), this.duration);
    }
  }

  reconnection() {
    if (!this.deleted) {
      this.loading();
      EventBus.publish('reconnect', this);
    }
  }

  api() {
    function handleForward() {
      const data = this.bubbleSort.forward();
      Render.sort(data);
      EventBus.publish('add', {
        obj: this,
        steps: data.steps,
        color: this.color,
      });
    }

    function handleBackward() {
      const data = this.bubbleSort.backward();
      Render.sort(data);

      EventBus.publish('add', {
        obj: this,
        steps: data.steps,
        color: this.color,
      });
    }


    this.btnR.onclick = handleForward.bind(this);
    this.btnL.onclick = handleBackward.bind(this);
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
    this.time = 3;
    this.mainCard.style.cssText = `
      height: 100px;\
      width: 200px;\
      `;
    this.mainCard.style.backgroundColor = this.color;
    this.message.textContent = 'Loading...';
    EventBus.publish('add', {
      obj: this,
      color: this.color,
      steps: 0,
    });
  }

  error() {
    this.message.textContent = 'Error...';
    const intervalID = setInterval(timer.bind(this), 1000);
    function timer() {
      this.message.textContent = `Error. Retry in ${this.time}`;
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(intervalID);
      }
    }
  }

  makeDeleteBtn() {
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
    function deleteSorter() {
      this.mainCard.parentNode.removeChild(this.mainCard);
      EventBus.publish('delete', this);
      this.deleted = true;
    }
    this.btnDeleteSorter.onclick = deleteSorter.bind(this);
  }
}

export default SorterCard;
