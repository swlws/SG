## SG
SG(SWL_Global)���ýű��⡣�������������nodeƽ̨���С�

## ����
### SG.hostEnv	
����ֵ'node'��'browser'������node�������ƽ̨��

### SG.OSVersion
���ز���ϵͳ����Ϣ

### SG.browserVersion
����������汾��Ϣ

## ����
### SG.isEmail
�ж��Ƿ���Email
### isIdCard
�ж��Ƿ�Ϊ���֤��
### isPhoneNum
�ж��Ƿ�Ϊ�ֻ���
### isUrl
�ж��Ƿ�ΪURL��ַ

## ���
�������object��string��array��time��cookie�������������ķ���������ʱʹ�÷�����+����������Ϊ���飩��

### object
#### isNull
�ж϶����Ƿ���ڡ�
> SG.object('isNull',[{name:''}]);
#### getType
��ȡ��������
> SG.object('getType',[{name:''}]);
#### isEmpty
�ж϶����Ƿ�Ϊ��
> SG.object('isEmpty',[{name:''}]);
#### deepClone
���
> let obj = SG.object('deepClone',[{name:''}]);

### string
#### trim
ȥ���ַ����еĿո�Ĭ���滻�ַ����е����пո�.
@param	{String}	str		�������ַ���
@param {String}	type 	l���ַ�����ࣻr���ַ����Ҳࣻlr�������Ҳ�
> let str = SG.string('trim',[' hh hh h ','lr']);	//hh hh h
#### isString
�ж��Ƿ����ַ���
> SG.string('isString',['']);
#### stringEqual
�ַ����Ƚ�
> SG.string('isString',['abc','bdc']);	//false

### array
#### isArray
�ж��Ƿ�������
> SG.array('isArray',[[]])
#### isEmpty
�ж��Ƿ��ǿ�����
> SG.array('isEmpty',[[]])
#### arrayEleEqual
�Ƚ����������Ƿ���ȣ���ַ��������ȣ�������true
> SG.array('arrayEleEqual',[[],[123]])	//false

### time
#### formatDate
��ʽ��ʱ�䣬�����ʽΪyy-mm-dd HH:mm:ss���޲���ʱ����ȡ��ǰʱ��
> SG.time('formatDate')

### random
#### randomColor
���������ɫ�������
> SG.random('randomColor')
#### randomNum
ȡ���������
@param {Number}	min ��Сֵ
@param {Number}	max ���ֵ
> SG.random('randomNum',[10,100]);

### cookie
�������������Ч
#### getCookie
��ȡcookieֵ
> SG.cookie('getCookie',['name']);
#### setCookie
����һ��cookie
@param {String}	name 	cookie��
@param {String}	value 	cookieֵ
@param {Number}	days 	cookie��Чʱ��
> SG.cookie('setCookie',['name','lucy',3]);
#### removeCookie
�Ƴ�һ��cookie
> SG.cookie('removeCookie',['name']);








