/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = module.exports = DdvUtil;

function DdvUtil(firstArg, fnCmd) {
  if (this instanceof util) {
    return util.constructor.apply(this || util, arguments);
  } else {
    return util.vueFilter.apply(this || util, arguments);
  }
}
util.prototype = util;
util.vueFilterErrorNotFnTip = 'Not a method';
util.vueFilterErrorTip = 'Must be an object or a method or method name for a string';
util.constructor = function constructor(fn) {
  if (util.isFunction(fn)) {
    fn.call(this || util, this || util);
  }
};
util.vueFilter = function vueFilter(firstArg, fnCmd) {
  var t;
  var fnNameArray = [];
  var fn = null;
  var fnName = '';
  // 传参到第几个
  var argNum = 0;
  // 上下文
  var obj = util;
  // 上下文
  var content = null;
  var args = util.argsToArray(arguments || []).slice(2);
  firstArg = firstArg || void 0;
  fnCmd = fnCmd || void 0;

  // 如果是字符串
  if (typeof fnCmd === 'string') {
    if (fnCmd.indexOf(',') > -1) {
      fnCmd = fnCmd.split(',');
    } else if (fnCmd.indexOf(' ') > -1) {
      fnCmd = fnCmd.split(' ');
    } else {
      fnCmd = [fnCmd];
    }
  }
  if (util.isArray(fnCmd)) {
    // 对象转换数组
    // 第一个参数是方法名
    // 第二个参数是对象
    // 第三个参数是传参数
    // 第四个参数是上下文
    t = {
      fn: fnCmd[0],
      obj: fnCmd[1],
      argNum: fnCmd[2],
      content: fnCmd[3]
    };
    if (!util.isNumber(t.argNum) && _typeof(t.argNum) === 'object' && !t.content) {
      t.content = t.argNum;
      t.argNum = void 0;
    }
    if (util.isNumber(t.obj) && !t.argNum) {
      t.argNum = t.obj;
      t.obj = void 0;
    }
    // 赋值回来
    fnCmd = t;
    t = void 0;
  }
  if ((typeof fnCmd === 'undefined' ? 'undefined' : _typeof(fnCmd)) === 'object') {
    // 上下文
    content = fnCmd.content || content;
    // 传参到第几个
    argNum = fnCmd.argNum || argNum || 0;
    // 方法名字
    fnName = fnCmd.fn || fn || void 0;

    if (util.isFunction(fnName)) {
      fn = fnName;
    } else if (typeof fnName === 'string') {
      // 调用查找的对象
      obj = fnCmd.obj || obj || this;
      fnNameArray = fnName.split('.') || [fnName];
      t = [];
      // 遍历复制
      fnNameArray.forEach(function (v) {
        if (v) {
          // 排除空的
          t[t.length] = v;
        }
      });
      // 覆盖回去
      fnNameArray = t;
      // 试图通过这个对象获取这个方法
      t = util._vueFilterGet([obj, util, this], fnNameArray);
      if (t) {
        fn = t.fn;
        content = content || t.content;
        args.splice(argNum, 0, firstArg);
        t = void 0;
        // 运行
        return fn.apply(content, args);
      } else {
        fnName = fnName || fnCmd && fnCmd.fn || fnCmd || '';
        /* eslint-disable no-new-wrappers */
        fnName = fnName.toString && fnName.toString() || new String(fnName).toString();
        throw new Error(util.vueFilterErrorNotFnTip + ': ' + fnName);
      }
    } else {
      fnName = fnName || fnCmd && fnCmd.fn || fnCmd || '';
      /* eslint-disable no-new-wrappers */
      fnName = fnName.toString && fnName.toString() || new String(fnName).toString();
      throw new Error(util.vueFilterErrorNotFnTip + ': ' + fnName);
    }
  } else {
    throw new Error(util.vueFilterErrorTip);
  }
  return '';
};
util._vueFilterGet = function (objs, names) {
  var t, i, len, obj, _this;
  if (names && names.length < 1) {
    return void 0;
  }
  // 循环调用对象
  if (util.isArray(objs)) {
    len = objs.length || 0;
    for (i = 0; i < len; i++) {
      obj = objs[i];
      if (obj && obj[names[0]]) {
        t = util._vueFilterGet(obj, names);
        if (t) {
          i = len = obj = objs = names = void 0;
          return t;
        }
      } else {
        continue;
      }
    }
  } else {
    _this = obj = objs;
    len = names.length || 0;
    for (i = 0; i < len; i++) {
      _this = i === 0 ? _this : t;
      t = _this[names[i]];
      if (!t) {
        return void 0;
      }
    }
    if (util.isFunction(t)) {
      return {
        fn: t,
        content: _this
      };
    } else {
      return void 0;
    }
  }
};
util.globalInit = function (name, content) {
  if (!content) {
    if (typeof global !== 'undefined' && global && global.global === global) {
      content = global;
    } else if (typeof window !== 'undefined' && window && window.window === window) {
      content = window;
    } else {
      throw new Error('Global variable global or window not found');
    }
  }
  name = name || 'd';
  content[name] = this || util;
};
__webpack_require__(2);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = __webpack_require__(0);
// 方法的字符串
var functionStr = _typeof(function () {});
var class2type = {};
// Populate the class2type map
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});
util.isArray = Array.isArray;
util.isFunction = function isFunction(fn) {
  var type = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);
  return Boolean(type === functionStr);
};
util.isArray = function isArray() {
  return Array.isArray.apply(this, arguments);
};
util.isPlainObject = function isPlainObject(obj) {
  // Not plain objects:
  // - Any object or value whose internal [[Class]] property is not "[object Object]"
  // - DOM nodes
  // - window
  if (util.type(obj) !== 'object' || obj.nodeType || util.isGlobal(obj)) {
    return false;
  }

  if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }

  // If the function hasn't returned already, we're confident that
  // |obj| is a plain object, created by {} or constructed with new Object
  return true;
};
util.isGlobal = function isGlobal(obj) {
  return obj !== void 0 && (obj === obj.global || obj === obj.window);
};
util.isNumber = function isNumber(obj) {
  return (typeof obj === 'string' || typeof obj === 'number') && !util.isArray(obj) && obj - parseFloat(obj) >= 0;
};
util.type = function type(obj, isType) {
  if (isType !== void 0) {
    return isType === util.type(obj);
  }
  if (obj === void 0 || obj === null) {
    return obj + '';
  }
  // Support: Android<4.0, iOS<6 (functionish RegExp)
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function' ? class2type[class2type.toString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
}; // 参数强转数组
util.argsToArray = function argsToArray(args) {
  return Array.prototype.slice.call(args);
};
util.extendInit = function extendInit() {
  var args, fn;
  args = util.argsToArray(arguments || []);
  for (var i = 0; i < args.length; i++) {
    if (util.isFunction(fn = args[i])) {
      fn.call(this || util, this || util);
    }
  }
  args = fn = void 0;
};
util.extendDeep = function extendDeep() {
  var args = util.argsToArray(arguments || []);
  args.unshift(true, this || util);
  return util.extend.apply(this || util, args);
};
util.extend = function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !util.isFunction(target)) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    options = arguments[i];
    if (options !== void 0 && options !== null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (util.isPlainObject(copy) || (copyIsArray = util.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && util.isArray(src) ? src : [];
          } else {
            clone = src && util.isPlainObject(src) ? src : Object.create(null);
          }

          // Never move original objects, clone them
          target[name] = util.extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0);

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=util.js.map