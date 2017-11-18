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
#### deepClone
深拷贝
> let obj = SG.object('deepClone',[{name:''}]);

### string
#### trim
去除字符串中的空格，默认替换字符串中的所有空格.
@param	{String}	str		待处理字符串
@param {String}	type 	l：字符串左侧；r：字符串右侧；lr：左侧和右侧
> let str = SG.string('trim',[' hh hh h ','lr']);	//hh hh h
#### isString
判断是否是字符串
> SG.string('isString',['']);
#### stringEqual
字符串比较
> SG.string('isString',['abc','bdc']);	//false

### array
#### isArray
判断是否是数组
> SG.array('isArray',[[]])
#### isEmpty
判断是否是空数组
> SG.array('isEmpty',[[]])
#### arrayEleEqual
比较两个数组是否相等，地址或内容相等，都返回true
> SG.array('arrayEleEqual',[[],[123]])	//false

### time
#### formatDate
格式化时间，输出样式为yy-mm-dd HH:mm:ss。无参数时，获取当前时间
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








