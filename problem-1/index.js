// Solution 1: Using the formula for the sum of an arithmetic series
var sum_to_n_a = function(n) {
    return (n * (n + 1)) / 2;
};  

// Solution 2: Using a for loop
var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Solution 3: Using recursion
var sum_to_n_c = function(n) {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
};

const n = 10;
console.log("Solution 1: ",sum_to_n_a(n));
console.log("Solution 2: ",sum_to_n_b(n));
console.log("Solution 3: ",sum_to_n_c(n));