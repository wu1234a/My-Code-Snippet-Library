 /* 作用：js原生遍历兄弟元素节点
** 参数：
** n  指定节点
**
** 方法&属性：
** previousSibling   前一节点
** nodeType          节点类型 1：元素节点  2：属性节点  3：文本节点
** push()            向数组末尾添加元素，并返回数组新长度
** nextSibling       后一节点   
** removeChild()  移除子节点
**
** 说明：通过向前，向后不断搜索添加元素节点
*/
function siblings(n) {
	var nodes = [];
	var prev = n.previousSibling;
	// 找出元素n前面的所有元素节点
	while (prev) {
		if (prev.nodeType === 1) {nodes.push(prev);}
		prev = prev.previousSibling;
	}
	var nexts = n.nextSibling;
	// 找出元素n后面的所有元素节点
	while (nexts) {
		if (nexts.nodeType === 1) {nodes.push(nexts);}
		nexts = nexts.nextSibling;
	}
	return nodes;
}

/* 作用：去除原生JS childNode子节点中的空白节点
** 参数：
** oElement  父节点
**
** 方法&属性：
** childNodes     子节点
** length         长度
** nodeType       节点类型 1：元素节点  2：属性节点  3：文本节点
** nodeValue      节点值
** test()         检测一个字符串是否匹配某个模式   
** removeChild()  移除子节点
**
** 说明：判断子节点类型是否为文本节点并用正则检测节点值是否为空。
*/
function cleanNode(oElement) {
	for (var i = 0; i < oElement.childNodes.length; i++) {
		var oNodes = oElement.childNodes[i];
		if (oNodes.nodeType==3 && !/\S/.test(oNodes.nodeValue)) {
			oElement.removeChild(oNodes);
		}
	}
	return oElement;
}

/* 作用：去除数组中重复的元素 
** 参数：
** arr     需要去重的数组
** element 数组元素
** index   数组索引
** self    数组本身
**
** 方法：
** filter()
   创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
** indexOf() 返回某个指定的字符串值在字符串中首次出现的位置
**
** 说明：去除重复元素依靠的是 indexOf 
** 总是返回第一个元素的位置，后续的重复元素位置与 indexOf 
** 返回的位置不相等，因此被 filter 滤掉了。
*/
function deduplication(arr) {
	var newarr = arr.filter(function(element, index, self){
		return self.indexOf(element)===index;
	});
	return newarr;
}

/* 作用：检测数组中是否有某参数的重复项 
** 参数：
** arr     目标数组
** element 目标参数
**
** 方法：
** indexOf() 返回某个指定的字符串值在字符串中首次出现的位置
**
** 说明：检测重复元素依靠的是 indexOf 
** 总是返回第一个元素的位置，如果数组中没有该数，则返回-1，否则返回
** 该数的位置索引
*/
function isRepeat(element, arr) {
	if(arr.indexOf(element) === -1) {
		return true;
	}else{
		return false;
	}
}

/**
* 描述: ajax请求封装
* @param {String} url 请求地址
* @param {String} method 请求方式
* @param {Object} params get请求的参数
* @param {Object} data post请求的参数
* @param {Function} success 成功的回调
* @param {Function} error 失败的回调
*/
const request = ({ url = '', method = 'get', params = {}, data = {}, success, error }) => {
	return new Promise((resolve, reject) => {
		// 创建ajax
		let xhr
		if (window.XMLHttpRequest) xhr = new XMLHttpRequest()	//判断XMLHttpRequest是否存在
		else xhr = new ActiveXObject('MicroSoft.XMLHTTP')	//兼容老版本ie

		// 监听请求完成
		xhr.onreadystatechange = function () {
			// 固定写法 readyState 表示 ajax的状态 
			//ajax的状态总共有（0 1 2 3 4 ）五种状态 状态为4表示请求完成 status === 200表示成功
			if (xhr.readyState == 4) { //请求完成
				if(xhr.status === 200) {	//http请求状态为200 成功
					let res = xhr.responseText;  //接收响应结果 结果是JSON字符串
					// 转化为对象 传给成功的回调
					success && success(JSON.parse(res)) //成功的回调
					resolve(JSON.parse(res)) //promise 成功 返回
				}else { //状态码不为200 失败
					error && error(xhr.status)	//失败的回调
					reject(xhr.status) //promise 失败 返回
				}
			}
		}
		// 根据请求方式发送请求
		switch (method.toUpperCase()) {
			case "GET":
				//构建请求的url
				let reqUrl = url
				if (Object.keys(params).length > 0) reqUrl += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&') //url拼接请求参数
				xhr.open('GET', reqUrl);
				xhr.send() //发送请求
				break
			case "POST":
				xhr.open('POST', url);
				xhr.setRequestHeader('Content-Type', 'application/json') //设置请求头为json
				if (Object.keys(data).length > 0) xhr.send(JSON.stringify(data))	//传入数据 发送请求
				else xhr.send()	//无参请求
				break
		}
	})
}

