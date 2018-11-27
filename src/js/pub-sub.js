const EventBus = {
  channels: {},
  sorters: new Map(),
  //let sorters = new Map();
  //let count = 0;
  subscribe(channelName, listener) {
    
      if(!this.channels[channelName]) this.channels[channelName] = [];
      this.channels[channelName].push(listener);
  },

  publish(channelName, data) { 
    let ALLSTEPS = 0;
    const channel = this.channels[channelName]
    if(!this.channels[channelName] || !this.channels[channelName].length) return;
    if(data.action === 'remove') this.sorters.delete(data.sortObj);

    if(data.action === 'add'){
    this.sorters.set(data.sortObj, {
        count: data.steps,
        color: data.color,
      })
    }
      

    data.update = this.sorters;
    for(let a of this.sorters.values()){
      ALLSTEPS += a.count
      
    }
    data.allSteps = ALLSTEPS;
    console.log(this.sorters);
    channel.forEach(listener => listener(data));
  }
}

export default EventBus;

