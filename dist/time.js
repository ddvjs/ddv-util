/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function timeExports(util) {
		util.extendDeep({
			//获取当前时间开始
			now: function now() {
				return new Date().getTime();
			},
	
			//获取php的时间戳
			time: function time() {
				return parseInt(util.now() / 1000);
			},
	
	
			/**
	   * [gmdate 和PHP一样的时间戳格式化函数 格式化后是格林时间]
	   * @author: 桦 <yuchonghua@163.com>
	   * @DateTime 2016-04-29T11:42:09+0800
	   * @param    {string}              format    [格式格式时间]
	   * @param    {int}                 timestamp [要格式化的时间 默认为当前时间]
	   * @return   {string}                        [格式化的时间字符串]
	   */
			gmdate: function gmdate(format, timestamp) {
				timestamp = timestamp === undefined ? util.time() : timestamp;
				timestamp = parseInt(timestamp) + 60 * new Date().getTimezoneOffset();
				return util.date(format, timestamp);
			},
	
			/**
	   * [date 和PHP一样的时间戳格式化函数 格式化后是本地时间]
	   * @author: 桦 <yuchonghua@163.com>
	   * @DateTime 2016-04-29T11:42:09+0800
	   * @param    {string}              format    [本地格式时间]
	   * @param    {int}                 timestamp [要格式化的时间 默认为当前时间]
	   * @return   {string}                        [格式化的时间字符串]
	   */
			date: function (_date) {
				function date(_x, _x2) {
					return _date.apply(this, arguments);
				}
	
				date.toString = function () {
					return _date.toString();
				};
	
				return date;
			}(function (format, timestamp) {
				var a,
				    jsdate = timestamp ? new Date(timestamp * 1000) : new Date();
				var pad = function pad(n, c) {
					if ((n = n + "").length < c) {
						return new Array(++c - n.length).join("0") + n;
					} else {
						return n;
					}
				};
				var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
				var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
	
				var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
				var f = {
					// Day
					d: function d() {
						return pad(f.j(), 2);
					},
					D: function D() {
						t = f.l();return t.substr(0, 3);
					},
					j: function j() {
						return jsdate.getDate();
					},
					l: function l() {
						return txt_weekdays[f.w()];
					},
					N: function N() {
						return f.w() + 1;
					},
					S: function S() {
						return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
					},
					w: function w() {
						return jsdate.getDay();
					},
					z: function z() {
						return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
					},
	
					// Week
					W: function W() {
						var a = f.z(),
						    b = 364 + f.L() - a;
						var nd2,
						    nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
	
						if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
							return 1;
						} else {
	
							if (a <= 2 && nd >= 4 && a >= 6 - nd) {
								nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
								return date("W", Math.round(nd2.getTime() / 1000));
							} else {
								return 1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7) >> 0;
							}
						}
					},
	
					// Month
					F: function F() {
						return txt_months[f.n()];
					},
					m: function m() {
						return pad(f.n(), 2);
					},
					M: function M() {
						t = f.F();return t.substr(0, 3);
					},
					n: function n() {
						return jsdate.getMonth() + 1;
					},
					t: function t() {
						var n;
						if ((n = jsdate.getMonth() + 1) == 2) {
							return 28 + f.L();
						} else {
							if (n & 1 && n < 8 || !(n & 1) && n > 7) {
								return 31;
							} else {
								return 30;
							}
						}
					},
	
					// Year
					L: function L() {
						var y = f.Y();
						return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
					},
					//o not supported yet
					Y: function Y() {
						return jsdate.getFullYear();
					},
					y: function y() {
						return (jsdate.getFullYear() + "").slice(2);
					},
	
					// Time
					a: function a() {
						return jsdate.getHours() > 11 ? "pm" : "am";
					},
					A: function A() {
						return f.a().toUpperCase();
					},
					B: function B() {
						// peter paul koch:
						var off = (jsdate.getTimezoneOffset() + 60) * 60;
						var theSeconds = jsdate.getHours() * 3600 + jsdate.getMinutes() * 60 + jsdate.getSeconds() + off;
						var beat = Math.floor(theSeconds / 86.4);
						if (beat > 1000) beat -= 1000;
						if (beat < 0) beat += 1000;
						if (String(beat).length == 1) beat = "00" + beat;
						if (String(beat).length == 2) beat = "0" + beat;
						return beat;
					},
					g: function g() {
						return jsdate.getHours() % 12 || 12;
					},
					G: function G() {
						return jsdate.getHours();
					},
					h: function h() {
						return pad(f.g(), 2);
					},
					H: function H() {
						return pad(jsdate.getHours(), 2);
					},
					i: function i() {
						return pad(jsdate.getMinutes(), 2);
					},
					s: function s() {
						return pad(jsdate.getSeconds(), 2);
					},
					//u not supported yet
	
					// Timezone
					//e not supported yet
					//I not supported yet
					O: function O() {
						var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
						if (jsdate.getTimezoneOffset() > 0) t = "-" + t;else t = "+" + t;
						return t;
					},
					P: function P() {
						var O = f.O();
						return O.substr(0, 3) + ":" + O.substr(3, 2);
					},
					//T not supported yet
					//Z not supported yet
	
					// Full Date/Time
					c: function c() {
						return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
					},
					//r not supported yet
					U: function U() {
						return Math.round(jsdate.getTime() / 1000);
					}
				};
	
				return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
					var ret;
					if (t != s) {
						// escaped
						ret = s;
					} else if (f[s]) {
						// a date function exists
						ret = f[s]();
					} else {
						// nothing special
						ret = s;
					}
					return ret;
				});
			})
		});
		util.extendInit(__webpack_require__(1));
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function timeExports(util) {
		util.extendDeep({
			strtotime: function strtotime(text, now) {
				//  discuss at: http://locutus.io/php/strtotime/
				// original by: Caio Ariede (http://caioariede.com)
				// improved by: Kevin van Zonneveld (http://kvz.io)
				// improved by: Caio Ariede (http://caioariede.com)
				// improved by: A. Matías Quezada (http://amatiasq.com)
				// improved by: preuter
				// improved by: Brett Zamir (http://brett-zamir.me)
				// improved by: Mirko Faber
				//    input by: David
				// bugfixed by: Wagner B. Soares
				// bugfixed by: Artur Tchernychev
				// bugfixed by: Stephan Bösch-Plepelits (http://github.com/plepe)
				//      note 1: Examples all have a fixed timestamp to prevent
				//      note 1: tests to fail because of variable time(zones)
				//   example 1: strtotime('+1 day', 1129633200)
				//   returns 1: 1129719600
				//   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200)
				//   returns 2: 1130425202
				//   example 3: strtotime('last month', 1129633200)
				//   returns 3: 1127041200
				//   example 4: strtotime('2009-05-04 08:30:00 GMT')
				//   returns 4: 1241425800
				//   example 5: strtotime('2009-05-04 08:30:00+00')
				//   returns 5: 1241425800
				//   example 6: strtotime('2009-05-04 08:30:00+02:00')
				//   returns 6: 1241418600
				//   example 7: strtotime('2009-05-04T08:30:00Z')
				//   returns 7: 1241425800
	
				var parsed;
				var match;
				var today;
				var year;
				var date;
				var days;
				var ranges;
				var len;
				var times;
				var regex;
				var i;
				var fail = false;
	
				if (!text) {
					return fail;
				}
	
				// Unecessary spaces
				text = text.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ').replace(/[\t\r\n]/g, '').toLowerCase();
	
				// in contrast to php, js Date.parse function interprets:
				// dates given as yyyy-mm-dd as in timezone: UTC,
				// dates with "." or "-" as MDY instead of DMY
				// dates with two-digit years differently
				// etc...etc...
				// ...therefore we manually parse lots of common date formats
				var pattern = new RegExp(['^(\\d{1,4})', '([\\-\\.\\/:])', '(\\d{1,2})', '([\\-\\.\\/:])', '(\\d{1,4})', '(?:\\s(\\d{1,2}):(\\d{2})?:?(\\d{2})?)?', '(?:\\s([A-Z]+)?)?$'].join(''));
				match = text.match(pattern);
	
				if (match && match[2] === match[4]) {
					if (match[1] > 1901) {
						switch (match[2]) {
							case '-':
								// YYYY-M-D
								if (match[3] > 12 || match[5] > 31) {
									return fail;
								}
	
								return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
							case '.':
								// YYYY.M.D is not parsed by strtotime()
								return fail;
							case '/':
								// YYYY/M/D
								if (match[3] > 12 || match[5] > 31) {
									return fail;
								}
	
								return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
						}
					} else if (match[5] > 1901) {
						switch (match[2]) {
							case '-':
								// D-M-YYYY
								if (match[3] > 12 || match[1] > 31) {
									return fail;
								}
	
								return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
							case '.':
								// D.M.YYYY
								if (match[3] > 12 || match[1] > 31) {
									return fail;
								}
	
								return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
							case '/':
								// M/D/YYYY
								if (match[1] > 12 || match[3] > 31) {
									return fail;
								}
	
								return new Date(match[5], parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
						}
					} else {
						switch (match[2]) {
							case '-':
								// YY-M-D
								if (match[3] > 12 || match[5] > 31 || match[1] < 70 && match[1] > 38) {
									return fail;
								}
	
								year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
								return new Date(year, parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
							case '.':
								// D.M.YY or H.MM.SS
								if (match[5] >= 70) {
									// D.M.YY
									if (match[3] > 12 || match[1] > 31) {
										return fail;
									}
	
									return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
								}
								if (match[5] < 60 && !match[6]) {
									// H.MM.SS
									if (match[1] > 23 || match[3] > 59) {
										return fail;
									}
	
									today = new Date();
									return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
								}
	
								// invalid format, cannot be parsed
								return fail;
							case '/':
								// M/D/YY
								if (match[1] > 12 || match[3] > 31 || match[5] < 70 && match[5] > 38) {
									return fail;
								}
	
								year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
								return new Date(year, parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
							case ':':
								// HH:MM:SS
								if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
									return fail;
								}
	
								today = new Date();
								return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
						}
					}
				}
	
				// other formats and "now" should be parsed by Date.parse()
				if (text === 'now') {
					return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
				}
				if (!isNaN(parsed = Date.parse(text))) {
					return parsed / 1000 | 0;
				}
				// Browsers !== Chrome have problems parsing ISO 8601 date strings, as they do
				// not accept lower case characters, space, or shortened time zones.
				// Therefore, fix these problems and try again.
				// Examples:
				//   2015-04-15 20:33:59+02
				//   2015-04-15 20:33:59z
				//   2015-04-15t20:33:59+02:00
				pattern = new RegExp(['^([0-9]{4}-[0-9]{2}-[0-9]{2})', '[ t]', '([0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?)', '([\\+-][0-9]{2}(:[0-9]{2})?|z)'].join(''));
				match = text.match(pattern);
				if (match) {
					// @todo: time zone information
					if (match[4] === 'z') {
						match[4] = 'Z';
					} else if (match[4].match(/^([\+-][0-9]{2})$/)) {
						match[4] = match[4] + ':00';
					}
	
					if (!isNaN(parsed = Date.parse(match[1] + 'T' + match[2] + match[4]))) {
						return parsed / 1000 | 0;
					}
				}
	
				date = now ? new Date(now * 1000) : new Date();
				days = {
					'sun': 0,
					'mon': 1,
					'tue': 2,
					'wed': 3,
					'thu': 4,
					'fri': 5,
					'sat': 6
				};
				ranges = {
					'yea': 'FullYear',
					'mon': 'Month',
					'day': 'Date',
					'hou': 'Hours',
					'min': 'Minutes',
					'sec': 'Seconds'
				};
	
				function lastNext(type, range, modifier) {
					var diff;
					var day = days[range];
	
					if (typeof day !== 'undefined') {
						diff = day - date.getDay();
	
						if (diff === 0) {
							diff = 7 * modifier;
						} else if (diff > 0 && type === 'last') {
							diff -= 7;
						} else if (diff < 0 && type === 'next') {
							diff += 7;
						}
	
						date.setDate(date.getDate() + diff);
					}
				}
	
				function process(val) {
					// @todo: Reconcile this with regex using \s, taking into account
					// browser issues with split and regexes
					var splt = val.split(' ');
					var type = splt[0];
					var range = splt[1].substring(0, 3);
					var typeIsNumber = /\d+/.test(type);
					var ago = splt[2] === 'ago';
					var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);
	
					if (typeIsNumber) {
						num *= parseInt(type, 10);
					}
	
					if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
						return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
					}
	
					if (range === 'wee') {
						return date.setDate(date.getDate() + num * 7);
					}
	
					if (type === 'next' || type === 'last') {
						lastNext(type, range, num);
					} else if (!typeIsNumber) {
						return false;
					}
	
					return true;
				}
	
				times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' + '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' + '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
				regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';
	
				match = text.match(new RegExp(regex, 'gi'));
				if (!match) {
					return fail;
				}
	
				for (i = 0, len = match.length; i < len; i++) {
					if (!process(match[i])) {
						return fail;
					}
				}
	
				return date.getTime() / 1000;
			}
		});
	};

/***/ }
/******/ ]);
//# sourceMappingURL=time.js.map