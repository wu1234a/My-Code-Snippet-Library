// js原生遍历兄弟元素节点
function siblings(n) {
	var nodes = [];
	var prev = n.previousSibling;
	while (prev) {
		if (prev.nodeType === 1) {nodes.push(prev);}
		prev = prev.previousSibling;
	}
	var nexts = n.nextSibling;
	while (nexts) {
		if (nexts.nodeType === 1) {nodes.push(nexts);}
		nexts = nexts.nextSibling;
	}
	return nodes;
}