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
					alert(boxes[0].textContent);
					queue.removeChild(boxes[0]);				
					break;
				case 'right':
					alert(boxes[boxes.length-1].textContent);
					queue.removeChild(boxes[boxes.length-1]);
					break;
				default: break;
			}
		}else{
			alert('队列内没有元素！');
		}
	}
}

function addBox(direction){
	return function(){
		if (!/^\d+$/.test(content.value)){
			alert('输入不合法');
			return;
		}
		var newBox = document.createElement('span');
		newBox.textContent = content.value;
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

function init(){
	var left_in = document.getElementById('left-in'),
		right_in = document.getElementById('right-in'),
		left_out = document.getElementById('left-out'),
		right_out = document.getElementById('right-out');

	left_in.onclick = addBox('left');
	right_in.onclick = addBox('right');
	left_out.onclick = delBox('left');
	right_out.onclick = delBox('right');
	queue.onclick = delBox();
}

init();