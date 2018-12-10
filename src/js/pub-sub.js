/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const EventBus = {
  channels: {},

  subscribe(channelName, listener) {
    if (!this.channels[channelName]) this.channels[channelName] = [];
    this.channels[channelName].push(listener);
  },

  publish(channelName, data) {
    const channel = this.channels[channelName];
    channel.forEach(listener => listener(data));
  },
};

export default EventBus;
