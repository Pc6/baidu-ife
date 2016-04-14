
var animateList = [];

function Node(val){
	this.value = val;
	this.left = val.firstElementChild || null;
	this.right = val.lastElementChild || null;
}

function BinaryDOMTree(domNode){
	this._root = domNode;
}

BinaryDOMTree.prototype.preTraverse = function (domNode,callback){
	if (domNode){
		var newNode = new Node(domNode);
		callback.call(this,domNode);
		arguments.callee(newNode.left,callback);
		arguments.callee(newNode.right,callback);
	}
}

BinaryDOMTree.prototype.inTraverse = function(domNode,callback){
	if (domNode){
		var newNode = new Node(domNode);
		arguments.callee(newNode.left,callback);
		callback.call(this,domNode);
		arguments.callee(newNode.right,callback);
	}
}

BinaryDOMTree.prototype.postTraverse = function(domNode,callback){
	if (domNode){
		var newNode = new Node(domNode);
		arguments.callee(newNode.left,callback);
		arguments.callee(newNode.right,callback);
		callback.call(this,domNode);
	}
}

function pushToList(domNode){
	animateList.push(domNode);
}

function animate(){
	var i = 0;
	animateList[i].classList.add('active');
	t = setInterval(function(){
		i++;
		if (i < animateList.length){
			animateList[i - 1].classList.remove('active');
			animateList[i].classList.add('active');
		}else {
			clearInterval(t);
			animateList[i - 1].classList.remove('active');
			animateList = [];
		}
	},500);
}

function init(){
	var preOrder = document.getElementById('preOrder'),
		inOrder = document.getElementById('inOrder'),
		postOrder = document.getElementById('postOrder'),
		rootBox = document.getElementById('rootBox'),
		dom = new BinaryDOMTree(rootBox);
		
	preOrder.onclick = function(){
		dom.preTraverse(dom._root,pushToList);
		animate();
	}

	inOrder.onclick = function(){
		dom.inTraverse(dom._root,pushToList);
		animate();
	}

	postOrder.onclick = function(){
		dom.postTraverse(dom._root,pushToList);
		animate();
	}

}

init();