(()=>{
	//初始化
	let root = typeof self == 'object' && self.self === self && self ||
		typeof global == 'object' && global.global === global && global ||
		this;
	root.SG = {};
	root.SG['hostEnv'] = root.alert ? 'browser' : 'node';
	root.SG._bind = function(eventName,event){
		this[eventName] = function(mothed,argArr){
			if(!mothed){
				return new Error('The Name Of Event Cannot Be Null');
			}
			for(let attr in event){
				if(event.hasOwnProperty(attr) && attr.indexOf(mothed)>-1){
					if(!argArr) argArr = [];
					return event[attr](argArr);
				}
			}
			return new Error('No Such Function '+ mothed +' !!');
		}
	}
})();

/**************************事件*****************************/
//包括object、string、array、random

(() => {
	let _object = {};
	/**
	*描述：判断对象是否存在
	*@param		{Null,Undefined}	obj 	待检测对象
	*@return	{Boolean}
	*/
	_object.isNull = function(argArr) {
		let obj = argArr[0];
		if(Object.is(undefined,obj) || Object.is(null,obj))
			return true;
		return false;
	}
	/**
	*描述：获取数据类型
	*@param 	{}	obj	待检测数据
	*@return 	{Null、Undefined、String、Number、Array、Object}
	*/
	_object.getType = function(argArr) {
		let obj = argArr[0];
		return Object.prototype.toString.call(obj).slice(8,-1);
	}
	/**
	*描述：获取数据类型
	*@param		{}	obj	待检测数据
	*@return	{Null、Undefined、String、Number、Array、Object}
	*/
	_object.getType2 = function(argArr){
		let obj = argArr[0];
		if(Object.is(undefined,obj)){
			return 'Undefined';
		}else if(Object.is(null,obj)){
			return 'Null';
		}else{
			return obj.constructor.name;
		}
	}
	/**
	*描述：判断对象是否为空
	*@param 	{Null,Undefined}	obj 	待检测对象
	*@return 	{Boolean}
	*/
	_object.isEmpty = function(argArr){
		let obj = argArr[0];
		if(!Object.is('Object',this.getType([obj])))
			return new Error('Parameters Must Be Object!!');
		return !Object.keys(obj).length;
	}
	/**
	*描述：判断string
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isString = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'string' ? true:false;
	}
	/**
	*描述：判断number
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isNumber = function(argArr){
		let obj = argArr[0];
		return Number.isSafeInteger(obj) ? true:false;
	}
	/**
	*描述：判断NaN
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isNaN = function(argArr){
		let obj = argArr[0];
		return Number.isNaN(obj) ? true:false;
	}
	/**
	*描述：判断Boolean
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isBoolean = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'boolean' ? true:false;
	}
	/**
	*描述：判断array
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isArray = function(argArr){
		let obj = argArr[0];		
		return Array.isArray(obj) ? true:false;
	}
	/**
	*描述：判断object
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isObject = function(argArr){
		let obj = argArr[0];	
		if(obj){
			return obj.constructor.name == 'Object' ? true:false;
		}else{
			//null,undefined不能使用constructor;为''返回false
			return false;
		}
	}
	/**
	*描述：判断Symbol
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isSymbol = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'symbol' ? true:false;
	}
	/**
	*描述：深拷贝
	*@param 	{Object}	obj 	待检测对象
	*@return 	{Object}
	*/
	_object.deepClone = function(argArr){
		let obj = argArr[0],copy;
		if(this.isNull(argArr) || !Object.is('object',typeof obj))
			return obj;
		if(obj instanceof Date){
			copy = new Date();
			copy.setTime(obj.getTime());
		}else if(obj instanceof Array){
			copy = [];
			for(let ele of obj){
				copy.push(ele)
			}
		}else if(obj instanceof Object){
			copy = {};
			for(let attr in obj){
				if(obj.hasOwnProperty(attr)){
					copy[attr] = this.deepClone(obj[attr]);
				}
			}
		}else{
			throw new Error('Unable to copy this values! Its type is\'not supported.');
		}
		return copy;
	}
	/**
	*描述：object事件定义
	*/
	SG._bind('object',_object);
})();

(() => {
	let _string = {};
	/**
	*描述：去除字符串中的空格，默认替换字符串中的所有空格
	*@param	{String}	str		待处理字符串
	*@param {String}	type 	l：字符串左侧；r：字符串右侧；lr：左侧和右侧
	*@return 处理后的字符串
	*/
	_string.trim = function(argArr){
		if(!SG.object('isString',argArr)){
			return new Error('Parameters Must Be String!!');
		}
		let str = argArr[0],type = argArr[1];
		let reg = /[\s]*/g;	//字符串中的任意空格
		if('l' == type){	//字符串左侧
			reg = /^[\s]*/g;
		}else if('r' == type){	//字符串右侧
			reg = /[\s]*$/g;
		}else if('lr' == type){	//左侧和右侧
			reg = /^[\s]* | [\s]*$/g;
		}
		return str.replace(reg,'');
	}
	
	/**
	*描述：字符串比较
	*@param {String}	str1 	待比较字符串
	*@param {String}	str2 	待比较字符串
	*@return {Boolean}
	*/
	_string.equal = function(argArr){
		let str1 = argArr[0],str2 = argArr[1];
		if(!SG.object('isString',[str1]) || !SG.object('isString',[str2]))
			return new Error('Parameters Must Be String!!');
		return Object.is(str1,str2);
	}
	/**
	*描述：string事件定义
	*/
	SG._bind('string',_string);
})();
(() => {
	let _array = {};
	
	/**
	*描述：判断是否是空数组
	*@param {Array}	arr 待判断数组
	*@return {Boolean}
	*/
	_array.isEmpty = function(argArr) {
		let arr = argArr[0];
		if(!SG.object('isArray',argArr))
			return new Error('Parameters Must Be Array!!');
		return arr.length > 0 ? false : true;
	}
	/**
	*描述：比较两个数组是否相等，地址或内容相等，都返回true
	*@param	{Array}	arr1	待比较数组
	*@param	{Array}	arr2	待比较数组
	*@return false/true
	*/
	_array.equal = function(argArr){
		let arr1 = argArr[0],arr2 = argArr[1];
		if(!SG.object('isArray',[arr1]) || !SG.object('isArray',[arr2]))
			return new Error('Parameters Must Be Array!!');
		if(arr1 === arr2) return true;
		if(arr1.length != arr2.length) return false;
		for(let i=0,len=arr1.length;i<len;i++){
			if(arr1[i] != arr2[i]){
				return false;
			}
		}
		return true;
	}
	
	/**
	*描述：去除数组中重复的元素
	*@param {Array}	arr	待处理数组
	*@return {Array}
	*/
	_array.unique = function(argArr){
		if(!SG.object('isArray',argArr))
			return [];
		let arr = argArr[0],rs = [];
		if(Array.from){
			return Array.from(new Set(arr));
		}
		for(let ele of arr){
			if(rs.indexOf(ele) == -1){
				rs.push(ele);
			}
		}
		return rs;
	}
	
	/**
	*描述：array事件定义
	*/
	SG._bind('array',_array);
})();

(()=>{
	let _time = {};
	/**
	*描述：格式化时间
	*/
	_time.formatDate = function(argArr){
		let time = argArr[0],date = new Date();
		if(time){
			date = new Date(time);
		}
		let year = date.getFullYear(), 
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds();
		return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
	}
	// _time.getTime = funct
	/**
	*描述：time事件定义
	*/
	SG._bind('time',_time);
})();

(()=>{	
	let _random={} ;
	/**
	*描述：随机生成颜色的随机数
	*@return {String}	'#aabb12'
	*/
	_random.randomColor = function(){
		return '#'+ ('00000'+ (Math.random() * 0x1000000<< 0).toString(16)).slice(-6);
	}
	/**
	*描述：取随机正整数
	*@param {Number}	min 最小值
	*@param {Number}	max 最大值
	*@reutnr {Number}
	*/
	_random.randomNum = function(argArr){
		let min = argArr[0],max = argArr[1];
		if(SG.string('isString',[min]) || SG.string('isString',[max]) || Number.isInteger(min) || Number.isInteger(max)){
			min = parseInt(min);
			max = parseInt(max);
			if(Object.is(NaN,min) || Object.is(NaN,max)){
				return new Error('Parameters Cannot Be Parsed To Number!');
			}
			return Math.abs(Math.floor(min + Math.random() * (max - min)));
		}else{
			return new Error('Parameters Must Be Number');
		}
	}
	/**
	*描述：random事件定义
	*/
	SG._bind('random',_random);
})();

/**************************方法*****************************/
//包括isEmail、isIdCard、isPhoneNum、isUrl

/**
 * 描述：判断是否是Email
 * @param {String}	str 待测Email
 * @return {Boolean}
 */
SG.isEmail = function(str){
	return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * 
 * 描述：判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
SG.isIdCard = function(str){
	return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}

/**
 * 
 * 描述：判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
SG.isPhoneNum = function(str){
	return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
}

/**
 * 
 * 描述：判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
SG.isUrl = function(str){
	return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(str);
}

/**
* 描述：函数节流
* 适用于限制`resize`和`scroll`等函数的调用频率
*
* @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
* @param  {Boolean}   noTrailing     可选，默认为false。
*                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
*                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
*                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
* @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
*                                    执行去节流功能时，调用`callback`。
* @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
*                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
*
* @return {Function}  新的节流函数
*/
SG.throttle = function(delay, noTrailing, callback, debounceMode){
	
}

/**
*描述：函数防抖
* 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
* 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
* @example 适用场景：如在线编辑的自动存储防抖。
* @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
* @param  {Boolean}  atBegin       可选，默认为false。
*                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
								   如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
* @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
*                                  执行去抖动功能时，，调用`callback`。
*
* @return {Function} 新的防抖函数。
*/
SG.debounce = function(){
	
}

/****************************browser operation********************************/

//获取浏览器版本
SG.browserVersion = (()=>{
	if(!Object.is('browser',SG.hostEnv)){
		return 'This Is Not An Expolre';
	}
	
	let sys = {},ua = navigator.userAgent.toLowerCase(),s;
	(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
	(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
	(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
	(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
	(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if(sys.ie) return('IE: '+ sys.ie);
	if(sys.edge) return('EDGE: ' + sys.edge);
	if(sys.firefox) return('Firefox: '+ sys.firefox);
	if(sys.chrome) return('Chrome: '+ sys.chrome);
	if(sys.opera) return('Opera: '+ sys.opera);
	if(sys.safari) return('Safari: '+ sys.safari);
	//IE10的判断
	if (!!window.ActiveXObject || "ActiveXObject" in window) return ('IE: 10');
	return 'Unkonwn';
})();

//操作系统版本信息
SG.OSVersion = (()=>{
	if(Object.is('node',SG.hostEnv)){
		return process.platform + ' '+ process.arch;
	}
	
	let sUserAgent = navigator.userAgent;
    let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    let isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        let isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
    }
    return "other";
})();
/**
*cookie操作
*/
(()=>{
	if(!Object.is('browser',SG.hostEnv))
		return;
	
	let _cookie = {};
	/**
	*描述：获取cookie值
	*@param {String}	name 	变量名
	*@return {String}	cookie值
	*/
	_cookie.getCookie = function(argArr){
		let name = argArr[0];
		let arr = document.cookie.replace(/\s/g,'').split(';');
		for(let ele of arr){
			let tempArr = ele.split('=');
			if(Object.is(name,tempArr[0])){
				return tempArr[1];
			}
		}
		return '';
	}
	/**
	*描述：设置一条cookie
	*@param {String}	name 	cookie名
	*@param {String}	value 	cookie值
	*@param {Number}	days 	cookie有效时间
	*/
	_cookie.setCookie = function(argArr) {
		let name = argArr[0],value = argArr[1],days = argArr[2];
		let date = new Date();
		date.setDate(date.getDay() + days);
		document.cookie = name + '=' + value + ';expires=' + date;
	}
	/**
	*描述：移除一条cookie
	*@param {String}	name 	cookie名
	*/
	_cookie.removeCookie = function(argArr){
		//设置已过期，系统会立刻删除cookie
		let name = argArr[0];
		setCookie(name,'1',-1);
	}
	/**
	*描述：cookie事件定义
	*/
	SG._bind('cookie',_cookie);
})();

module.exports = SG;