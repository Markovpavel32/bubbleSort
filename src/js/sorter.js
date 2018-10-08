class Sorter{
    constructor(data){
        this.data = data;
        this.counter = this.makeCounter();
        this.arrayOfBars = document.getElementsByClassName('bar');
        this.arrayOfIndexes = this.makeArr();
        this.lay = this.makeStatus();
    }

    makeCounter(){
        let currentCount = 0;

        return {
            get: function(){
                return currentCount;
            },

            getNext: function(){
                return currentCount++;
            },

            getBack(){
                return currentCount--;
            },

            set: function(value){
                currentCount = value;
            },

            reset: function(){
                currentCount = 0;
            }
        };
    }

    makeArr(){
        /*let indexes = [];
        for(let i = 0; i < this.data.length; i++){
            indexes[i] = i;
        }
        return indexes;*/
        return Array(this.data.length).fill(0).map((v,i) => i);
    }

    makeStatus(){
        let status = [];
        status[0] = [];
        for(let i = 0; i < this.data.length; i++){
            status[0][i] = i;
        }
        return status;
    }

    forward(){
        let counter = this.counter;
        const data = this.data;
        let lay = this.lay;
        let indexes = this.arrayOfIndexes;
        let h = [];

        outer:for(let i = 0; i < data.length - 1; i++){

                if(counter.get() >= data.length - i){
                    counter.reset();
                }

                for(let j = counter.get(); j < data.length - i - 1; j++){
                    if(data[j] > data[j+1]){
                        let c = data[j];
                        data[j] = data[j+1];
                        data[j+1] = c;
                        let d = indexes[j];
                        indexes[j] = indexes[j+1];
                        indexes[j + 1] = d;
                        counter.getNext();
                        for(let g = 0; g < this.arrayOfIndexes.length; g++){
                            h[g] = this.arrayOfIndexes[g];
                        }
                        
                        lay.push(h);
                        break outer;
                    }
                counter.getNext();
                }
        }
        console.log(this.arrayOfIndexes);
        return {
            data: data,
            indexes: indexes,
        }
    } 

    backward(){
        let data = this.data;
        let counter = this.counter;
        let statusL = this.lay.length;
        let lay = this.lay;
        let indexes = this.arrayOfIndexes;

        for(let i = 0; i < data.length; i++){
            if(lay[statusL - 1][i] !== lay[statusL - 2][i]){
                let y = data[i];
                data[i] = data[i+1];
                data[i + 1] = y;
                let d = indexes[i];
                indexes[i] = indexes[i + 1];
                indexes[i + 1] = d;
                counter.getBack();
                lay.pop();
                break;
            }
        }
        console.log(lay);
        return {
            data: data,
            lay: lay,
        }
    }
}


export default Sorter;