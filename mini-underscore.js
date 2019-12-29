(function(){
    var root = this;

    var _ = function () {

    }

    root._ = _;

    var nativeKeys = Object.keys;

    var optimizeCb = function (func) {
        return func;
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

    // ----------------------------------------------- //

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