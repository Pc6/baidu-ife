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
		var inputVal = content.value.split(/[,，、;；\s\r]+/).filter(function (str) {
			return str !== '';
		});
		// 处理输入只有分隔符的情况
		if (!inputVal.length){
			alert('请输入合法字符');
			return;
		}
		for (var i = 0, len = inputVal.length; i < len; i++){
			if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(inputVal[i])){
				alert('输入不合法');
				return;
			}
			var newBox = document.createElement('span');
			newBox.textContent = inputVal[i];
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
}

function search() {
	var val = document.getElementById('search').value,
		flag = 0;
	// 队列元素恢复原来颜色
	[].forEach.call(boxes, function (ele) {
		ele.style.backgroundColor = 'red';
	});
	for (var i = 0, len = boxes.length; i < len; i++){
		if (boxes[i].textContent.indexOf(val) !== -1){
			boxes[i].style.backgroundColor = 'blue';
			flag = 1;
		}
	}
	if (!flag){
		alert('队列中没有这个值');
	}
}

function init(){
	var left_in = document.getElementById('left-in'),
		right_in = document.getElementById('right-in'),
		left_out = document.getElementById('left-out'),
		right_out = document.getElementById('right-out'),
		searchBtn = document.getElementById('search-btn');

	left_in.onclick = addBox('left');
	right_in.onclick = addBox('right');
	left_out.onclick = delBox('left');
	right_out.onclick = delBox('right');
	queue.onclick = delBox();
	searchBtn.onclick = search;
}

init();