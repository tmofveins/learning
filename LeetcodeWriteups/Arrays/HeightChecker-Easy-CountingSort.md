# Height Checker

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in  **non-decreasing order**  by height. Let this ordering be represented by the integer array  `expected`  where  `expected[i]`  is the expected height of the  `ith`  student in line.

You are given an integer array  `heights`  representing the  **current order**  that the students are standing in. Each  `heights[i]`  is the height of the  `ith`  student in line (**0-indexed**).

Return  _the  **number of indices**  where_ `heights[i] != expected[i]`.

**Example 1:**

**Input:** heights = [1,1,4,2,1,3]
**Output:** 3
**Explanation:** 
heights:  [1,1,4,2,1,3]
expected: [1,1,1,2,3,4]
Indices 2, 4, and 5 do not match.

**Example 2:**

**Input:** heights = [5,1,2,3,4]
**Output:** 5
**Explanation:**
heights:  [5,1,2,3,4]
expected: [1,2,3,4,5]
All indices do not match.

**Example 3:**

**Input:** heights = [1,2,3,4,5]
**Output:** 0
**Explanation:**
heights:  [1,2,3,4,5]
expected: [1,2,3,4,5]
All indices match.

**Constraints:**

-   `1 <= heights.length <= 100`
-   `1 <= heights[i] <= 100`

<hr>

### Explanation

**O(n log n) naive solution**

This can be trivially achieved by using `Arrays.sort()` to sort the `heights` array, then comparing the sorted array to the original array. As sorting is an **O(n log n)** operation, this will be the overall runtime of this solution.

**O(n + h) solution using counting sort**

_Note: h denotes the maximum value in the original array_

As the array has a length constraint of 100 items and we know that there are only positive values, we can use counting sort to count the frequency of heights in the array. With this information, we then compare the values in `heights` with the values in `counter`. 

For example: 
Given array `[1,1,1,3,4,2,1]`
The corresponding `counter` array is `[0,4,1,1,1, ...,0]`  (as this array has 101 entries)
As `counter[1] == 4`, we know that the original array should have `4` consecutive `1`s.
Compare in this fashion for the rest of the array, adding to a `result` variable if values are in the correct position.

This gives us a runtime of O(n + h), but since technically both `n` and `h` are bounded by an upper limit of 100, in the context of the problem it is O(1).

<hr>

### Why I highlighted this problem

- I learned about counting sort and its uses in the context of a trivial-length array with only positive integers

<hr>

### Java solution

```java
class Solution {
    public int heightChecker(int[] heights) {
        int counter = new int[101];
        for (int h : heights)
            counter[h]++;
        
        int result = 0, curr = 0;
        
        for (int i = 0; i < heights.length; i++) {
            while (counter[curr] == 0)
                curr++;
            if (curr != heights[i])
                result++;
            
            counter[curr]--;
        }
        
        return result;
    }
}
```
