export class BSort {
    public static sort(array: number[]): number[] {
        // Insertion sort
        array = [...array]; // Copy
        let len = array.length, value = 0, i = 0, j = 0;                  
	
	    for(i = 1; i < len; i++) {
            value = array[i];
            j = i - 1;

            while (j >= 0 && array[j] > value) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = value;
    	}

        return array
    }
}