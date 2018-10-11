import createData from './createData.js'
import Render from './render.js'
import Sorter from './sorter.js'


const input = document.getElementById('input');
const btnR = document.getElementById('triangle_right');
const btnL = document.getElementById('triangle_left');

let bubbleSort;
input.oninput = init;
function init(){
    const model = createData(input.value);
    console.log(model);
    bubbleSort = new Sorter(model);
    Render.render(model);
};

btnR.onclick = handleSort;
btnL.onclick = handleResort;


function handleSort(){
    const data = bubbleSort.forward();
    Render.sort(data);
};

function handleResort(){
    const data = bubbleSort.backward();
    Render.sort(data);
};