/*
This pattern involves creating a window which can either be an array or number from one position to another.

Depending on a certain condition, the window either increases or closes (and a new window is created)

Useful for keeping track of a subset of data in an array or string, etc.
*/

/*
Example 1: 
Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.
*/

// naive solution - time complexity: 0(n^2)
function maxSubarraySum(arr, num) {
    // if the number is greater than the size of the array, return null
    if (num > arr.length) {
        return null;
    }
    // let's set the max value to least value (more than negative number) to make sure we start at the lowest maximum
    var max = -Infinity;
    // loop through the array up to the index that is subtracted by the given number (and + 1 because its 0-indexed);
    // we don't need to iterate to the end because we don't need to add the last values that is less than the given number
    for (let i = 0; i < arr.length - num + 1; i++) {
        // lets set a temporary value
        temp = 0;
        // loop through the nth amount of numbers in the array 
        for (let j = 0; j < num; j++) {
            temp += arr[i + j];
        }
        // check to see if the sum of numbers is more than the max
        // if it's larger than the max, set it as the new max
        if (temp > max) {
            max = temp;
        }
        // keep looping until we finish the outer loop
    }
    // at the end of the loop, return the max.
    return max;
}
// further explanation: this was a straight forward solution to the problem but it still requires a nested loop making the time complexity O(n^2). 

// refactored solution - time complexity: O(n)
// to do this in linear complexity, lets iterate the given array up to the given number, as we loop through, we will set the maxSum to it's set of values
// then we set a temporary sum of the max sum
// next we start iterating through the given array again, starting at the index after the last set of values
// as we iterate through the array, we will subtract the first value from the first set and add the new value as the new set then set it as the temporary sum (old set)
// then we check to see for the maximum from the old set and new set using Math.max()
// once we finish the loop, we should have the maximum returned
function maxSubarraySum(arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    if (arr.length < num) {
        return null;
    }
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) // 10
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) // 17
maxSubarraySum([4, 2, 1, 6], 1) // 6
maxSubarraySum([4, 2, 1, 6, 2], 4) // 13
maxSubarraySum([], 4) // null