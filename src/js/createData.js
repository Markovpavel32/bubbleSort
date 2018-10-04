export default function createData(values) {
    let data = [];
    function makeArr() {
        data = values.split('').map(x => +x);
    }
    makeArr();
    
    return data;    
}