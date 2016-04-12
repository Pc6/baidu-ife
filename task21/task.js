var tagList = [],
	interestList = [];

function addBox(ele,list){
	var inputVal = ele.value.split(/[,，、;；\s\r]+/).filter(function (str) {
		return str !== '';
	});
	// 处理输入只有分隔符的情况
	if (!inputVal.length){
		alert('请输入合法字符');
		return;
	}
	for (var i = 0, len = inputVal.length; i < len; i++) {
		if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(inputVal[i])) {
			alert('输入不合法');
			return;
		}
		list.push(inputVal[i]);
	}
}

function uniqueArr(arr){
	var newArr = [];
	for (var i = 0, len = arr.length; i < len; i++){
		var item = arr.pop();
		if (arr.indexOf(item) === -1){
			newArr.unshift(item);
		}
	}
	return newArr;
}

function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

function delbox(e,list,area) {
	e = getEventTarget(e);
	if (e.tagName.toLowerCase() === 'span'){
		var text = e.dataset.content;
		e.textContent = '删除' + text;
		e.style.backgroundColor = 'red';
		e.style.cursor = 'pointer';
		e.onclick = function (evt) {
			evt = getEventTarget(evt);
			list.splice(list.indexOf(evt),1);
			render(area,list);
		}
	}
}

function render(area,nodelist){
	var innerStr = '';
	if (nodelist.length > 10){
		nodelist = nodelist.slice(-10);
	}
	for (var i = 0, len = nodelist.length; i < len; i++){
		innerStr += '<span data-content="' + nodelist[i] + '">' + nodelist[i] + '</span>';
	}
	area.innerHTML = innerStr;
}

function init(){
	var tag = document.getElementById('tag'),
		interest = document.getElementById('interest'),
		interestBtn = document.getElementById('interest-btn'),
		tagArea = document.getElementsByClassName('display-area')[0],
		interestArea = document.getElementsByClassName('display-area')[1];

	tag.onkeyup = function(e){
		var keynum = window.event? e.keyCode : e.which;
		if (keynum === 13 || keynum === 32 || keynum === 188){
			var splitStr = tag.value.replace(/[\s\r,]/g,'');
			tagList.push(splitStr);
			tagList = uniqueArr(tagList);
			render(tagArea,tagList);
			tag.value = '';
		}
	};
	tagArea.onmouseover = function (e) {
		delbox(e,tagList,this);
	};
	tagArea.onmouseout = function (e) {
		e = getEventTarget(e);
		if (e.tagName.toLowerCase() === 'span'){
			render(this,tagList);
		}
	};
	interest.onfocus = function () {
		this.value = '';
	};
	interestBtn.onclick = function () {
		addBox(interest,interestList);
		interestList = uniqueArr(interestList);
		render(interestArea,interestList);
	};
	interestArea.onmouseover = function (e) {
		delbox(e,interestList,this);
	};
	interestArea.onmouseout = function (e) {
		e = getEventTarget(e);
		if (e.tagName.toLowerCase() === 'span'){
			render(this,interestList);
		}
	};

}

init();