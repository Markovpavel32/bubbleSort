/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const EventBus = {
  channels: {},
  sorters: new Map(),

  subscribe(channelName, listener) {
    if (!this.channels[channelName]) this.channels[channelName] = [];
    this.channels[channelName].push(listener);
  },

  publish(channelName, data) {
    let ALLSTEPS = 0;
    const channel = this.channels[channelName];

    if (!this.channels[channelName] || !this.channels[channelName].length) return;

    if (data.action === 'remove') this.sorters.delete(data.sortObj);

    if (data.action === 'add') {
      this.sorters.set(data.sortObj, {
        count: data.steps,
        color: data.color,
      });
    }

    data.update = this.sorters;
    for (const a of this.sorters.values()) {
      ALLSTEPS += a.count;
    }

    data.allSteps = ALLSTEPS;
    channel.forEach(listener => listener(data));
  },
};

export default EventBus;
