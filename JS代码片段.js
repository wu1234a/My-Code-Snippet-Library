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