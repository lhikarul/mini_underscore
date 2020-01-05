# underscore 1.8.3 源碼分析

## 介紹

分析 underscore 的源碼， 理解不同的 API 函式內部原理，並實作一個 mini-underscore。

## 目錄

### collections
[each](#each)</br>
[map](#map)</br>
[reduce](#reduce)</br>
[reduceRight](#reduceRight)</br>
[filter](#filter)</br>
[find](#find)</br>

### objects
[allKeys](#allKeys)</br>

## collections 相關

<h4 id="each"> each _.each(list,iteratee) </h4>

遍歷 list 中的每個元素

```javascript=

_.each([1, 2, 3], function(el,index,obj){...});

_.each({one: 1, two: 2, three: 3}, function(el,key,obj){...});

```

<h4 id="map"> map _.map(list,iteratee) </h4>

將 list 的每個元素，通過轉換函數(iteratee 迭代器)，生成一個與之相對應的陣列

```javascript=

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]

_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]

```
<h4 id="reduce"> reduce _.reduce((list, iteratee, memo)</h4>

將 list 中的元素歸結為一個單獨的數值， memo 是 reduce 函數的初始值，會被每一次成功調用的 iteratee 函數的返回值取代。

```
_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6

_.reduce({one:1,two:22,three:8}, function(memo, num){ return memo + num; }, 0);
=> 31
```

<h4 id="reduceRight">_.reduceRight(list,iteratee,memo)</h4>

遍歷 list 中的元素，從右側開始組合元素。

```
 var list = [[0, 1], [2, 3], [4, 5]];
 var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
 =>  [4, 5, 2, 3, 0, 1]

var obj = {a:[0,1],b:[2,3],c:[4,5]};
var flat = _.reduceRight(obj,function(a,b){return a.concat(b)}, []);
=>  [4, 5, 2, 3, 0, 1]
```
<h4 id="filter"> filter _.filter(list,predicate) </h4>

遍歷 list 中的每個值，通過 predicate 真值檢測，返回一個新的陣列

```
_.filter([1, 2, 3, 4, 5, 6, 7, 8, 9], function(num){ return num % 2 == 0; });
=> 2,4,6,8
```

<h4 id="find"> _.find(list,predicate) </h4>

遍歷 list 中的每個值，返回第一個通過 predicate(cb) 真值檢測的元素。

```
_.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2

_.find({one:1,two:22,three:8}, function(num){ return num % 2 == 0; });
=> 22


```

## Objects

<h4 id="allKeys">_.allKeys(object)</h4>

獲取 object 自身屬性及原型屬性

```
function Stooge(name) {
  this.name = name;
}
Stooge.prototype.silly = true;
_.allKeys(new Stooge("Moe"));
=> ["name", "silly"]

```