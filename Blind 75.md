## Array

#### Two Sum

hashmap,using hashmap to store the number, find the target-number 在不在hashmap里面

#### Best Time to Buy and Sell Stock

这道题时最基础的买卖股票，就在不同的天数买卖股票。买的时间必须在卖的时间前面。

double for loop check 每一个值会tle。思路就是two pointer，一个来track小的值，一个来track大的值，只要left pointer < right pointer，就记录一下profit

#### Contains Duplicate

这道题就是要看nums是不是duplicated

- 可以用 Counter来得到所有数字的frequency，这样的话 O(n) O(n)
- sorted整个nums，看前后是不是一样， O(nlogn) O(1)

#### Product of Array Except Self



#### Maximum Subarray

#### Maximum Product Subarray

#### Find Minimum in Rotated Sorted Array

#### Search in Rotated Sorted Array

#### 3 Sum

#### Container With Most Water