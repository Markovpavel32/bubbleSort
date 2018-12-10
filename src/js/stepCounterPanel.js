/* eslint-disable no-restricted-syntax */
import EventBus from './pub-sub';

class StepCounterPanel {
  constructor(color) {
    this.panels = new Map();
    this.stepPanel = document.getElementById('stepControlPanel');
    this.countersBar = document.createElement('div');
    this.color = color;
    EventBus.subscribe('add', this.change.bind(this));
    EventBus.subscribe('delete', this.delete.bind(this));
  }

  change(data) {
    this.panels.set(data.obj, {
      count: data.steps,
      color: data.color,
    });
    this.render();
  }

  render() {
    let ALLSTEPS = 0;
    while (this.stepPanel.firstChild) {
      this.stepPanel.removeChild(this.stepPanel.firstChild);
    }
    for (const a of this.panels.values()) {
      ALLSTEPS += a.count;
    }
    for (const entry of this.panels) {
      const bar = document.createElement('div');
      this.stepPanel.appendChild(bar);
      bar.style.cssText = `
      margin: 5px;\
      height: 20px;\
      border: 1px solid black;\
      `;

      bar.style.backgroundColor = entry[1].color;

      bar.textContent = entry[1].count;
      bar.style.width = `${(entry[1].count / ALLSTEPS) * 200}px`;
      if (entry[1].count === 0) {
        bar.style.width = '20px';
        bar.style.backgroundColor = 'white';
      }
    }
  }

  delete(obj) {
    this.panels.delete(obj);
    this.render();
  }

  publishData() {
    for (const entry of this.panels) {
      const data = {
        obj: entry,
        steps: entry.count,
      };
      EventBus.publish('sort', data);
    }
  }
}
const counterPanel = new StepCounterPanel();

export default counterPanel;
