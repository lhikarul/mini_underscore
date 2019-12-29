# underscore 1.8.3 源碼分析

## 介紹

分析 underscore 的源碼， 理解不同的 API 函式內部原理，並實作一個 mini-underscore。

## collections 相關

#### each _.each(list,iteratee)

遍歷 list 中的每個元素

```javascript=

_.each([1, 2, 3], function(el,index,obj){...});

_.each({one: 1, two: 2, three: 3}, function(el,key,obj){...});

```

#### map _.map(list,iteratee)

將 list 的每個元素，通過轉換函數(iteratee 迭代器)，生成一個與之相對應的陣列

```javascript=

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]

_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]

```
#### reduce _.reduce((list, iteratee, memo)

將 list 中的元素歸結為一個單獨的數值， memo 是 reduce 函數的初始值，會被每一次成功調用的 iteratee 函數的返回值取代。

```
_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6

_.reduce({one:1,two:22,three:8}, function(memo, num){ return memo + num; }, 0);
=> 31
```