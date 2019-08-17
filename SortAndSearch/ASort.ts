export class ASort {
    public static sort(array: number[]): number[] {
        // A mysterious bubblesort implementation... ;P

        array = [...array]; // Copy

        let len = array.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (array[j] > array[j + 1]) {
                    array[j] ^= array[j + 1];
                    array[j + 1] ^= array[j];
                    array[j] ^= array[j + 1];
                }
            }
        }

        return array;    
    }
}