## Array

### 1.Two Sum

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly\* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**



hashmap,using hashmap to store the number, find the target-number 在不在hashmap里面

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        
        
#       # nums = [2,11,15,7], target = 9
    
#         #brute force
#         #tc: O(n^2)  sc: O(1)
#         for i in range(len(nums)):            
#             for j in range(i, len(nums)):                
#                 if nums[i] + nums[j] == target:
#                     return [i,j]
                
        
        hashmap = {}
        #{2:0,11:1,15:2}
        # key:val
        
        for i in range(len(nums)):
            
            diff = target - nums[i]
            
            if diff in hashmap:
                return [i,hashmap[diff]]
            
            hashmap[nums[i]] = i
            #hashmap[key] = val
            
```



### 121.Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

**Example 1:**

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints:**

- `1 <= prices.length <= 105`

- `0 <= prices[i] <= 104`

  

这道题时最基础的买卖股票，就在不同的天数买卖股票。买的时间必须在卖的时间前面。

double for loop check 每一个值会tle。思路就是two pointer，一个来track小的值，一个来track大的值，只要left pointer < right pointer，就记录一下profit

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        '''
        买卖股票问题，不能在同一天买卖，卖的时候必须时在买的时间之后
        '''
        
#         '''
#         brute force，tle
#         把每一种profit的可能都算出来，然后选一个max
#         O(n)
#         O(1)
#         '''
#         profit = 0
#         for i in range(len(prices)):
#             for j in range(i,len(prices)):
                
#                 profit = max(profit, prices[j]-prices[i])        
#         return profit

        '''
        two pointer
        two pointer找到最小的number和最大的number，因为买必须要在前面，所以可以一直往后面找
        O(n)
        O(1)
        '''
        l,r = 0,1
        maxprofit = 0
        
        while r < len(prices):
            if prices[l] < prices[r]:
                profit = prices[r] - prices[l]
                maxprofit = max(maxprofit,profit)
            else:
                l = r
            r += 1
        return maxprofit
```



### 217.Contains Duplicate

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: true
```

**Example 2:**

```
Input: nums = [1,2,3,4]
Output: false
```

**Example 3:**

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

**Constraints:**

- `1 <= nums.length <= 105`

- `-109 <= nums[i] <= 109`

  

这道题就是要看nums是不是duplicated

- 可以用 Counter来得到所有数字的frequency，这样的话 O(n) O(n)
- sorted整个nums，看前后是不是一样， O(nlogn) O(1)

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        
        '''这道题需要看的是给的input list有没有包含相同的数字，如果有return true，没有就是false
            思路很简单，用counter，记录没有一个数字的value以及频率，然后看有没有频率是大于1的，有的话，直接return true，else false
        '''
        #TC: O(n)
        #SC: O(1)
        count = Counter(nums)
        
        for value in count.values():
            
            if value > 1:
                return True
            
        return False
    
```



### 238.Product of Array Except Self

Given an integer array `nums`, return *an array* `answer` *such that* `answer[i]` *is equal to the product of all the elements of* `nums` *except* `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

**Example 2:**

```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

 

**Constraints:**

- `2 <= nums.length <= 105`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        
        '''
        这道题要返回的是除了每一个数字index所对应的值以外其他数字的mulplication
        time: O(n)
        这里用的是prefix和postfix，O(n)就是把两个fix都记录下来，然后再相乘
        如果是O(1)，就是不用存
        '''
        
        '''
        prefix = [1,1,1,1]
        postfix =[1,1,1,1]
        res =    [1,1,1,1]
        '''
#         #O(n) space
#         prefix = [1]*len(nums)
#         postfix = [1]*len(nums)
#         res = [1]*len(nums)
        
#         for i in range(1,len(nums)):
#             prefix[i] = nums[i-1]*prefix[i-1]        
#         print(prefix)
        
#         for i in reversed(range(len(nums)-1)):
#             postfix[i] = nums[i+1]*postfix[i+1]
#         print(postfix)  
        
#         for i in range(len(nums)):            
#             res[i] = prefix[i]*postfix[i]
#         return res
        
        #O(1)
        length = len(nums)
        answer = [0]*length

        answer[0] = 1
        for i in range(1, length):
            answer[i] = nums[i - 1] * answer[i - 1]
            
        R = 1;
        for i in reversed(range(length)):
            answer[i] = answer[i] * R
            R *= nums[i]
        
        return answer
```



### 53.Maximum Subarray

Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.

**Example 1:**

```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

**Example 2:**

```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

**Example 3:**

```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

**Constraints:**

- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        
        
        
#         #initial dp是原数组
#         #dp里面存的是 0-i 的subarry summ 或者是他自己本身
#         #如果自己本身的数字比前面的summ要大，前面就有负数，没有必要存着，直接update
#         #最后return的就是dp里面最大
#         dp = nums.copy()

#         for i in range(1,len(nums)):
            
#             dp[i] = max(dp[i],dp[i-1]+nums[i])

#         return max(dp)
    
        #这道题需要找最大的sum，但是没有规定subarray的大小。并且只要求返回最大的sum就行。 那么就需要两个值来记录，一个是当前的sum，一个是最大的sum
        #最大的sum也就是需要返回的最终的res。cursum就是当前sum，用来和之前最大的sum对比
        #这里假定第一个是最大的，然后往后加，如果数字小于0，直接reset cursum为0，相当于跳过这个，开启下一个subarray
        #O(n)
        
        maxsub = nums[0]
        cursum = 0
        
        #nums里面的数字一个个check过去
        for n in nums:
            #如果大于0，就加入到cur sum里面，因为这里没有限制subarray的大小，随便加多少数字都行
            cursum += n
            
            #update max                
            maxsub = max(maxsub,cursum)
            
             #如果小于0，就reset cursum
            if cursum < 0:
                cursum = 0
            
        return maxsub
```



### 152.Maximum Product Subarray

Given an integer array `nums`, find a subarray that has the largest product, and return *the product*.

The test cases are generated so that the answer will fit in a **32-bit** integer.

**Example 1:**

```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

**Example 2:**

```
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

**Constraints:**

- `1 <= nums.length <= 2 * 104`
- `-10 <= nums[i] <= 10`
- The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        '''
        这道题要求的是最大的subarray的乘机是多少，这里可以用greddy
        建立一个windows，只要不是负数，就加入到window里面
        '''
        
#         #O(n2) O(1)
#         if len(nums) == 0:
#             return 0

#         result = nums[0]

#         for i in range(len(nums)):
#             accu = 1
#             for j in range(i, len(nums)):
#                 accu *= nums[j]
#                 result = max(result, accu)

#         return result
    
        # Calculate prefix product in A.
        # Calculate suffix product in A.
        # Return the max.
        #O(n) O(1)
        B = nums[::-1]
        for i in range(1, len(nums)):
            nums[i] *= nums[i - 1] or 1
            B[i] *= B[i - 1] or 1
        return max(nums + B)
```



### 153.Find Minimum in Rotated Sorted Array

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in `O(log n) time.`

 

**Example 1:**

```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

**Example 3:**

```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
```

 

**Constraints:**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between `1` and `n` times.

```python
class Solution(object):
    def findMin(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        left, right = 0, len(nums) - 1
        while nums[left] > nums[right]:
            middle  = (left + right) // 2
            if nums[middle] < nums[right]:
                right = middle
            else:
                left = middle + 1
        return nums[left]
```



### 33.Search in Rotated Sorted Array

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

 

**Example 1:**

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**

```
Input: nums = [1], target = 0
Output: -1
```

 

**Constraints:**

- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- `-104 <= target <= 104`

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        
        '''
        这道题是要在rotated sorted array 里面找target
        
        这里rotated就是代表的是左右两边的是中间值，最小值和最大值在中间
        
        这里比较tricky的点在于，需要先把整个array分成左右两个increasing的部分，再去在每一个array里面找
        
        这里用binary search，因为是sorted array
        
        O(logn)
        O(1)
        '''
        left,right = 0,len(nums)-1
        
        
        while left <= right:
            
            mid = left + (right - left)//2
            print("mid = ", mid)
            if target == nums[mid]:
                return mid
            
            #如果开头的数字是小于中间的数字的，那么就可以根据这个定位到左半边的部分
            #因为中间的数字要么比左边的数字大，就意味着一直到中间的位置都是increasing
            #那么这里可以直接binary search左边的array
            #这时候的array就是 [random ++++ largest smallmest +++ ]
            #                   left ------- mid --------------right
            elif nums[left] <= nums[mid]:
                
                #如果target比中间的数字要大，或者是比最左边的数字都要小，那么就说明target 不在左边这部分的array
                #如果target等于left的话，就是在左半边，那么就是需要update right point
                if target > nums[mid] or target < nums[left]:
                    left = mid +1
                #其他情况的话，就是target在左半边这部分，就update 右边的pointer
                else: 
                    right = mid -1
            
            
            #这时候的array就是 [random ++++ largest smallmest +++ ]
            #                   left -------------- mid ------right
            #如果中间的数字比最左边的数字小，那么就说明中间的数字包含了最大的数字，也包含了最小的数字
            #如果是右边的sorted array
            else:
                # 如果target中间的数字要小，那么最小的portion已经在左边了
                #如果target比left要大，最大的也是在左半边
                #如果target等于左边的话，那么就是需要update 右边的pointer
                if target < nums[mid] or target >= nums[left]:
                    right = mid -1
                else:
                    left = mid + 1              
        return -1
```



### 15.3 Sum

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

 

**Example 1:**

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

**Example 2:**

```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

**Example 3:**

```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

 

**Constraints:**

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        
        '''
        这道题就是two sum plus，找到三个数字总和是0
        '''
        #brute force
#         res = set()
        
#         for i in range(len(nums)):
#             for j in range(i+1, len(nums)):
#                 for k in range(j+1,len(nums)):
#                     if i != j and j != k and i != k and nums[i] + nums[j] + nums[k] == 0:
#                         res.add(tuple(sorted((nums[i],nums[j],nums[k])) ) )
#         return res

        '''
        思路：two sum + one more loop
        先loop一遍nums，对每一个对应的num找剩下nums里面的element有没有two sum
        '''
#         # res设为set去重，dups检查是否走有数字一样的element，节省时间
#         res, dups= set(), set()
#         #存two sum里对应的数字和位数
#         #key: nums[j], val: i
#         hashmap = {}

#         for i in range(len(nums)):
#             # 检查是否有重复数字
#             if nums[i] not in dups:
#                 dups.add(nums[i])
#                 # 计算剩下的two sum的target
#                 target = 0 - nums[i]
#                 #从当前的下一个element算起
#                 for j in range(i + 1, len(nums)):
#                     diff = target - nums[j]
#                     #检查diff是否在hashmap里，同时检查是否在当前i存的，有的话证明sum是0
#                     if diff in hashmap and hashmap[diff] == i:
#                         res.add(tuple(sorted((nums[i], nums[j], diff))))
#                     #没有的话把对应的i的index存到对应的key里
#                     hashmap[nums[j]] = i

#         return res
        
        
        #tc:o(n2)
        #s: o(n)
        res, dups = set(), set()
        seen = {}
        for i, val1 in enumerate(nums):
            if val1 not in dups:
                dups.add(val1)
                for j, val2 in enumerate(nums[i+1:]):
                    complement = -val1 - val2
                    if complement in seen and seen[complement] == i:
                        res.add(tuple(sorted((val1, val2, complement))))
                    seen[val2] = i
        return res
```



### 11.Container With Most Water

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.

 

**Example 1:**

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**

```
Input: height = [1,1]
Output: 1
```

 

**Constraints:**

- `n == height.length`
- `2 <= n <= 105`
- `0 <= height[i] <= 104`

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        #这道题需要能乘最多的水
        #最大的数字+最远的距离，也就是水的面积是长乘上宽
        
#         #brute force, 从头到尾的loop，记录每一个area，找到最大的
#         #O(n2)
#         maxarea = 0
#         for left in range(len(height)):
#             for right in range(left + 1, len(height)):
#                 width = right - left
#                 maxarea = max(maxarea, min(height[left], height[right]) * width)

#         return maxarea
    
        #two pointer, 这里two pointer 是从两边往中间缩小
        left, right = 0, len(height)-1
        maxarea = 0
        
        while left < right:
            
            weith = right - left
            maxarea = max(maxarea, min(height[left],height[right])*weith)
            
            if height[left] <= height[right]:

                left += 1
            else:

                right -= 1
                
        return maxarea
```



## Binary

### Sum of Two Integers

### Number of 1 Bits

### Counting Bits

### Missing Number

### Reverse Bits



## Dynamic Programming

### Climbing Stairs

#### Coin Change

#### Longest Increasing Subsequence

#### Longest Common Subsequence

#### Word Break Problem

#### Combination Sum

#### House Robber

#### House Robber II

#### Decode Ways

#### Unique Paths

#### Jump Game

## Graph

### Clone Graph

### Course Schedule

### Pacific Atlantic Water Flow

### Number of Islands

### Longest Consecutive Sequence

### Alien Dictionary (Leetcode Premium)

### Graph Valid Tree (Leetcode Premium)

### Number of Connected Components in an

### Undirected Graph (Leetcode Premium)



## Interval

### Insert Interval

### Merge Intervals

### Non-overlapping Intervals

### Meeting Rooms (Leetcode Premium)

### Meeting Rooms II (Leetcode Premium)



## Linked List

### Reverse a Linked List

### Detect Cycle in a Linked List

### Merge Two Sorted Lists

### Merge K Sorted Lists

### Remove Nth Node From End Of List

### Reorder List



## Matrix

### Set Matrix Zeroes

### Spiral Matrix

### Rotate Image

### Word Search



## String

### Longest Substring Without Repeating Characters

### Longest Repeating Character Replacement

### Minimum Window Substring

### Valid Anagram

### Group Anagrams

### Valid Parentheses

### Valid Palindrome

### Longest Palindromic Substring

### Palindromic Substrings

### Encode and Decode Strings (Leetcode Premium)



## Tree

### Maximum Depth of Binary Tree

### Same Tree

### Invert/Flip Binary Tree

### Binary Tree Maximum Path Sum

### Binary Tree Level Order Traversal

### Serialize and Deserialize Binary Tree

### Subtree of Another Tree

### Construct Binary Tree from Preorder and Inorder Traversal

### Validate Binary Search Tree

### Kth Smallest Element in a BST

### Lowest Common Ancestor of BST

### Implement Trie (Prefix Tree)

### Add and Search Word

### Word Search II



## Heap

###  Merge K Sorted Lists

###  Top K Frequent Elements

###  Find Median from Data Stream

