# underscore 1.8.3 源碼分析

## 介紹

分析 underscore 的源碼， 理解不同的 API 函式內部原理，並實作一個 mini-underscore。

## collections 相關


#### map _.map(list,iteratee)

將 list 的每個元素，通過轉換函數(iteratee 迭代器)，生成一個與之相對應的陣列

```javascript=

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]

_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]

```