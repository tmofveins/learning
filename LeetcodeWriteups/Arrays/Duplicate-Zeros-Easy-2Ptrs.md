# Duplicate Zeros

Given a fixed-length integer array  `arr`, duplicate each occurrence of zero, shifting the remaining elements to the right.

**Note**  that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

**Example 1:**

**Input:** arr = [1,0,2,3,0,4,5,0]
**Output:** [1,0,0,2,3,0,0,4]
**Explanation:** After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

**Example 2:**

**Input:** arr = [1,2,3]
**Output:** [1,2,3]
**Explanation:** After calling your function, the input array is modified to: [1,2,3]

**Constraints:**

-   `1 <= arr.length <= 104`
-   `0 <= arr[i] <= 9`

<hr> 

### Explanation

**O(n^2) time naive solution**

This would be done by traversing the array in the forward direction. When a zero is encountered, shift all elements to the right of the zero by one position to the right, and then add the duplicate zero. This forward-shifting operation would require `n` traversals per element (where there are `n` elements) making it a worst-case **O(n^2)** runtime.

**O(n) time optimal solution**

An important thing to note is that **elements beyond the original length of the array are not written**, i.e. not returned in the result. Using this information, we can "simulate" a fully expanded array - the result of duplicating all zeros in the original array - and have a pointer traversing backwards down it. The length of this expanded array can be found by traversing through the original array, adding to the length if a 0 is found.
 Another pointer would be at the end of the original array, simultaneously traversing backwards. At each step of the traversal, we check if the expanded array pointer `write` is within the bounds of the original array pointer `curr`. If so, we copy `arr[curr]` to `arr[write]` either once or twice depending on whether `arr[curr]` is 0. 
 This approach takes only one pass through the array, and therefore runs in **O(n)** time.

<hr>

### Why I highlighted this problem

- Reminded me to pay closer attention to problem constraints (in this case, the detail that elements beyond the original length of the array are not written)
- Interesting usage of the two-pointer technique as the length of the original array has to be accounted for

<hr>

### Java solution

```java
    public void duplicateZeros(int[] arr) {
        if (arr.length == 1) return;
        
        int zeros = 0;
        for (int i : arr)
            if (i == 0) zeros++;
        
        int write = arr.length + zeros - 1;
        int curr = arr.length - 1;
        
        while (curr >= 0 && write >= 0) {
            if (arr[curr] != 0) {
                if (write < arr.length)
                    // non-zero, so only write once
                    arr[write] = arr[curr];
            } else {
                // zero, so have to perform two write operations and two checks
                if (write < arr.length)
                    arr[write] = arr[curr];
                write--;
                if (write < arr.length)
                    arr[write] = arr[curr];
            }

            curr--;
            write--;
        }
    }
 ```
