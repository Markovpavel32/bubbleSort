Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };
let counter = 0;
let status = [];
let count = 1;
const bubbleSort = (lengthOfArray, arrayOfNumbers, arrayOfIndexes, arrayOfBars) => {
        status.clean(undefined);
   // for(let i = 0; i < lengthOfArray - 1; i++){
       console.log(counter);
        if(counter >= lengthOfArray - 1){
        counter = 0;
        }
        for(let j = counter; j < lengthOfArray - 1; j++){
            if(arrayOfNumbers[j] > arrayOfNumbers[j+1]) {
                let b = arrayOfNumbers[j + 1];
                arrayOfNumbers[j + 1] = arrayOfNumbers[j];
                arrayOfNumbers[j] = b;
                let c = arrayOfBars[arrayOfIndexes[j]].style.left;
                arrayOfBars[arrayOfIndexes[j]].style.left = arrayOfBars[arrayOfIndexes[j+1]].style.left;
                arrayOfBars[arrayOfIndexes[j+1]].style.left = c;
                let d = arrayOfIndexes[j];
                arrayOfIndexes[j] = arrayOfIndexes[j+1];
                arrayOfIndexes[j + 1] = d;
                counter+=1;
                status[count] = [];
                for(i=0; i < arrayOfIndexes.length; i++){
                    status[count][i] = arrayOfIndexes[i];
                    
                }
                count++;
                break;
            }
            counter++;
        }
        console.log(arrayOfIndexes);
        console.log(status);
        console.log(counter);
}

//export default bubbleSort; 