const transition = () => {
                let c = arrayOfBars[arrayOfIndexes[j]].style.left;
                arrayOfBars[arrayOfIndexes[j]].style.left = arrayOfBars[arrayOfIndexes[j+1]].style.left;
                arrayOfBars[arrayOfIndexes[j+1]].style.left = c;
                let d = arrayOfIndexes[j];
                arrayOfIndexes[j] = arrayOfIndexes[j+1];
                arrayOfIndexes[j + 1] = d;
}