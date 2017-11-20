(()=>{
	//��ʼ��
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

/**************************�¼�*****************************/
//����object��string��array��random

(() => {
	let _object = {};
	/**
	*�������ж϶����Ƿ����
	*@param		{Null,Undefined}	obj 	��������
	*@return	{Boolean}
	*/
	_object.isNull = function(argArr) {
		let obj = argArr[0];
		if(Object.is(undefined,obj) || Object.is(null,obj))
			return true;
		return false;
	}
	/**
	*��������ȡ��������
	*@param 	{}	obj	���������
	*@return 	{Null��Undefined��String��Number��Array��Object}
	*/
	_object.getType = function(argArr) {
		let obj = argArr[0];
		return Object.prototype.toString.call(obj).slice(8,-1);
	}
	/**
	*��������ȡ��������
	*@param		{}	obj	���������
	*@return	{Null��Undefined��String��Number��Array��Object}
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
	*�������ж϶����Ƿ�Ϊ��
	*@param 	{Null,Undefined}	obj 	��������
	*@return 	{Boolean}
	*/
	_object.isEmpty = function(argArr){
		let obj = argArr[0];
		if(!Object.is('Object',this.getType([obj])))
			return new Error('Parameters Must Be Object!!');
		return !Object.keys(obj).length;
	}
	/**
	*�������ж�string
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isString = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'string' ? true:false;
	}
	/**
	*�������ж�number
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isNumber = function(argArr){
		let obj = argArr[0];
		return Number.isSafeInteger(obj) ? true:false;
	}
	/**
	*�������ж�NaN
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isNaN = function(argArr){
		let obj = argArr[0];
		return Number.isNaN(obj) ? true:false;
	}
	/**
	*�������ж�Boolean
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isBoolean = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'boolean' ? true:false;
	}
	/**
	*�������ж�array
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isArray = function(argArr){
		let obj = argArr[0];		
		return Array.isArray(obj) ? true:false;
	}
	/**
	*�������ж�object
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isObject = function(argArr){
		let obj = argArr[0];	
		if(obj){
			return obj.constructor.name == 'Object' ? true:false;
		}else{
			//null,undefined����ʹ��constructor;Ϊ''����false
			return false;
		}
	}
	/**
	*�������ж�Symbol
	*@param {Object} obj
	*@return {Boolean}
	*/
	_object.isSymbol = function(argArr){
		let obj = argArr[0];
		return typeof obj == 'symbol' ? true:false;
	}
	/**
	*���������
	*@param 	{Object}	obj 	��������
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
	*������object�¼�����
	*/
	SG._bind('object',_object);
})();

(() => {
	let _string = {};
	/**
	*������ȥ���ַ����еĿո�Ĭ���滻�ַ����е����пո�
	*@param	{String}	str		�������ַ���
	*@param {String}	type 	l���ַ�����ࣻr���ַ����Ҳࣻlr�������Ҳ�
	*@return �������ַ���
	*/
	_string.trim = function(argArr){
		if(!SG.object('isString',argArr)){
			return new Error('Parameters Must Be String!!');
		}
		let str = argArr[0],type = argArr[1];
		let reg = /[\s]*/g;	//�ַ����е�����ո�
		if('l' == type){	//�ַ������
			reg = /^[\s]*/g;
		}else if('r' == type){	//�ַ����Ҳ�
			reg = /[\s]*$/g;
		}else if('lr' == type){	//�����Ҳ�
			reg = /^[\s]* | [\s]*$/g;
		}
		return str.replace(reg,'');
	}
	
	/**
	*�������ַ����Ƚ�
	*@param {String}	str1 	���Ƚ��ַ���
	*@param {String}	str2 	���Ƚ��ַ���
	*@return {Boolean}
	*/
	_string.equal = function(argArr){
		let str1 = argArr[0],str2 = argArr[1];
		if(!SG.object('isString',[str1]) || !SG.object('isString',[str2]))
			return new Error('Parameters Must Be String!!');
		return Object.is(str1,str2);
	}
	/**
	*������string�¼�����
	*/
	SG._bind('string',_string);
})();
(() => {
	let _array = {};
	
	/**
	*�������ж��Ƿ��ǿ�����
	*@param {Array}	arr ���ж�����
	*@return {Boolean}
	*/
	_array.isEmpty = function(argArr) {
		let arr = argArr[0];
		if(!SG.object('isArray',argArr))
			return new Error('Parameters Must Be Array!!');
		return arr.length > 0 ? false : true;
	}
	/**
	*�������Ƚ����������Ƿ���ȣ���ַ��������ȣ�������true
	*@param	{Array}	arr1	���Ƚ�����
	*@param	{Array}	arr2	���Ƚ�����
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
	*������ȥ���������ظ���Ԫ��
	*@param {Array}	arr	����������
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
	*������array�¼�����
	*/
	SG._bind('array',_array);
})();

(()=>{
	let _time = {};
	/**
	*��������ʽ��ʱ��
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
	*������time�¼�����
	*/
	SG._bind('time',_time);
})();

(()=>{	
	let _random={} ;
	/**
	*���������������ɫ�������
	*@return {String}	'#aabb12'
	*/
	_random.randomColor = function(){
		return '#'+ ('00000'+ (Math.random() * 0x1000000<< 0).toString(16)).slice(-6);
	}
	/**
	*������ȡ���������
	*@param {Number}	min ��Сֵ
	*@param {Number}	max ���ֵ
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
	*������random�¼�����
	*/
	SG._bind('random',_random);
})();

/**************************����*****************************/
//����isEmail��isIdCard��isPhoneNum��isUrl

/**
 * �������ж��Ƿ���Email
 * @param {String}	str ����Email
 * @return {Boolean}
 */
SG.isEmail = function(str){
	return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * 
 * �������ж��Ƿ�Ϊ���֤��
 * @param  {String|Number} str 
 * @return {Boolean}
 */
SG.isIdCard = function(str){
	return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}

/**
 * 
 * �������ж��Ƿ�Ϊ�ֻ���
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
SG.isPhoneNum = function(str){
	return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
}

/**
 * 
 * �������ж��Ƿ�ΪURL��ַ
 * @param  {String} str 
 * @return {Boolean}
 */
SG.isUrl = function(str){
	return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(str);
}

/**
* ��������������
* ����������`resize`��`scroll`�Ⱥ����ĵ���Ƶ��
*
* @param  {Number}    delay          0 ���߸���ĺ������� �����¼��ص�����Լ100��250���루����ߣ����ӳ��������õġ�
* @param  {Boolean}   noTrailing     ��ѡ��Ĭ��Ϊfalse��
*                                    ���noTrailingΪtrue�����������������ã�ÿ��`delay`����`callback`Ҳ��ִ��һ�Ρ�
*                                    ���noTrailingΪfalse����δ���룬`callback`�������һ�ε��ý�����������ִ��һ��.
*                                    ���ӳ�`delay`����֮�󣬽�������û�б�����,�ڲ��������Ḵλ��
* @param  {Function}  callback       �ӳٺ����ִ�еĺ�����`this`�����ĺ����в������ǰ�ԭ�����ݵģ�
*                                    ִ��ȥ��������ʱ������`callback`��
* @param  {Boolean}   debounceMode   ���`debounceMode`Ϊtrue��`clear`��`delay`ms��ִ�С�
*                                    ���debounceMode��false��`callback`��`delay` ms֮��ִ�С�
*
* @return {Function}  �µĽ�������
*/
SG.throttle = function(delay, noTrailing, callback, debounceMode){
	
}

/**
*��������������
* ��throttle��ͬ���ǣ�debounce��֤һ�������ڶ��ٺ����ڲ��ٱ�������ֻ��ִ��һ�Σ�
* Ҫô�ڵ�һ�ε���return�ķ�������ʱִ�У�Ҫô���ӳ�ָ���������á�
* @example ���ó����������߱༭���Զ��洢������
* @param  {Number}   delay         0���߸���ĺ������� �����¼��ص�����Լ100��250���루����ߣ����ӳ��������õġ�
* @param  {Boolean}  atBegin       ��ѡ��Ĭ��Ϊfalse��
*                                  ���`atBegin`Ϊfalse��δ���룬�ص��������ڵ�һ�ε���return�ķ����������ӳ�ָ��������á�
								   ���`atBegin`Ϊtrue���ص��������ڵ�һ�ε���return�ķ�������ʱֱ��ִ��
* @param  {Function} callback      �ӳٺ����ִ�еĺ�����`this`�����ĺ����в������ǰ�ԭ�����ݵģ�
*                                  ִ��ȥ��������ʱ��������`callback`��
*
* @return {Function} �µķ���������
*/
SG.debounce = function(){
	
}

/****************************browser operation********************************/

//��ȡ������汾
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
	//IE10���ж�
	if (!!window.ActiveXObject || "ActiveXObject" in window) return ('IE: 10');
	return 'Unkonwn';
})();

//����ϵͳ�汾��Ϣ
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
*cookie����
*/
(()=>{
	if(!Object.is('browser',SG.hostEnv))
		return;
	
	let _cookie = {};
	/**
	*��������ȡcookieֵ
	*@param {String}	name 	������
	*@return {String}	cookieֵ
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
	*����������һ��cookie
	*@param {String}	name 	cookie��
	*@param {String}	value 	cookieֵ
	*@param {Number}	days 	cookie��Чʱ��
	*/
	_cookie.setCookie = function(argArr) {
		let name = argArr[0],value = argArr[1],days = argArr[2];
		let date = new Date();
		date.setDate(date.getDay() + days);
		document.cookie = name + '=' + value + ';expires=' + date;
	}
	/**
	*�������Ƴ�һ��cookie
	*@param {String}	name 	cookie��
	*/
	_cookie.removeCookie = function(argArr){
		//�����ѹ��ڣ�ϵͳ������ɾ��cookie
		let name = argArr[0];
		setCookie(name,'1',-1);
	}
	/**
	*������cookie�¼�����
	*/
	SG._bind('cookie',_cookie);
})();

module.exports = SG;