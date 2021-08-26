# Find All Numbers Disappeared in an Array


Given an array  `nums`  of  `n`  integers where  `nums[i]`  is in the range  `[1, n]`, return  _an array of all the integers in the range_  `[1, n]`  _that do not appear in_  `nums`.

**Example 1:**

**Input:** nums = [4,3,2,7,8,2,3,1]
**Output:** [5,6]

**Example 2:**

**Input:** nums = [1,1]
**Output:** [2]

**Constraints:**

-   `n == nums.length`
-   `1 <= n <= 105`
-   `1 <= nums[i] <= n`

<hr>

### Explanation

**O(n) time, O(n) space naive solution**

This is achieved by creating an additional array to count the appearance of each element. This `counter` array is the same length as the original array, and `counter[i]` denotes the no. of appearances of `i + 1` in original array. We can then check to see where `counter[i] == 0` and add `i` to the result array.

**O(n) time optimal solution**

As all the elements are in the range `[1, nums.length]`, we can step through `nums` and negate the element at `nums[nums[i] - 1]` (subtract 1 to account for zero-indexing) provided it is not already negative. Since some elements are missing, those elements at `nums[missing_elem - 1]` will never be accessed, and hence will remain positive.

For example:
Given array `[4,3,2,7,8,2,3,1]`.
`5` and `6` are the missing values, thus when we do the aforementioned negation step, the values at `array[5 - 1]` and `array[6 - 1]` will remain positive.

We can then perform another pass through `nums`,  adding any positive elements to our result array.

<hr>

### Why I highlighted this problem

- In future where the values in an array are positive integers with values ranging from `[1, array.length]` or similar, I can apply this negation technique or modify it to the problem statement.

<hr>

### Java solution

```java
class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int index = Math.abs(nums[i]) - 1;
            if (nums[index] > 0)
                nums[index] = -nums[index];
        }
        
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0)
                result.add(i + 1);
        }
        
        return result;
    }
}
```
