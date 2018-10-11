const Render = {
    
    parent: document.getElementsByClassName('parent')[0],

    render(arr){

        while(this.parent.firstChild){
            this.parent.removeChild(this.parent.firstChild);
        }

            for(let i = 0; i < arr.length; i++){
                let div = document.createElement('div');
                this.parent.appendChild(div);
                div.classList.add('bar');
                let h = arr[i] * 20;
                div.style.cssText = `background-color: #ff5a00;\
                height: ${2 * h}px;\
                width: 20px;\
                left: ${i * 25}px;\
                `
                div.innerHTML = `${arr[i]}`;
            }
    },

    sort(obj){
        let bar = document.getElementsByClassName('bar');
        for(let i = 0; i < obj.data.length; i++){
            if(!(bar[obj.indexes[i]].style.left === `${i * 25}px`)) {
            bar[obj.indexes[i]].style.left = `${i * 25}px`;
            bar[obj.indexes[i]].style.backgroundColor = 'blue';
            setTimeout(function(){bar[obj.indexes[i]].style.backgroundColor = '#ff5a00';}, 500);
        }
        }
    },
}


export default Render;