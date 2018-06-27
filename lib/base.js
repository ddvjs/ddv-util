var util = require('./util.js')
// 方法的字符串
var functionStr = typeof function () {}
var class2type = {}
// Populate the class2type map
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name) {
  class2type[ '[object ' + name + ']' ] = name.toLowerCase()
})
util.isArray = Array.isArray
util.isFunction = function isFunction (fn) {
  var type = typeof fn
  return Boolean(type === functionStr)
}
util.isArray = function isArray () {
  return Array.isArray.apply(this, arguments)
}
util.isPlainObject = function isPlainObject (obj) {
  // Not plain objects:
  // - Any object or value whose internal [[Class]] property is not "[object Object]"
  // - DOM nodes
  // - window
  if (util.type(obj) !== 'object' || obj.nodeType || util.isGlobal(obj)) {
    return false
  }

  if (obj.constructor &&
      !Object.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false
  }

  // If the function hasn't returned already, we're confident that
  // |obj| is a plain object, created by {} or constructed with new Object
  return true
}
util.isGlobal = function isGlobal (obj) {
  return obj !== void 0 && (obj === obj.global || obj === obj.window)
}
util.isNumber = function isNumber (obj) {
  return (typeof obj === 'string' || typeof obj === 'number') && (!util.isArray(obj) && (obj - parseFloat(obj) >= 0))
}
util.type = function type (obj, isType) {
  if (isType !== void 0) {
    return isType === util.type(obj)
  }
  if (obj === void 0 || obj === null) {
    return obj + ''
  }
  // Support: Android<4.0, iOS<6 (functionish RegExp)
  return typeof obj === 'object' || typeof obj === 'function' ? class2type[ class2type.toString.call(obj) ] || 'object' : typeof obj
}// 参数强转数组
util.argsToArray = function argsToArray (args) {
  return Array.prototype.slice.call(args)
}
util.extendInit = function extendInit () {
  var args, fn
  args = util.argsToArray(arguments || [])
  for (var i = 0; i < args.length; i++) {
    if (util.isFunction(fn = args[i])) {
      fn.call((this || util), (this || util))
    }
  }
  args = fn = void 0
}
util.extendDeep = function extendDeep () {
  var args = util.argsToArray(arguments || [])
  args.unshift(true, (this || util))
  return util.extend.apply((this || util), args)
}
util.extend = function extend () {
  var options, name, src, copy, copyIsArray, clone
  var target = arguments[ 0 ] || {}
  var i = 1
  var length = arguments.length
  var deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // Skip the boolean and the target
    target = arguments[ i ] || {}
    i++
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !util.isFunction(target)) {
    target = {}
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    options = arguments[ i ]
    if (options !== void 0 && options !== null) {
      // Extend the base object
      for (name in options) {
        src = target[ name ]
        copy = options[ name ]

        // Prevent never-ending loop
        if (target === copy) {
          continue
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (util.isPlainObject(copy) ||
                    (copyIsArray = util.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && util.isArray(src) ? src : []
          } else {
            clone = src && util.isPlainObject(src) ? src : Object.create(null)
          }

          // Never move original objects, clone them
          target[ name ] = util.extend(deep, clone, copy)

        // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[ name ] = copy
        }
      }
    }
  }

  // Return the modified object
  return target
}
