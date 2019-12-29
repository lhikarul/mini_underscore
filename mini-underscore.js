(function(){
    var root = this;

    var _ = function () {

    }

    root._ = _;

    var nativeKeys = Object.keys;

    var optimizeCb = function (func,context) {
        if (context === void 0) return func;
    }

    var cb = function (value) {

        if (_.isFunction(value)) return optimizeCb(value);
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

    // ----------------------------------------------- //
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
    };

    _.isFunction = function (obj) {
        return typeof obj === 'function'
    }

    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

}.call(this));