export class BSearch {
    private _operations = 0;
    public static instance = new BSearch();

    get operations {
        return this._operations;
    }

    public search(array: number[], value: number): number {
        let start = 0, end = array.length - 1; 

        while (start <= end) { 
            const mid = Math.floor((start + end) / 2); 

            // Not sure if number of operations refers to number of jumps or function calls.

            this._operations++;

            if (array[mid] === value) {
                return mid;
            } else if (array[mid] < value) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        } 
       
        return -1; 
    }
}