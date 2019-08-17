import { ASort } from './ASort';
import { BSort } from './BSort';
import { BSearch } from './BSearch';

const unsorted = [13, 2, 17, 5, 77, 22, 83, 65, 14, 9, 0, 4, 7, 32];
const elementsToFind = [1, 5, 13, 27, 77];

console.log(BSearch.instance.search(elementsToFind, 5));
console.log(BSearch.instance.search(elementsToFind, 666));
console.log(ASort.sort(unsorted));
console.log(BSort.sort(unsorted));