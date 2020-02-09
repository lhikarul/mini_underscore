(function(){
    var root = this;

    var _ = function () {

    }

    root._ = _;

    var nativeKeys = Object.keys;
    var nativeIsArray = Array.isArray

    var optimizeCb = function (func,context) {
        if (context === void 0) return func;
    }

    var cb = function (value) {

        if (_.isFunction(value)) return optimizeCb(value);
    }

    var createAssigner = function(keysFunc,undefinedOnly) {
        return function(obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i=0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        }
    }

    var property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        }
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');

    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }

    // ----- Collections ----- //

    _.each = function (obj,iteratee,context) {
        iteratee = optimizeCb(iteratee,context);

        var i,length;

        if (isArrayLike(obj)) {
            for (i=0, length = obj.length; i < length; i++) {
                iteratee(obj[i],i,obj);
            }
        }else {
            var keys = _.keys(obj);
            for (i=0; i < keys.length; i++) {
                iteratee(obj[keys[i]],keys[i],obj);
            }
        }

        return obj;
    }

    _.map = function (obj,iteratee) {
        
        iteratee = cb(iteratee);
           
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            result = Array(length);

        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            result[index] = iteratee(obj[currentKey],currentKey,obj);
        }

        return result;

    }

    function createReduce(dir) {

        function iterator (obj,iteratee,memo,keys,index,length) {
            for (; index >=0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index ;
                memo = iteratee(memo,obj[currentKey],currentKey,obj);
            }
            return memo;
        }

        return function (obj,iteratee,memo,context) {
            iteratee = optimizeCb(iteratee,context);
            
            var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            index = dir > 0 ? 0 : length - 1;
            
            return iterator(obj,iteratee,memo,keys,index,length);
        }

    }

    _.reduce = createReduce(1);

    _.reduceRight = createReduce(-1);

    _.filter = function (obj,predicate,context) {
        var result = [];

        predicate = cb(predicate);

        _.each(obj,function (val) {
            if (predicate(val)) result.push(val)
        })

        return result;
    }

    _.find = function (obj,predicate,context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj,predicate,context);
        }else {
            key = _.findKey(obj,predicate,context);
        }

        if (key !== void 0 && key !== -1) return obj[key];
    }

    // ----- Arrays ----- //
    function createPredicateIndexFinder(dir) {
        return function (array,predicate,context) {
            predicate = cb(predicate,context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >=0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        }
    }
    
    var flatten = function(input,shallow,strict,startIndex) {
        var output = [], idx = 0;
        for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
            var value = input[i];
            if (isArrayLike(value) && _.isArray(value)) {
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0; len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            }else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    }

    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false);
    }

    _.findIndex = createPredicateIndexFinder(1);

    // ----- functions ----- //
    _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this,arguments);
        }
    }

    // ----- Objects ----- //
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
    };

    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];

        var keys = [];
        for (var key in obj) keys.push(key);

        return keys;
    }

    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var result = new Array(length);
  
        for (var i=0; i<length; i++) {
          result[i] = obj[keys[i]];
        }
  
        return result;
    }

    _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys =  _.keys(obj),
              length = keys.length,
              results = {},
              currentKey;
          for (var index = 0; index < length; index++) {
            currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
          }
          return results;
      };

    _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);

        for (var i=0; i<length; i++) {
            pairs[i] = [keys[i],obj[keys[i]]];
        }

        return pairs;
    }
    
    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        var length = keys.length;

        for (var i=0; i<length; i++) {
            result[obj[keys[i]]] = keys[i];
        }

        return result;
    }

    _.functions = function(obj) {
        var result = [];

        for (var key in obj) {
            if (_.isFunction(obj[key])) result.push(key);
        }
        
        return result.sort();
    }

    _.findKey = function (obj,predicate,context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for ( var i=0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    }

    _.extend = createAssigner(_.allKeys);

    _.extendOwn = createAssigner(_.keys);

    _.pick = function(object,oiteratee,context) {
        var result = {}, obj = object, iteratee, keys;

        if (obj == null) return result;

        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee,context);
        }else {
            keys = flatten(arguments, false, false, 1);
            iteratee = function(value,key,obj) {return key in obj};
            obj = Object(obj);
        }

        for (var i=0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value,key,obj)) result[key] = value;
        }

        return result;

    }

    _.defaults = createAssigner(_.allKeys,true);

    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };
    

    _.isFunction = function (obj) {
        return typeof obj === 'function'
    }

    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    _.isArray = nativeIsArray;

}.call(this));