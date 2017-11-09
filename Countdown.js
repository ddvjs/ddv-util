module.exports = Countdown

/* *
 * 定义倒计时Countdown类
 * @param timeLeft         默认传入0
 * @param intervalCallback 每一秒要执行的回调函数，可传数组
 * @param endCallback      倒计时结束后，执行的回调函数，可传数组
 * */
function Countdown (timeLeft, intervalCallback, endCallback) {
  if (this instanceof Countdown) {
    this.constructor(timeLeft, intervalCallback, endCallback)
  } else {
    return new Countdown(timeLeft, intervalCallback, endCallback)
  }
}

/* *
 * 重写原型
 * */
Countdown.prototype = {
  constructor: function constructor (timeLeft, intervalCallback, endCallback) {
    this.timers = []
    this.timeLeft = 0
    this.startTime = new Date()
    this.endTime = new Date()
    this.setTimeLeft(timeLeft || 0)
    this.setIntervalCallback(intervalCallback)
    this.setEndCallback(endCallback)
    timeLeft && timeLeft > 0 && this.run()
  },
  /**
   * 设置剩余时间
   * */
  setTimeLeft: function setTimeLeft (timeLeft) {
    this.startTime = new Date()
    this.endTime = new Date(this.startTime.getTime() + (timeLeft * 1000))
  },
  /**
   * 生成倒计时数组，将每一秒要执行的回调函数push进该数组
   * */
  setIntervalCallback: function setIntervalCallback (fn) {
    if (!Array.isArray(this.intervalCallbacks)) {
      this.intervalCallbacks = []
    }
    this.intervalCallbacks.push(fn)
  },
  /**
   * 生成倒计时结束数组，将倒计时结束的回调函数push进该数组
   * */
  setEndCallback: function setEndCallback (fn) {
    if (!Array.isArray(this.endCallback)) {
      this.endCallback = []
    }
    this.endCallback.push(fn)
  },
  checkTime: function checkTime () {
    // 计算剩余时间
    var timeLeft = (this.endTime - new Date()) / 1000
    // 判断是否结束
    var isEnd = timeLeft <= 0
    // 清除定时器
    isEnd && this.clearTimeRun()
    // 每秒回调
    Array.isArray(this.intervalCallbacks) && this.intervalCallbacks.forEach(function (fn) {
      typeof fn === 'function' && fn.call(this, timeLeft, isEnd, this)
    }.bind(this))
    // 结束回调
    isEnd && Array.isArray(this.endCallback) && this.endCallback.forEach(function (fn) {
      typeof fn === 'function' && fn.call(this, this)
    }.bind(this))
  },
  isEnd: function isEnd () {
    // 判断是否结束
    return (this.endTime - new Date()) <= 0
  },
  clearTime: function clearTime () {
    // 清除定时器
    this.clearTimeRun()
    // 检测时间
    this.checkTime()
  },
  clearTimeRun: function clearTimeRun () {
    // 归零时间
    this.endTime = new Date()
    // 清理所有定时器
    this.clearIntervals()
  },
  clearIntervals: function clearIntervals () {
    // 清理定时器
    Array.isArray(this.timers) && this.timers.forEach(function (timer) {
      clearInterval(timer)
    })
  },
  run: function run () {
    // 清理所有定时器
    this.clearIntervals()
    // 加入定时器
    this.timers.push(setInterval(this.checkTime.bind(this), 1000))
    this.timers.push(setInterval(this.checkTime.bind(this), 900))
  }
}
