class Sorter {
  constructor(data) {
    this.data = data;
    this.counter = 0;
    this.indexes = this.makeArr();
    this.massive = this.makeStatus();
    this.rightBorder = data.length - 1;
    this.steps = 0;
  }

  makeArr() {
    return Array(this.data.length).fill(0).map((v, i) => i);
  }

  makeStatus() {
    const status = [];
    status[0] = {
      indexes: this.indexes.map(x => x),
      data: this.data.map(x => x),
      counter: this.counter.get(),
      rightBorder: this.data.length - 1,
    };

    return status;
  }

  forward() {
    for (let j = this.counter; j <= this.rightBorder; j += 1) {
      if (this.massive[this.steps + 1] !== undefined) {
        this.steps += 1;
        this.indexes = this.massive[this.steps].indexes.map(x => x);
        this.data = this.massive[this.steps].data.map(x => x);
        this.counter = this.massive[this.steps].counter;
        this.rightBorder = this.massive[this.steps].rightBorder;
        break;
      }

      if (this.counter >= this.rightBorder) {
        this.counter = 0;
        this.rightBorder -= 1;
        j = 0;
      }

      if (this.data[j] > this.data[j + 1]) {
        [this.data[j], this.data[j + 1]] = [this.data[j + 1], this.data[j]];
        [this.indexes[j], this.indexes[j + 1]] = [this.indexes[j + 1], this.indexes[j]];
        this.counter = 1;
        this.steps += 1;
        this.massive.push({
          indexes: this.indexes.map(x => x),
          data: this.data.map(x => x),
          counter: this.counter,
          rightBorder: this.rightBorder,
        });
        break;
      }


      this.counter += 1;
    }
    return {
      data: this.data,
      indexes: this.indexes,
    };
  }

  backward() {
    if (this.massive[this.steps - 1] !== undefined) {
      this.steps -= 1;
      this.indexes = this.massive[this.steps].indexes;
      this.data = this.massive[this.steps].data;
      this.counter = this.massive[this.steps].counter;
      this.rightBorder = this.massive[this.steps].rightBorder;
    }
    return {
      data: this.data,
      indexes: this.indexes,
    };
  }
}


export default Sorter;
