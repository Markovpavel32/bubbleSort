class Sorter{
    constructor(data){
        this.data = data;
        this.counter = this.makeCounter();
        this.indexes = this.makeArr();
        this.massive = this.makeStatus();
        this.rightBorder = data.length - 1;
        this.steps = 0;
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
        let data = this.data
        status[0] ={
            indexes: this.indexes.map(x => x),
            data: this.data.map(x => x),
            counter: this.counter.get(),
            rightBorder: data.length - 1, 
        };
        
        return status;
    }

    forward(){
        let counter = this.counter;
        let data = this.data;
        let indexes = this.arrayOfIndexes;
        for(let j = counter.get(); j <= this.rightBorder; j++){
            
            if(this.massive[this.steps + 1] !== undefined){
                this.steps++;
                this.indexes = this.massive[this.steps].indexes.map(x=>x);
                this.data = this.massive[this.steps].data.map(x=>x); 
                counter.set(this.massive[this.steps].counter);
                this.rightBorder = this.massive[this.steps].rightBorder;
                break;
            }

            if(counter.get() >= this.rightBorder){
                counter.reset();
                this.rightBorder--;
                j = 0;
            }
            
            if(this.data[j] > this.data[j+1]){
                [this.data[j], this.data[j+1]] = [this.data[j+1], this.data[j]];
                [this.indexes[j], this.indexes[j+1]] = [this.indexes[j+1], this.indexes[j]];
                counter.getNext();
                this.steps++; 
                this.massive.push({indexes: this.indexes.map(x => x),
                data: this.data.map(x => x),
                counter: counter.get(),
                rightBorder: this.rightBorder}
                )
                break;
            }

            
            counter.getNext();
                    
        }
        return {
            data: this.data,
            indexes: this.indexes,
        }
    } 

    backward(){
        let counter = this.counter;
        if(this.massive[this.steps - 1] !== undefined){
            this.steps--
            this.indexes = this.massive[this.steps].indexes.map(x=>x);
            this.data = this.massive[this.steps].data.map(x=>x); 
            counter.set(this.massive[this.steps].counter);
            this.rightBorder = this.massive[this.steps].rightBorder;
            ;
            }
        return {
            data: this.data,
            indexes: this.indexes,
        }
    }
}


export default Sorter;