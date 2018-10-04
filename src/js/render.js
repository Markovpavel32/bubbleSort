import {dispatcher as signal} from "./dispatcher.js";
import {bubbleSort} from './index.js';
const Render = {
    
    parent: document.getElementsByClassName('parent')[0],

    render(arr){
        let bars = bubbleSort.arrayOfBars;
        let indexes = bubbleSort.arrayOfIndexes;
        let counter = bubbleSort.counter;
        let count = counter.get() - 1;
        let lay = bubbleSort.lay;
        let layLength = lay.length;
        let chIndex = bubbleSort.changeIndex;

        if(signal.flag === 'first initialization') {
            while(this.parent.firstChild){
                this.parent.removeChild(this.parent.firstChild);
            }

            let div = [];

            for(let i = 0; i < arr.length; i++){
                div[i] = document.createElement('div');
                this.parent.appendChild(div[i]);
                div[i].classList.add('bar');
                let h = arr[i] * 20;
                div[i].style.height = `${2 * h}px`;
                div[i].style.left = `${i * 25}px`;
                div[i].innerHTML = `${arr[i]}`;
            }


        } else if(signal.flag === 'step forward'){
            let f = bars[indexes[count]].style.left;
            bars[indexes[count]].style.left = bars[indexes[count+1]].style.left;
            bars[indexes[count+1]].style.left = f;
             

        
        } else if(signal.flag === 'step backward'){
            console.log(chIndex);
            let c = bars[lay[layLength - 1][chIndex]].style.left;
            bars[lay[layLength - 1][chIndex]].style.left = bars[lay[layLength - 1][chIndex+1]].style.left;
            bars[lay[layLength - 1][chIndex+1]].style.left = c;
        }
    }
}

export default Render;