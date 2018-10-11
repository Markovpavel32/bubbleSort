class Sorter{
    constructor(data){
        this.data = data;
        this.counter = this.makeCounter();
        this.arrayOfIndexes = this.makeArr();
        this.massive = this.makeStatus();
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
        return Array(this.data.length).fill(0).map((v,i) => i);
    }

    makeStatus(){
        let status = [];
        status[0] ={
            indexes: this.arrayOfIndexes.map(x => x),
            data: this.data.map(x => x),
            counter: this.counter.get() 
        } ;
        
        return status;
    }

    forward(){
        let counter = this.counter;
        const data = this.data;
        let indexes = this.arrayOfIndexes;
        console.log(data)
        outer: for(let i = 0;i < data.length - 1; i++){
                if(counter.get() >= data.length - 1 - i){
                    counter.reset();
                }

                for(let j = counter.get(); j < data.length - 1; j++){
                    if(data[j] > data[j+1]){
                        [data[j], data[j+1]] = [data[j+1], data[j]];
                        [indexes[j], indexes[j+1]] = [indexes[j+1], indexes[j]];
                        counter.getNext();
                        this.massive.push({indexes: this.arrayOfIndexes.map(x => x),
                        data: this.data.map(x => x),
                        counter: counter.get(),})
                        
                        break outer;
                    }
                    counter.getNext();
                    
                }  }
                console.log(this.massive);
        return {
            data: data,
            indexes: indexes,
        }
    } 

    backward(){
        let counter = this.counter;
        for(let i = 0; i < this.data.length; i++){
            if(this.massive[this.massive.length-1].indexes !== this.massive[this.massive.length-2].indexes){
                this.arrayOfIndexes = this.massive[this.massive.length-2].indexes.map(x=>x);
                this.data = this.massive[this.massive.length-2].data.map(x=>x); 
                counter.set(this.massive[this.massive.length-2].counter);
                this.massive.pop();
                break;
            }
        }
        console.log(this.massive);
        return {
            data: this.data,
            indexes: this.arrayOfIndexes,
        }
    }
}


export default Sorter;