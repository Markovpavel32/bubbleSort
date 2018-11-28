/* eslint-disable no-restricted-syntax */
import EventBus from './pub-sub';

class StepCounterPanel {
  constructor(color) {
    [this.stepPanel] = document.getElementsByClassName('stepControlPanel');
    this.countersBar = document.createElement('div');
    EventBus.subscribe('sort', this.change.bind(this));
    this.color = color;
  }

  change(data) {
    while (this.stepPanel.firstChild) {
      this.stepPanel.removeChild(this.stepPanel.firstChild);
    }

    for (const entry of data.update) {
      const bar = document.createElement('div');
      this.stepPanel.appendChild(bar);
      bar.style.cssText = `
      margin: 5px;\
      height: 20px;\
      border: 1px solid black;\
      `;

      bar.style.backgroundColor = entry[1].color;

      bar.textContent = entry[1].count;
      bar.style.width = `${(entry[1].count / data.allSteps) * 200}px`;
      if (entry[1].count === 0) {
        bar.style.width = '20px';
        bar.style.backgroundColor = 'white';
      }
    }
  }
}

export default StepCounterPanel;
