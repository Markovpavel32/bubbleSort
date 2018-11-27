/* eslint-disable no-param-reassign */
const Render = {

  render(obj) {
    while (obj.containerOfBars.firstChild) {
      obj.containerOfBars.removeChild(obj.containerOfBars.firstChild);
    }

    for (let i = 0; i < obj.arr.length; i += 1) {
      const div = document.createElement('div');
      obj.containerOfBars.appendChild(div);
      div.classList.add('bar');
      obj.containerOfBars.classList.add('parent');
      const h = obj.arr[i] * 20;
      div.style.cssText = `height: ${2 * h}px;\
                width: 20px;\
                left: ${i * 25}px;\
                transition: left 500ms linear;\
                `;
      div.style.backgroundColor = obj.color;
      div.innerHTML = `${obj.arr[i]}`;
    }
  },

  sort(obj) {
    for (let i = 0; i < obj.data.length; i += 1) {
      if (!(obj.bar[obj.indexes[i]].style.left === `${i * 25}px`)) {
        obj.bar[obj.indexes[i]].style.left = `${i * 25}px`;
        obj.bar[obj.indexes[i]].style.backgroundColor = 'blue';
        obj.bar[obj.indexes[i]].addEventListener('transitionend', () => { obj.bar[obj.indexes[i]].style.backgroundColor = obj.color; });
      }
    }
  },
};


export default Render;
