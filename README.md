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

### array
[flatten](#flatten)</br>

### objects
[allKeys](#allKeys)</br>
[values](#values)</br>
[mapObject](#mapObject)</br>
[paris](#pairs)</br>
[invert](#invert)
[findKey](#findKey)</br>
[extend](#extend)</br>
[extendOwn](#extendOwn)</br>
[pick](#pick)</br>
[defaults](#defaults)</br>
[clone](#clone)</br>
[has](#has)</br>

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

## Array
<h4 id="flatten">_.flatten(array, [shallow])</h4>

將一個嵌套多層的數組 array（數組） (嵌套可以是任何層數)轉換為只有一層的數組。如果你傳遞 shallow參數，數組將只減少一維的嵌套。

```
_.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
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

<h4 id="values">_.values(object)</h4>

返回 object 所有的屬性值

```
_.values({one: 1, two: 2, three: 3});
=> [1, 2, 3]
```

<h4 id="mapObject">_.mapObject(object,iteratee)</h4>
類似於 map，但這只適用於物件，轉換每個屬性的值。

```
_.mapObject({start: 5, end: 12}, function(val, key) {
  return val + 5;
});
=> {start: 10, end: 17}
```

<h4 id="pairs>">_.pairs(object)</h4>
將一個物件轉變為 [key,value] 的陣列

```
_.pairs({one: 1, two: 2, three: 3});
=> [["one", 1], ["two", 2], ["three", 3]]
```

<h4 id="invert">_.invert(object)</h4>
返回一個物件，其 key/value 進行對調。

```
_.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
=> {Moses: "Moe", Louis: "Larry", Jerome: "Curly"};
```

<h4 id="functions>">_.functions(object)</h4>
返回一個物件內的所有 function 名稱，並且已經排序。

```
  var person = {
      name: 'Evans',
      age: 26,
      studying() {},
      greeting () {},
      working () {}
  }

  _.functions(person)
  => ["greeting", "studying", "working"]
```

<h4 id="findKey">_.findKey(object, predicate)</h4>

```
_.findKey({one: 1, two: 2}, function(num){ return num % 2 == 0; });
---> two
```

<h4 id="extend">_.extend(destination,sources)</h4>
複製source對像中的所有屬性覆蓋到destination對像上，並且返回 destination 對象. 複製是按順序的, 所以後面的對象屬性會把前面的對象屬性覆蓋掉(如果有重複).

```
_.extend({name: 'moe'}, {age: 50});
=> {name: 'moe', age: 50}
```

<h4 id="extendOwn">_.extendOwn(destination,source)</h4>
指複製自己的屬性至 destination 物件，原型鏈的屬性不會一併複製。

<h4 id="pick">_.pick(object,keys)</h4>

返回一個物件，只過濾 keys 指定的屬性，或接收一個函數所指定的 key。

```
_.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
=> {name: 'moe', age: 50}
_.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return _.isNumber(value);
});
=> {age: 50}
```

<h4 id="defaults">_.defaults(object,defaults)</h4>

用defaults對象填充object 中的undefined屬性。並且返回這個object。一旦這個屬性被填充，再使用defaults方法將不會有任何效果。

```
var iceCream = {flavor: "chocolate"};
_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
=> {flavor: "chocolate", sprinkles: "lots"}

```

<h4 id="clone">_.clone(object)</h4>

創建一個淺複製（淺拷貝）的 object。任何嵌套的物件或陣列都通過引用拷貝，不會復制。

```
_.clone({name: 'moe'});
=> {name: 'moe'};
```

<h4 id="has">_.has(object,key)</h4>

物件是否包含給定的 key 值。

```
_.has({a: 1, b: 2, c: 3}, "b");
=> true
```