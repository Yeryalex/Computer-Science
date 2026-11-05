// ITERATIVE SOLUTION

function fibonacci(n) {

    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0 , 1]
    let fibSequence = [0, 1];

    for (let i = 1; i < n - 1; i++) {
        let prevValue = fibSequence[i - 1];
        fibSequence.push(prevValue + fibSequence[i]);        
    }
    return (fibSequence);
}

function fibonacciRec(n) {

    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    let fibSequence = fibonacciRec(n - 1);
    fibSequence.push(fibSequence.at(-1) + fibSequence.at(-2));
    return fibSequence;
}

console.log("Iterative", fibonacci(8));
console.log("Recursive", fibonacciRec(8));