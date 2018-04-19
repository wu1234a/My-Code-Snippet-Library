// js原生遍历兄弟元素节点
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


// 去除原生JS childNode子节点中的空白节点
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