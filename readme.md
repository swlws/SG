## SG
SG(SWL_Global)常用脚本库。可以在浏览器和node平台运行。

## 属性
### SG.hostEnv	
返回值'node'和'browser'，区分node和浏览器平台。

### SG.OSVersion
返回操作系统的信息

### SG.browserVersion
返回浏览器版本信息

## 方法
### SG.isEmail
判断是否是Email
### isIdCard
判断是否为身份证号
### isPhoneNum
判断是否为手机号
### isUrl
判断是否为URL地址

## 组件
组件包括object、string、array、time、random、cookie。组件包含自身的方法，调用时使用方法名+参数（参数为数组）。

### object
#### isNull
判断对象是否存在。
> SG.object('isNull',[{name:''}]);
#### getType
获取数据类型
> SG.object('getType',[{name:''}]);
#### isEmpty
判断对象是否为空
> SG.object('isEmpty',[{name:''}]);
#### isString
判断字符串
> SG.object('isString',['']);
#### isNumber
判断数字
> SG.object('isNumber',[1]);
#### isNaN
判断NaN
> SG.object('isNaN',[NaN]);
#### isBoolean
判断布尔变量
> SG.object('isBoolean',[true]);
#### isSymbol
判断Symbol
> SG.object('isSymbol',[Symbol('')]);
#### isArray
判断数组
> SG.object('isArray',[[]]);
#### isObject
判断对象
> SG.object('isObject',[{}]);
#### deepClone
深拷贝
> let obj = SG.object('deepClone',[{name:''}]);

### string
#### trim
去除字符串中的空格，默认替换字符串中的所有空格.
@param	{String}	str		待处理字符串
@param {String}	type 	l：字符串左侧；r：字符串右侧；lr：左侧和右侧
> let str = SG.string('trim',[' hh hh h ','lr']);	//hh hh h
#### equal
字符串比较
> SG.string('equal',['abc','bdc']);	//false

### array
#### isEmpty
判断是否是空数组
> SG.array('isEmpty',[[]])
#### equal
比较两个数组是否相等，地址或内容相等，都返回true
> SG.array('equal',[[],[123]])	//false
#### unique
数组去重
> SG.array('unique',[[11,11,22,22,33,33])

### time
#### formatDate
格式化时间，输出样式为yy-MM-dd HH:mm:ss。无参数时，获取当前时间
> SG.time('formatDate')

### random
#### randomColor
随机生成颜色的随机数
> SG.random('randomColor')
#### randomNum
取随机正整数
@param {Number}	min 最小值
@param {Number}	max 最大值
> SG.random('randomNum',[10,100]);

### cookie
浏览器环境下生效
#### getCookie
获取cookie值
> SG.cookie('getCookie',['name']);
#### setCookie
设置一条cookie
@param {String}	name 	cookie名
@param {String}	value 	cookie值
@param {Number}	days 	cookie有效时间
> SG.cookie('setCookie',['name','lucy',3]);
#### removeCookie
移除一条cookie
> SG.cookie('removeCookie',['name']);








