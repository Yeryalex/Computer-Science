function merge(array, left, mid, right) {

    let leftSide = array.slice(left, mid + 1);
    let rightSide = array.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    console.log(leftSide, rightSide)
    while (i < leftSide.length && j < rightSide.length) {
        if (leftSide[i] <= rightSide[j]){
            array[k] = leftSide[i]
            i++;
        }else {
            array[k] = rightSide[j];
            j++;
        }
        k++;
    }

    while (i < leftSide.length) {
        array[k] = leftSide[i];
        i++;
        k++;
    }
        while (j < rightSide.length) {
        array[k] = rightSide[j];
        j++;
        k++;
    }
}

function mergeSort(array, left = 0, right = array.length){

    if (array.length == 0 || array.length == 1) return array;
    if (left >= right) return ;

    let mid = left + Math.floor((right - left) / 2);
    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);
    merge(array, left, mid, right);
}

let test = [38, 27, 43, 3, 9, 82, 10];

mergeSort(test);