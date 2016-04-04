/*
 *使用js实现模拟队列
 */

var queue = document.getElementById('queue'),
	boxes = queue.children,
	content = document.getElementById('content');

function delBox(direction){
	return function(e){
		var e = e || window.event,
		    target = e.target || e.srcElement;		
		if (boxes.length !== 0){
			if (target.tagName.toLowerCase() === 'span'){
				queue.removeChild(target);
				return;
			}
			switch(direction){
				case 'left':
					alert(boxes[0].title);
					queue.removeChild(boxes[0]);				
					break;
				case 'right':
					alert(boxes[boxes.length-1].title);
					queue.removeChild(boxes[boxes.length-1]);
					break;
				default: break;
			}
		}else{
			alert('队列内没有元素！');
		}
	}
}

function validate(val){
	if (/^\d+$/.test(val)){
		var result = parseInt(val);
		return result >=10 && result <= 100;
	}else{
		return false;
	}
}

function addBox(direction){
	return function(){
		if (!validate(content.value)){
			alert('输入不合法');
			return;
		}
		if (boxes.length >= 60){
			alert('队列已满');
			return;
		}
		var newBox = document.createElement('span');
		newBox.title = content.value;
		newBox.style.height = content.value + 'px';
		newBox.classList.add('box');
		switch(direction){
			case 'left':
				queue.insertBefore(newBox, boxes[0]);
				break;
			case 'right':
				queue.appendChild(newBox);
				break;
			default: break;
		}
	}
}

function bubbleSort(nodes){
	return function(){
		for (var i = 0, len = nodes.length; i < len; i++){
			for (var j = 1; j < len - i; j++){
				if (parseInt(nodes[j-1].title) > parseInt(nodes[j].title)){
					var temp1 = nodes[j-1].cloneNode(true);
					var temp2 = nodes[j].cloneNode(true);
					queue.replaceChild(temp2, nodes[j-1]);
					queue.replaceChild(temp1, nodes[j]);
				}
			}
		}
	}
}

function init(){
	var left_in = document.getElementById('left-in'),
		right_in = document.getElementById('right-in'),
		left_out = document.getElementById('left-out'),
		right_out = document.getElementById('right-out'),
		sort = document.getElementById('sort');

	left_in.onclick = addBox('left');
	right_in.onclick = addBox('right');
	left_out.onclick = delBox('left');
	right_out.onclick = delBox('right');
	sort.onclick = bubbleSort(boxes);
	queue.onclick = delBox();

	for (var i = 0; i < 30; i++){
		var block = document.createElement('span');
		var val = Math.ceil((Math.random() * 90) + 10);
		block.title = parseInt(val);
		block.style.height = val + 'px';
		block.classList.add('box');
		queue.appendChild(block);
	}
}

init();