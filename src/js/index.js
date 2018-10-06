import createData from './createData.js'
import Render from './render.js'
import Sorter from './sorter.js'


const input = document.getElementById('input');
const btnR = document.getElementById('triangle_right');
const btnL = document.getElementById('triangle_left');
//let bubbleSort;

let bubbleSort = new Sorter([1]);
input.oninput = init;
function init(){
    const model = createData(input.value);
    console.log(model);
    bubbleSort = new Sorter(model);
    Render.render(model);
};

export {bubbleSort};
btnR.onclick = handleSort;
btnL.onclick = handleResort;


function handleSort(){
    const data = bubbleSort.forward();
    Render.stepForward(data);
};

function handleResort(){
    const data = bubbleSort.backward();
    Render.stepBackward(data);
};