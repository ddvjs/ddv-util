var util = module.exports = DdvUtil

function DdvUtil (firstArg, fnCmd) {
  if (this instanceof util) {
    return util.constructor.apply((this || util), arguments)
  } else {
    return util.vueFilter.apply((this || util), arguments)
  }
}
util.prototype = util
util.vueFilterErrorNotFnTip = 'Not a method'
util.vueFilterErrorTip = 'Must be an object or a method or method name for a string'
util.constructor = function constructor (fn) {
  if (util.isFunction(fn)) {
    fn.call((this || util), (this || util))
  }
}
util.vueFilter = function vueFilter (firstArg, fnCmd) {
  var t
  var fnNameArray = []
  var fn = null
  var fnName = ''
  // 传参到第几个
  var argNum = 0
  // 上下文
  var obj = util
  // 上下文
  var content = null
  var args = util.argsToArray(arguments || []).slice(2)
  firstArg = firstArg || void 0
  fnCmd = fnCmd || void 0

  // 如果是字符串
  if (typeof fnCmd === 'string') {
    if (fnCmd.indexOf(',') > -1) {
      fnCmd = fnCmd.split(',')
    } else if (fnCmd.indexOf(' ') > -1) {
      fnCmd = fnCmd.split(' ')
    } else {
      fnCmd = [fnCmd]
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
    }
    if ((!util.isNumber(t.argNum)) && (typeof t.argNum === 'object') && (!t.content)) {
      t.content = t.argNum
      t.argNum = void 0
    }
    if (util.isNumber(t.obj) && (!t.argNum)) {
      t.argNum = t.obj
      t.obj = void 0
    }
    // 赋值回来
    fnCmd = t
    t = void 0
  }
  if (typeof fnCmd === 'object') {
    // 上下文
    content = fnCmd.content || content
    // 传参到第几个
    argNum = fnCmd.argNum || argNum || 0
    // 方法名字
    fnName = fnCmd.fn || fn || void 0

    if (util.isFunction(fnName)) {
      fn = fnName
    } else if (typeof (fnName) === 'string') {
      // 调用查找的对象
      obj = fnCmd.obj || obj || this
      fnNameArray = fnName.split('.') || [fnName]
      t = []
      // 遍历复制
      fnNameArray.forEach(function (v) {
        if (v) {
          // 排除空的
          t[t.length] = v
        }
      })
      // 覆盖回去
      fnNameArray = t
      // 试图通过这个对象获取这个方法
      t = util._vueFilterGet([obj, util, this], fnNameArray)
      if (t) {
        fn = t.fn
        content = content || t.content
        args.splice(argNum, 0, firstArg)
        t = void 0
        // 运行
        return fn.apply(content, args)
      } else {
        fnName = fnName || (fnCmd && fnCmd.fn) || fnCmd || ''
        /* eslint-disable no-new-wrappers */
        fnName = ((fnName.toString && fnName.toString()) || (new String(fnName).toString()))
        throw new Error(util.vueFilterErrorNotFnTip + ': ' + fnName)
      }
    } else {
      fnName = fnName || (fnCmd && fnCmd.fn) || fnCmd || ''
      /* eslint-disable no-new-wrappers */
      fnName = ((fnName.toString && fnName.toString()) || (new String(fnName).toString()))
      throw new Error(util.vueFilterErrorNotFnTip + ': ' + fnName)
    }
  } else {
    throw new Error(util.vueFilterErrorTip)
  }
  return ''
}
util._vueFilterGet = function (objs, names) {
  var t, i, len, obj, _this
  if (names && names.length < 1) {
    return void 0
  }
  // 循环调用对象
  if (util.isArray(objs)) {
    len = objs.length || 0
    for (i = 0; i < len; i++) {
      obj = objs[i]
      if (obj && obj[names[0]]) {
        t = util._vueFilterGet(obj, names)
        if (t) {
          i = len = obj = objs = names = void 0
          return t
        }
      } else {
        continue
      }
    }
  } else {
    _this = obj = objs
    len = names.length || 0
    for (i = 0; i < len; i++) {
      _this = i === 0 ? _this : t
      t = _this[names[i]]
      if (!t) {
        return void 0
      }
    }
    if (util.isFunction(t)) {
      return {
        fn: t,
        content: _this
      }
    } else {
      return void 0
    }
  }
}
util.globalInit = function (name, content) {
  if (!content) {
    if (typeof global !== 'undefined' && global && global.global === global) {
      content = global
    } else if (typeof window !== 'undefined' && window && window.window === window) {
      content = window
    } else {
      throw new Error('Global variable global or window not found')
    }
  }
  name = name || 'd'
  content[name] = this || util
}
require('./base')
