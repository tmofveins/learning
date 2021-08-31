# Linked List Cycle II

Given the  `head`  of a linked list, return  _the node where the cycle begins. If there is no cycle, return_ `null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the  `next`  pointer. Internally,  `pos`  is used to denote the index of the node that tail's  `next`  pointer is connected to (**0-indexed**). It is  `-1`  if there is no cycle.  **Note that**  `pos`  **is not passed as a parameter**.

**Do not modify**  the linked list.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

**Input:** head = [3,2,0,-4], pos = 1
**Output:** tail connects to node index 1
**Explanation:** There is a cycle in the linked list, where tail connects to the second node.

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

**Input:** head = [1,2], pos = 0
**Output:** tail connects to node index 0
**Explanation:** There is a cycle in the linked list, where tail connects to the first node.

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

**Input:** head = [1], pos = -1
**Output:** no cycle
**Explanation:** There is no cycle in the linked list.

**Constraints:**

-   The number of the nodes in the list is in the range  `[0, 104]`.
-   `-105  <= Node.val <= 105`
-   `pos`  is  `-1`  or a  **valid index**  in the linked-list.

<hr>

### Explanation

**O(n) solution using 2 pointers and math logic**
*All credits to users ngcl and unagi-achiever*

We first determine whether a cycle exists by using the fast and slow pointer technique: one pointer moves 2 nodes at a time, and the other moves 1 node at a time. If the nodes meet, then there is a cycle present.

Moving on, take `L1` as the distance between the head of the linked list and the start of the cycle.
Take `L2` as the distance between the start of the cycle and the point where both `slow` and `fast` pointers meet.  
Take `d` as the distance moving **forward** between the meeting point and the start of the cycle.

Since `fast` travels twice as fast as `slow`, we know that `fast` has travelled twice the distance as `slow`.
The `slow` pointer has travelled `L1 + L2`. 
The `fast` pointer has travelled `L1 + L2 + L2 + nd` cycles, where `n` is some constant (as `fast` may have travelled around the cycle multiple times before meeting up with `slow`).

We then arrive at the formula: 
`2(L1 + L2) == L1 + L2 + L2 + nd`
Simplifying this, we get:
`L1 = nd`
Meaning the distance between the list head and the start of the cycle is equal to the **forward** distance between the meeting point of the 2 pointers and the start of the cycle.

Using this information, we can advance our `cycle` pointer along with the `slow` pointer from its current position at a rate of 1 node at a time. Where the 2 pointers meet is the start of the cycle.

<hr>

### Why I highlighted this problem

- I found this solution required a lot of ingenuity and observations about the nature of linked list cycles.
- It introduced me to looking at problems more analytically and finding patterns in different test cases which can lead to more efficient solutions. In future I can try to apply similar mathematical-styled proofs to solve other problems.

<hr> 

### Java solution

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        
        ListNode slow = head, fast = head, cycle = head;
        
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                while (slow != cycle) {
                    slow = slow.next;
                    cycle = cycle.next;
                }
                
                return cycle;
            }
        }
        
        return null;
    }
}
```
