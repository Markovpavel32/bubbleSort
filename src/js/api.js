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
    this.bubbleSort;
    this.info = {
      sortObj: this.bubbleSort,
      action: 'add',
    };
    this.color = color;
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
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
    this.btnDeleteSorter.textContent = 'X';
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
    /* EventBus.publish('sort', {
          sortObj: 123,
          steps: 'Loading...',
          action: 'add',
          color: this.color,
        }); */
    this.loading();
    fetch(this.url).then((response) => {
      if (response.status !== 200) {
        this.error();
        const duration = 4000;
        let time = 3;
        const intervalID = setInterval(timer.bind(this), 1000);
        function timer() {
          this.mainCard.textContent = '';
          this.mainCard.textContent = `Error. Retry in ${time}`;
          time -= 1;
          if (time === 0) {
            clearInterval(intervalID);
          }
        }

        return setTimeout(this.connectionToServer.bind(this), duration);
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
        /* EventBus.publish('sort', {
        sortObj: 123,
        steps: 'Loading...',
        action: 'remove',
        color: this.color,
      }); */
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
      //background-color: blue\
      `;
    this.mainCard.style.backgroundColor = this.color;
    this.mainCard.textContent = 'Loading...';
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
    this.btnDeleteSorter.textContent = 'X';
  }

  error() {
    this.mainCard.style.cssText = '';
    this.mainCard.textContent = '';
    this.mainCard.style.cssText = `
    height: 100px;\
    width: 200px;\
    //background-color: blue\
    `;
    this.mainCard.appendChild(this.btnDeleteSorter);
    this.btnDeleteSorter.classList.add('btn_delete_sorter');
    this.btnDeleteSorter.textContent = 'X';
    this.mainCard.style.backgroundColor = this.color;
    this.mainCard.textContent = 'Error...';
  }
}

export default SorterCard;
