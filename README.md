# ddv-util

> 这是一个工具类库，可以作为 [vue](https://github.com/vuejs/vue) 过滤器使用

---

## 安装
---
**npm**

```shell
$ npm install ddv-util - S
```

## 使用
---
```javascript
import util from 'ddv-util';
```

你也可以把 `ddv-util` 映射到全局变量当中

```javascript
//把util映射到全局变量d中
util.globalInit('d', null, true);
```

### API ###

`ddv-util` 默认拥有的api:

>* isFunction
>* 用途：判断是否是 `function` 类型

```javascript
var p = function(){};

util.isFunction(p);
==>true
```

>* isArray
>* 用途：判断是否是一个数组

```javascript
var p = [];

util.isArray(p);
==>true
```

>* isGlobal
>* 用途：判断是否是全局变量

```javascript
window.p = {};
util.isGlobal(p);
==>true
```

>* isNumber
>* 用途：判断是否是 `number` 类型

```javascript
var p = 1;
util.isNumber(p);
==>true
```

>* type
>* 用途：判断是类型

```javascript
var p = {};
util.type(p,'object');
==>true
```

>* argsToArray
>* 用途：把伪数组强转数组

```javascript
var p = {0:'a',1:'b',length:2};;
util.argsToArray(p);
==>['a','b']
```

`ddv-util` 内置 `time` 时间处理模块，详细使用方式请参PHP对应的方法:[time](http://www.php.net/manual/en/function.time.php), [date](http://www.php.net/manual/en/function.date.php), [gmdate](http://www.php.net/manual/en/function.gmdate.php),[strtotime](http://www.php.net/manual/en/function.strtotime.php)

```javascript
//引入'ddv-util'
import util from 'ddv-util';
//引入时间处理api模块
import utilTime from 'ddv-util/time';
//安装到'ddv-util'
util.extendInit(utilTime);

//获取当前开始
util.now();

//获取php的时间戳
util.time();

//时间戳格式,格式化后是格林时间
util.gmdate(format,timestamp);
util.date(format,timestamp);
util.strtotime(text, now);

```

## 注册过滤器
---
`ddv-util` 支持注册过滤器，可使用扩展或安装的方式

#### 扩展
`extend`

```javascript
//helper.js
export default{
    add(val){
        return val+1;
    }
}

//use.js
import util from 'ddv-util'
import helper from './helper.js'
//在util下扩展helper
util.extend({
    helper
})

util.helper.add(1);
=>2
```

#### 安装

`extendInit`

```javascript
//helper.js
module.exports = function(util){
    util.extendDeep({
        add(val){
            return val+1;
        }
    })
}

//use.js
import util from 'ddv-util'
import helper from './helper.js'
//在util下安装helper
util.extendInit(helper);

util.add(1);
=>2
```

## 关于使用vue在 mustache 使用 ddv-util 过滤器

> 在mustache下使用过滤器语法基本和 [Vue-filter](https://cn.vuejs.org/v2/guide/syntax.html#过滤器) 相同

---

```html
<template>
    <div>
    <!--1参数代表time以第二个参数传进date里面，'Y-d-m'则为第一个。默认不填是第一个，如此类推-->
    {{time | util('date,1','Y-d-m') }}
    </div>
</template>
```

```javascript
import Vue from 'vue';
import util from 'ddv-util';
import utilTime from 'ddv-util/time';
util.extendInit(utilTime);

Vue.filter('util',util);

export default {
    data(){
        return{
            time : '1484379264'
        }
    }
}
```
